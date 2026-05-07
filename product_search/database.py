# -*- coding: utf-8 -*-
"""
ProductDatabase - 商品图片数据库核心类
基于 JSON 文件存储，支持特征向量搜索和内存缓存
"""
import json
import os
import uuid
from datetime import datetime
import numpy as np
import sys
from extract_features import extract_image_features, extract_image_features_with_prompt, rerank as rerank_api


def _base_dir():
    """获取 app 根目录（frozen exe 时为 exe 所在目录，开发时为 tupian 目录）"""
    if getattr(sys, 'frozen', False):
        return os.path.dirname(sys.executable)
    # 开发模式：__file__ = tupian/database.py，返回 tupian 目录本身
    return os.path.dirname(os.path.abspath(__file__))


def _resolve(path: str):
    """将相对路径转为绝对路径，绝对路径原样返回"""
    if os.path.isabs(path):
        return path
    return os.path.join(_base_dir(), path)


class ProductDatabase:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self._ensure_db_exists()
        self._cache = None  # {'ids': [...], 'products': {...id: product}, 'emb_matrix': np.array}

    def warmup(self):
        """预热：启动时加载全部向量到内存，后续搜索直接从内存读取"""
        data = self._load()
        products = data['products']
        if not products:
            self._cache = {'ids': [], 'products': {}, 'emb_matrix': np.zeros((0, 0))}
            return 0
        dim = len(products[0]['embedding'])
        emb_matrix = np.zeros((len(products), dim), dtype=np.float32)
        prod_map = {}
        ids = []
        for i, p in enumerate(products):
            emb_matrix[i] = p['embedding']
            prod_map[p['id']] = p
            ids.append(p['id'])
        self._cache = {
            'ids': ids,
            'products': prod_map,
            'emb_matrix': emb_matrix
        }
        return len(products)

    def _ensure_db_exists(self):
        if not os.path.exists(self.db_path):
            os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
            self._save({"version": "2.0", "model": "qwen3-vl-embedding", "embedding_dim": 2560, "products": []})

    def _load(self) -> dict:
        with open(self.db_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def _save(self, data: dict):
        with open(self.db_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def add_product(self, image_path: str, name: str = "",
                    inquiry_date: str = "", manufacturer_name: str = "",
                    address: str = "", manufacturer_link: str = "",
                    cost_price: str = "", remarks: str = "",
                    prompt: str = None,
                    dist1_base_price: str = "", dist1_shipping_fee: str = "",
                    dist1_remarks: str = "", dist2_base_price: str = "",
                    dist2_shipping_fee: str = "", dist2_remarks: str = "") -> str:
        """添加商品到数据库，prompt 不为空时使用融合向量"""
        if prompt:
            embedding = extract_image_features_with_prompt(image_path, prompt)
        else:
            embedding = extract_image_features(image_path)

        product = {
            "id": str(uuid.uuid4()),
            "image_path": image_path,
            "embedding": embedding.tolist() if hasattr(embedding, 'tolist') else list(embedding),
            "name": name,
            "inquiry_date": inquiry_date,
            "manufacturer_name": manufacturer_name,
            "address": address,
            "manufacturer_link": manufacturer_link,
            "cost_price": cost_price,
            "remarks": remarks,
            "dist1_base_price": dist1_base_price,
            "dist1_shipping_fee": dist1_shipping_fee,
            "dist1_remarks": dist1_remarks,
            "dist2_base_price": dist2_base_price,
            "dist2_shipping_fee": dist2_shipping_fee,
            "dist2_remarks": dist2_remarks,
            "added_at": datetime.now().isoformat()
        }

        data = self._load()
        data["products"].append(product)
        self._save(data)

        # 更新内存缓存
        if self._cache is not None:
            self._cache['ids'].append(product['id'])
            self._cache['products'][product['id']] = product
            new_emb = np.array(embedding, dtype=np.float32)
            self._cache['emb_matrix'] = np.vstack([self._cache['emb_matrix'], new_emb])

        return product["id"]

    def search(self, query_image_path: str, top_k: int = 5, prompt: str = None) -> list:
        """搜索同款商品（纯向量最近邻，优先用内存缓存）"""
        if prompt:
            query_emb = extract_image_features_with_prompt(query_image_path, prompt)
        else:
            query_emb = extract_image_features(query_image_path)

        if self._cache is not None and len(self._cache['ids']) > 0:
            # 走内存缓存（快）
            ids = self._cache['ids']
            emb = self._cache['emb_matrix']
            q = np.array(query_emb, dtype=np.float32)
            # 处理维度不匹配
            min_dim = min(len(q), emb.shape[1])
            scores = np.dot(emb[:, :min_dim], q[:min_dim]) / (
                np.linalg.norm(emb[:, :min_dim], axis=1) * np.linalg.norm(q[:min_dim]) + 1e-9
            )
            top_indices = np.argsort(scores)[::-1][:top_k]
            results = []
            for idx in top_indices:
                pid = ids[idx]
                p = self._cache['products'][pid]
                results.append({
                    "id": p['id'],
                    "image_path": p['image_path'],
                    "name": p['name'],
                    "inquiry_date": p.get("inquiry_date", ""),
                    "manufacturer_name": p.get("manufacturer_name", ""),
                    "address": p.get("address", ""),
                    "manufacturer_link": p.get("manufacturer_link", ""),
                    "cost_price": p.get("cost_price", ""),
                    "remarks": p.get("remarks", ""),
                    "dist1_base_price": p.get("dist1_base_price", ""),
                    "dist1_shipping_fee": p.get("dist1_shipping_fee", ""),
                    "dist1_remarks": p.get("dist1_remarks", ""),
                    "dist2_base_price": p.get("dist2_base_price", ""),
                    "dist2_shipping_fee": p.get("dist2_shipping_fee", ""),
                    "dist2_remarks": p.get("dist2_remarks", ""),
                    "score": float(scores[idx])
                })
            return results  # 走内存缓存，直接返回

        # 缓存为空，从 JSON 加载
        data = self._load()
        results = []
        for product in data["products"]:
            db_emb = np.array(product["embedding"])
            min_dim = min(len(query_emb), len(db_emb))
            dot = np.dot(query_emb[:min_dim], db_emb[:min_dim])
            norm_q = np.linalg.norm(query_emb[:min_dim])
            norm_db = np.linalg.norm(db_emb[:min_dim])
            similarity = dot / (norm_q * norm_db) if (norm_q > 0 and norm_db > 0) else 0
            results.append({
                "id": product["id"],
                "image_path": product["image_path"],
                "name": product["name"],
                "inquiry_date": product.get("inquiry_date", ""),
                "manufacturer_name": product.get("manufacturer_name", ""),
                "address": product.get("address", ""),
                "manufacturer_link": product.get("manufacturer_link", ""),
                "cost_price": product.get("cost_price", ""),
                "remarks": product.get("remarks", ""),
                "dist1_base_price": product.get("dist1_base_price", ""),
                "dist1_shipping_fee": product.get("dist1_shipping_fee", ""),
                "dist1_remarks": product.get("dist1_remarks", ""),
                "dist2_base_price": product.get("dist2_base_price", ""),
                "dist2_shipping_fee": product.get("dist2_shipping_fee", ""),
                "dist2_remarks": product.get("dist2_remarks", ""),
                "score": float(similarity)
            })
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]

    def search_with_rerank(self, query_image_path: str, top_k: int = 5,
                           recall_k: int = 20, batch_size: int = 5,
                           prompt: str = None) -> list:
        """搜索同款商品（Embedding召回 + Rerank精排）"""
        if prompt:
            query_emb = extract_image_features_with_prompt(query_image_path, prompt)
        else:
            query_emb = extract_image_features(query_image_path)

        # Embedding 召回（优先用内存缓存）
        if self._cache is not None and len(self._cache['ids']) > 0:
            ids = self._cache['ids']
            emb = self._cache['emb_matrix']
            q = np.array(query_emb, dtype=np.float32)
            min_dim = min(len(q), emb.shape[1])
            scores = np.dot(emb[:, :min_dim], q[:min_dim]) / (
                np.linalg.norm(emb[:, :min_dim], axis=1) * np.linalg.norm(q[:min_dim]) + 1e-9
            )
            top_indices = np.argsort(scores)[::-1][:recall_k]
            candidates = []
            for idx in top_indices:
                pid = ids[idx]
                p = self._cache['products'][pid]
                candidates.append({
                    "id": p['id'],
                    "image_path": p['image_path'],
                    "name": p['name'],
                    "inquiry_date": p.get("inquiry_date", ""),
                    "manufacturer_name": p.get("manufacturer_name", ""),
                    "address": p.get("address", ""),
                    "manufacturer_link": p.get("manufacturer_link", ""),
                    "cost_price": p.get("cost_price", ""),
                    "remarks": p.get("remarks", ""),
                    "dist1_base_price": p.get("dist1_base_price", ""),
                    "dist1_shipping_fee": p.get("dist1_shipping_fee", ""),
                    "dist1_remarks": p.get("dist1_remarks", ""),
                    "dist2_base_price": p.get("dist2_base_price", ""),
                    "dist2_shipping_fee": p.get("dist2_shipping_fee", ""),
                    "dist2_remarks": p.get("dist2_remarks", ""),
                    "emb_score": float(scores[idx])
                })
        else:
            data = self._load()
            candidates = []
            for product in data["products"]:
                db_emb = np.array(product["embedding"])
                min_dim = min(len(query_emb), len(db_emb))
                dot = np.dot(query_emb[:min_dim], db_emb[:min_dim])
                norm_q = np.linalg.norm(query_emb[:min_dim])
                norm_db = np.linalg.norm(db_emb[:min_dim])
                similarity = dot / (norm_q * norm_db) if (norm_q > 0 and norm_db > 0) else 0
                candidates.append({
                    "id": product["id"],
                    "image_path": product["image_path"],
                    "name": product["name"],
                    "inquiry_date": product.get("inquiry_date", ""),
                    "manufacturer_name": product.get("manufacturer_name", ""),
                    "address": product.get("address", ""),
                    "manufacturer_link": product.get("manufacturer_link", ""),
                    "cost_price": product.get("cost_price", ""),
                    "remarks": product.get("remarks", ""),
                    "dist1_base_price": product.get("dist1_base_price", ""),
                    "dist1_shipping_fee": product.get("dist1_shipping_fee", ""),
                    "dist1_remarks": product.get("dist1_remarks", ""),
                    "dist2_base_price": product.get("dist2_base_price", ""),
                    "dist2_shipping_fee": product.get("dist2_shipping_fee", ""),
                    "dist2_remarks": product.get("dist2_remarks", ""),
                    "emb_score": float(similarity)
                })
            candidates.sort(key=lambda x: x['emb_score'], reverse=True)
            candidates = candidates[:recall_k]

        if not candidates:
            return []

        # Rerank 精排
        recall_paths = [_resolve(c["image_path"]) for c in candidates]
        reranked = rerank_api(query_image_path, recall_paths, top_k=top_k,
                              batch_size=batch_size, prompt=prompt)

        path_to_cand = {_resolve(c["image_path"]): c for c in candidates}
        results = []
        for item in reranked:
            c = path_to_cand[item['path']]
            c['score'] = item['score']
            del c['emb_score']
            results.append(c)

        return results

    def update_product(self, product_id: str, **kwargs) -> bool:
        """更新商品信息（不更新 embedding）"""
        data = self._load()
        for p in data["products"]:
            if p["id"] == product_id:
                allowed = {"name", "inquiry_date", "manufacturer_name", "address",
                           "manufacturer_link", "cost_price", "remarks",
                           "dist1_base_price", "dist1_shipping_fee", "dist1_remarks",
                           "dist2_base_price", "dist2_shipping_fee", "dist2_remarks"}
                for k, v in kwargs.items():
                    if k in allowed:
                        p[k] = v
                self._save(data)
                # 更新内存缓存
                if self._cache is not None and product_id in self._cache['products']:
                    for k, v in kwargs.items():
                        if k in allowed:
                            self._cache['products'][product_id][k] = v
                return True
        return False

    def delete(self, product_id: str) -> bool:
        """删除商品"""
        data = self._load()
        original_len = len(data["products"])
        data["products"] = [p for p in data["products"] if p["id"] != product_id]

        if len(data["products"]) < original_len:
            self._save(data)
            # 更新缓存
            if self._cache is not None and product_id in self._cache['products']:
                idx = self._cache['ids'].index(product_id)
                self._cache['ids'].pop(idx)
                del self._cache['products'][product_id]
                self._cache['emb_matrix'] = np.delete(self._cache['emb_matrix'], idx, axis=0)
            return True
        return False

    def info(self) -> dict:
        """获取数据库信息"""
        if self._cache is not None:
            total = len(self._cache['ids'])
        else:
            data = self._load()
            total = len(data['products'])
        return {
            "total": total,
            "version": "2.0",
            "model": "qwen3-vl-embedding"
        }

    def get_all_products(self) -> list:
        """获取所有商品"""
        if self._cache is not None:
            return list(self._cache['products'].values())
        return self._load()['products']

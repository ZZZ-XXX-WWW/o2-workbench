# -*- coding: utf-8 -*-
"""
图像特征提取 - 基于 qwen3-vl-embedding（阿里云百炼多模态向量模型）
直接提取图像的 2560 维语义向量，支持融合向量和 rerank 精排
"""
import os, sys, base64, json, time
import dashscope
from dashscope import MultiModalEmbedding
import numpy as np
import requests

# 阿里云 DashScope API Key — 优先使用环境变量，其次使用预设 key（便于开发）
# 建议设置环境变量 DASHSCOPE_API_KEY 避免硬编码泄露
_API_KEY = 'sk-9b16f2e04622482a85304ed7b7c6da0f'
API_KEY = os.environ.get('DASHSCOPE_API_KEY', _API_KEY)
RERANK_URL = 'https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank'


def _load_api_key():
    """确保 dashscope API key 已设置"""
    if not dashscope.api_key:
        api_key = os.environ.get('DASHSCOPE_API_KEY', API_KEY)
        if not api_key:
            raise ValueError("DASHSCOPE_API_KEY 未设置。请在环境变量中配置阿里云 DashScope API Key。")
        dashscope.api_key = api_key


def _img_to_base64(path, max_size=720):
    """图片转 base64 data URI，先压缩到 max_size 像素以加速"""
    ext = os.path.splitext(path)[1].lower()
    mime_map = {'.jpg': 'jpeg', '.jpeg': 'jpeg', '.png': 'png', '.webp': 'webp'}
    mime = mime_map.get(ext, 'jpeg')
    try:
        from PIL import Image
        import io
        img = Image.open(path)
        w, h = img.size
        if max(w, h) > max_size:
            ratio = max_size / max(w, h)
            img = img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
        buf = io.BytesIO()
        if mime == 'png' and img.mode not in ('RGBA', 'P'):
            img = img.convert('RGBA')
        fmt = 'PNG' if mime == 'png' else 'JPEG'
        img.save(buf, format=fmt, quality=85)
        buf.seek(0)
        return f'data:image/{mime};base64,{base64.b64encode(buf.read()).decode()}'
    except Exception:
        with open(path, 'rb') as f:
            return f'data:image/{mime};base64,{base64.b64encode(f.read()).decode()}'


def extract_image_features(image_path: str) -> np.ndarray:
    """
    提取图片的 2560 维语义向量（无文本指令，纯图片向量）
    基于 qwen3-vl-embedding 模型，直接将图像映射到语义空间
    """
    cache_path = image_path + '.qwen3vl_emb.npy'

    # 读缓存
    if os.path.exists(cache_path):
        return np.load(cache_path)

    _load_api_key()

    with open(image_path, 'rb') as f:
        img_b64 = base64.b64encode(f.read()).decode('utf-8')

    resp = MultiModalEmbedding.call(
        model='qwen3-vl-embedding',
        input=[{'image': 'data:image/jpeg;base64,' + img_b64}]
    )

    embedding = np.array(
        resp['output']['embeddings'][0]['embedding'],
        dtype=np.float32
    )

    # 缓存
    np.save(cache_path, embedding)
    return embedding


def extract_image_features_with_prompt(image_path: str, prompt: str) -> np.ndarray:
    """
    提取图片的 2560 维融合语义向量（图片 + 文本指令）
    基于 qwen3-vl-embedding 模型，开启 enable_fusion 模式
    将文本指令和图片内容融合为一个向量
    """
    _load_api_key()

    with open(image_path, 'rb') as f:
        img_b64 = base64.b64encode(f.read()).decode('utf-8')

    resp = MultiModalEmbedding.call(
        model='qwen3-vl-embedding',
        input=[
            {'text': prompt},
            {'image': 'data:image/jpeg;base64,' + img_b64}
        ],
        parameters={'enable_fusion': True}
    )

    embedding = np.array(
        resp['output']['embeddings'][0]['embedding'],
        dtype=np.float32
    )

    return embedding


def rerank(query_image_path: str, candidate_paths: list,
           top_k: int = 5, batch_size: int = 5,
           prompt: str = None) -> list:
    """
    使用 qwen3-vl-rerank 对候选图片进行精排

    Args:
        query_image_path: Query 图片路径
        candidate_paths: 候选图片路径列表
        top_k: 返回前 k 个结果
        batch_size: 每批处理多少个候选（建议 5）
        prompt: 可选的业务指令，如 "请找出与图中款式、花纹完全一致的内衣。"

    Returns:
        [{index, score, path}, ...] 按分数从高到低排序
    """
    if not candidate_paths:
        return []

    query_b64 = _img_to_base64(query_image_path)
    query_obj = {"image": query_b64}
    if prompt:
        query_obj["text"] = prompt

    all_scores = []

    # 分批调用 rerank API
    for batch_start in range(0, len(candidate_paths), batch_size):
        batch = candidate_paths[batch_start:batch_start + batch_size]
        docs = [{"image": _img_to_base64(p)} for p in batch]

        payload = {
            "model": "qwen3-vl-rerank",
            "input": {
                "query": query_obj,
                "documents": docs
            },
            "parameters": {
                "return_documents": False,
                "top_n": len(batch)
            }
        }

        resp = requests.post(
            RERANK_URL,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json=payload,
            timeout=120
        )
        resp.raise_for_status()
        result = resp.json()

        for item in result.get('output', {}).get('results', []):
            idx_in_batch = item['index']
            relevance = item['relevance_score']  # 0~1 分数
            all_scores.append({
                'index': batch_start + idx_in_batch,
                'score': relevance,
                'path': batch[idx_in_batch]
            })

        time.sleep(0.1)  # 避免请求过快

    # 按分数从高到低排序，取 top_k
    all_scores.sort(key=lambda x: x['score'], reverse=True)
    return all_scores[:top_k]


if __name__ == '__main__':
    if len(sys.argv) > 1:
        feat = extract_image_features(sys.argv[1])
        print(f'特征维度: {feat.shape}')

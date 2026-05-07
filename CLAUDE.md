# O2 工作台 — 项目说明

## 项目架构

```
o2-workbench/
├── src/                       # ★ 主前端：Vue 3 + Vite（localhost:5173）
│   ├── views/                 # 页面视图
│   │   ├── workbench/         # 工具区、网站区、任务发起/接受/待办/完成
│   │   ├── oa/                # OA 办公（待办/已办/待阅）
│   │   └── tools/             # 工具集
│   ├── store/                 # Pinia 状态
│   ├── api/o2oa.js            # O2OA API 调用
│   ├── layout/                # 主布局（顶栏 + 侧栏 + 内容区）
│   └── router/index.js        # 路由表
├── backend/                   # ★ 后端：FastAPI（localhost:8527）
│   ├── main.py                # 入口，注册所有路由
│   ├── models.py              # 数据库模型（SQLite + SQLAlchemy）
│   ├── product_models.py      # 商品搜索独立数据库模型（含 PriceChangeLog）
│   └── routes/                # API 路由
│       ├── tools.py           #   工具管理
│       ├── websites.py        #   网站管理
│       ├── tasks.py           #   任务流转
│       ├── departments.py     #   部门管理
│       ├── o2oa_auth.py       #   O2OA 认证代理
│       ├── hexiao.py          #   核销工具 API
│       └── product_search.py  #   商品搜索 API（含调价日志、价格变动记录）
├── product_search/            # ★ 商品搜索桌面版：PySide6
│   ├── ui_pyside6.py          #   主界面（详情弹窗支持编辑、分销商报价）
│   ├── database.py            #   ProductDatabase 类（JSON 存储 + 向量搜索）
│   ├── extract_features.py    #   调用阿里云百炼 qwen3-vl-embedding
│   └── data/                  #   商品数据（products.json）
├── product-search-web/        # ★ 商品搜索 Web 版：React + Webpack
│   ├── src/App.tsx            #   主应用（上传、搜索、详情弹窗编辑、备注图片、分销商报价、调价记录面板）
│   ├── webpack.config.js      #   构建输出到 ../public/product-search/
│   └── dev-server:3266        #   开发服务器（热更新）
├── hexiao/                    # ★ 核销工具桌面版：PySide6
│   ├── hexiao.py              #   主程序：提取·对应·总结
│   └── prices.json            #   价格数据
├── hexiao-web/                # ★ 核销工具 Web 版：React + Webpack
│   ├── src/                   #   组件：FileUploader、PriceEditor、VerificationTool
│   └── webpack.config.js      #   构建输出到 ../public/hexiao-new/
├── public/                    # Vite 静态目录（iframe 嵌入的子应用构建产物）
│   ├── product-search/        #   product-search-web 构建输出（npm run build）
│   └── hexiao-new/            #   hexiao-web 构建输出
├── .vscode/
├── dist/                      # Vite 生产构建输出
├── vite.config.js             # Vite 配置（proxy /api -> :8527）
├── package.json               # 主前端依赖
├── start.bat                  # 一键启动脚本
├── docs/                      # 项目文档
│   ├── 技术方案.md            # 架构设计、模块设计、部署方案
│   └── O2OA_API完整清单.md    # O2OA 全部 API 接口参考
└── CLAUDE.md                  # 本文件
```

## 三个前端应用的区别

| 应用 | 技术栈 | 访问地址 | 开发命令 | 构建命令 | 用途 |
|------|--------|---------|---------|---------|------|
| **主工作台** (src/) | Vue 3 + Vite | localhost:5173 | `npx vite` | `npx vite build` | OA 办公、任务流转、工具集入口 |
| **商品搜索 Web** (product-search-web/) | React + Webpack | localhost:3266 | `npm run dev` | `npm run build`（输出到 public/product-search/） | 以图搜图、商品管理（在主应用中 iframe 嵌入） |
| **核销工具 Web** (hexiao-web/) | React + Webpack | 动态端口 | `npm run dev` | `npm run build`（输出到 public/hexiao-new/） | 对账单核销（在主应用中 iframe 嵌入） |

**重要**：`product-search-web/` 和 `hexiao-web/` 是独立的 React 项目，构建后输出到 `public/` 下。修改这些项目后需要运行 `npm run build` 才能在 iframe 中看到变化，或者直接访问它们的独立 dev 服务器端口。

## 启动方式

```
一键启动: start.bat
  O2OA（:80）→ FastAPI 后端（:8527）→ Vite 前端（:5173）

手动启动:
  cd backend && python main.py              # 后端（热重载监视 backend/）
  cd o2-workbench && npx vite --port 5173   # 主前端 Vue
  cd product-search-web && npm run dev       # 商品搜索独立 dev（:3266）
  cd product_search && python ui_pyside6.py  # 商品搜索桌面版
```

⚠️ `extract_features.py` 不在后端热重载监视范围内，修改后需 kill 所有 python 进程后重启。

## 修改注意事项

### 商品搜索工具
| 要改什么 | 改哪个文件 | 如何生效 |
|---------|-----------|---------|
| Web 界面 | `product-search-web/src/App.tsx` | `npm run build` 或访问 :3266 |
| 桌面界面 | `product_search/ui_pyside6.py` | 重启应用 |
| 搜索 API | `backend/routes/product_search.py` | 热重载 |
| 数据库模型 | `backend/product_models.py` | kill 后端重启 |
| 特征提取 | `product_search/extract_features.py` | kill 所有 python 进程重启 |
| 桌面版搜索逻辑 | `product_search/database.py` | 重启应用 |

### 主工作台
- **前端页面** → `src/views/`
- **布局** → `src/layout/MainLayout.vue`
- **后端** → `backend/routes/`

### 构建后生效
```bash
cd product-search-web && npm run build   # → public/product-search/
cd hexiao-web && npm run build           # → public/hexiao-new/
```

## 项目进度

### ✅ 已完成
- 项目从旧路径迁移到 `o2-workbench/`（英文路径）
- O2OA 服务器完整整合进项目（`o2server/` 真实目录）
- 一键启动脚本 `start.bat`
- **O2OA 接入**：v9.5.2 运行在 `:80`，认证代理、通用 API 代理
- **O2OA 数据**：分销部部门、阿川/冰冰人员
- **核销工具**：React Web 版（14主题）、FastAPI 后端、2017 条价格数据
- **商品搜索**：
  - 以图搜图（qwen3-vl-embedding 2560维，可选 Rerank）
  - 商品 CRUD + 详情弹窗编辑
  - 分销商报价（含名称、价格、运费、备注，分销1/2）
  - 备注插入图片（`[图片: url]` 标记）
  - 搜索状态反馈
  - **独立调价记录面板**（跨商品通用价格变动日志，支持分页/筛选）
  - **编辑自动记录调价**（成本/运费/分销商价格变动自动记入 PriceChangeLog）
  - 桌面版 PySide6（独立）
- **工具区**：核销工具、商品搜索 iframe 弹窗
- **登录**：O2OA 真实认证
- **OA 页面**：待办/已办/已完成 接入真实数据

### 📋 待办
- [ ] 工厂端上传入口（Web/移动端）
- [ ] 价格调整日历视图
- [ ] O2OA 发起流程
- [ ] 通讯录
- [ ] 工具运行引擎（进程池+队列）
- [ ] 核销输出保存 + 对账单导出
- [ ] 部门切换

## 架构图

```
┌───────────────────────────────────────────────┐
│         O2 工作台（localhost:5173）              │
│  ┌─────────┬──────────────┬──────────────┐    │
│  │ 首页     │ OA 办公模块   │  工具区       │    │
│  │ 快捷卡片  │ 待办/已办     │  核销工具    │    │
│  │ 工具快捷  │ 已完成       │  商品图搜    │    │
│  └─────────┴──────────────┴──────────────┘    │
└─────────────────────┬────────────────────────┘
                      │ HTTP/JSON
┌─────────────────────▼────────────────────────┐
│       FastAPI 后端（:8527）                     │
│  O2OA代理 | 工具/网站CRUD | 核销API | 商品搜索API │
│              PriceChangeLog 调价日志            │
└─────────────────────┬────────────────────────┘
                      │ REST API
┌─────────────────────▼────────────────────────┐
│      O2OA 服务器（:80） v9.5.2 Java + H2      │
│       管理员: xadmin/admin123                  │
│       部门: 分销部 | 人员: 阿川, 冰冰           │
└──────────────────────────────────────────────┘
```

## 技术栈
- **前端**：Vue 3 + Element Plus + Pinia + Vue Router + Vite
- **工具 UI**：React 18 + Tailwind + lucide-react + framer-motion
- **后端**：FastAPI + SQLite + SQLAlchemy
- **商品搜索**：阿里云 DashScope qwen3-vl-embedding（2560维向量）
- **OA 后端**：O2OA v9.5.2（Java + H2）
- **部署**：本地开发（start.bat 一键启动）

## 商品搜索功能详情

### 数据录入
- 上传商品图片 + 基本信息（咨询日期、厂家名称、型号代码、成本价、运费）
- 备注支持多行文本和插入图片（上传到 `/api/products/upload-remark-image`，标记为 `[图片: url]`）
- 展开"分销商报价"可填写两个分销商的名称、价格、运费、备注

### 搜索
- 以图搜图（qwen3-vl-embedding 2560维），可选 Rerank 精排
- 搜索状态反馈（搜索中 → 完成数/失败提示）

### 详情弹窗
- 查看完整信息（含分销商名称/价格/运费）
- 点击"编辑"切换编辑模式，保存后自动刷新列表
- 编辑时成本/运费/分销商价格变动自动记录到 PriceChangeLog
- 支持删除商品

### 独立调价记录面板
- 主界面「管理数据库」下方有「调价记录」按钮
- 弹窗显示所有商品的价格变动记录（时间、商品、字段、旧值、新值）
- 支持按字段筛选（成本价/运费/分销商1价格/分销商1运费/分销商2价格/分销商2运费）
- 支持分页查看

### 管理数据库
- 卡片视图，每个卡片有「详情」和「删除」按钮
- 编辑统一在详情弹窗中完成

## 数据存储
| 存储 | 位置 | 用途 |
|------|------|------|
| `backend/workbench.db` | SQLite | 主工作台（用户、部门、工具、任务） |
| `backend/product_search.db` | SQLite | 商品搜索 Web（向量 embedding + 分销商报价 + PriceChangeLog 调价日志） |
| `product_search/data/products.json` | JSON | 商品搜索桌面版 |

### PriceChangeLog 字段说明
| 字段 | 说明 |
|------|------|
| `product_id` | 关联商品 ID |
| `product_name` | 商品名称（冗余，方便查询） |
| `field_name` | 变动的字段：cost_price / shipping_fee / dist1_base_price / dist1_shipping_fee / dist2_base_price / dist2_shipping_fee |
| `field_label` | 中文标签：成本价 / 运费 / 分销商1价格 / ... |
| `old_value` | 旧值 |
| `new_value` | 新值 |
| `effective_date` | 生效日期 |
| `note` | 备注 |
| `created_at` | 记录时间 |

## 关键文件路径
| 文件 | 路径 |
|------|------|
| 核销数据 | `hexiao/prices.json` |
| 对账单模板 | `对账单5.4.xlsx` |
| O2OA 认证 | `backend/routes/o2oa_auth.py` |
| 核销 API | `backend/routes/hexiao.py` |
| 商品搜索 API | `backend/routes/product_search.py` |
| 商品搜索模型 | `backend/product_models.py`（含 PriceChangeLog） |
| O2OA 客户端 | `backend/o2oa_client.py` |
| 前端 O2OA 工具 | `src/api/o2oa.js` |
| 商品搜索 Web 源码 | `product-search-web/src/App.tsx` |
| 核销 Web 源码 | `hexiao-web/src/` |
| 商品搜索桌面版 | `product_search/ui_pyside6.py` |

## 常见陷阱
1. **改错前端**：`src/` 是 Vue 主应用，`product-search-web/` 是 React 子应用
2. **iframe 不更新**：修改 React 子应用后需 `npm run build` 或直接用独立 dev 端口
3. **两个数据库不同步**：桌面版用 JSON，Web 版用 SQLite
4. **API Key**：阿里云 DashScope 优先读 `DASHSCOPE_API_KEY` 环境变量，未设置时用代码中预设 key
5. **后端热重载局限**：只监视 `backend/`，修改 `product_search/` 下文件需完全重启
6. **分销商报价存库**：`Product()` 构造函数必须显式传入 `dist1_base_price` 等字段
7. **路由顺序**：`/price-changes`（无参数）必须在 `/{product_id}`（通配）之前定义，否则会被当成商品 ID
8. **新增字段同时改三处**：改模型(`product_models.py`) → 改 API(`product_search.py`) → 改前端(`App.tsx`) → 构建 → kill 后端重启

# VueCraft

<p align="center">
  <strong>从第一性原理构建 Vue3 精湛技艺</strong>
</p>

<p align="center">
  <a href="#-特性">特性</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="#-知识体系">知识体系</a> •
  <a href="#-技术栈">技术栈</a> •
  <a href="#-路线图">路线图</a>
</p>

---

## ✨ 特性

- 🎯 **第一性原理** - 从最基础的概念出发，深入理解每个知识点
- 🔬 **手写源码实现** - 响应式系统、调度器等核心模块完整实现
- 💻 **可交互演示** - 所有示例代码可直接运行体验
- 📚 **五维讲解模式** - 概念 → API → 原理 → 源码 → 实践
- 🎨 **现代UI界面** - 基于 Element Plus 构建的专业学习平台

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)

### 安装运行

```bash
# 克隆项目
git clone https://github.com/suwei888/vuecraft.git

# 进入目录
cd vuecraft

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 开始学习

---

## 📖 知识体系

| 模块 | 内容 | 状态 |
|------|------|------|
| **基础篇** | 响应式系统、生命周期、组合式API、组件系统、指令系统 | 🟢 已完成 |
| **进阶篇** | Teleport/Suspense、渲染函数、虚拟DOM、编译器原理 | 🟡 开发中 |
| **生态篇** | Vue Router、Pinia状态管理、Vite构建工具 | 🟡 开发中 |
| **工程化篇** | 项目配置、模块化、包管理、CI/CD | 🟡 开发中 |
| **安全篇** | XSS防护、CSRF防御、加密算法、数据保护 | 🟢 已完成 |
| **优化篇** | Tree Shaking、代码分割、压缩策略、缓存优化 | 🟢 已完成 |
| **高级篇** | TypeScript进阶、性能优化、设计模式、源码架构 | 🟡 开发中 |

---

## 🛠 技术栈

| 类型 | 技术 |
|------|------|
| 核心框架 | Vue 3.4+ |
| 类型系统 | TypeScript 5.0+ |
| 构建工具 | Vite 5.x |
| UI组件库 | Element Plus 2.6+ |
| 路由管理 | Vue Router 4.x |
| 状态管理 | Pinia 2.x |
| CSS预处理 | Sass |

---

## 📂 项目结构

```
vuecraft/
├── src/
│   ├── principles/      # 手写原理实现 ⭐
│   │   └── reactive/    # 响应式系统
│   ├── views/           # 知识点页面
│   │   ├── foundation/  # 基础篇
│   │   ├── advanced/    # 进阶篇
│   │   ├── ecosystem/   # 生态篇
│   │   ├── engineering/ # 工程化篇
│   │   ├── security/    # 安全篇
│   │   ├── optimization/# 优化篇
│   │   └── mastery/     # 高级篇
│   ├── components/      # 公共组件
│   └── router/          # 路由配置
└── package.json
```

---

## 🗺 路线图

### v1.0.0 (当前版本)

- [x] 项目基础架构搭建
- [x] 响应式系统原理实现 (reactive/ref/effect/computed/watch)
- [x] 首页知识地图
- [x] 基础篇 - 响应式系统详解
- [x] 安全篇 - XSS/CSRF/加密/数据保护
- [x] 优化篇 - 打包/压缩/加载/缓存策略

### v1.1.0 (计划中)

- [ ] 生命周期详解与可视化
- [ ] 组合式API完整讲解
- [ ] 组件系统深度解析
- [ ] 指令系统与自定义指令

### v1.2.0 (计划中)

- [ ] 虚拟DOM与Diff算法可视化
- [ ] 编译器原理讲解
- [ ] 渲染函数与JSX
- [ ] Vue Router 原理实现

### v2.0.0 (未来规划)

- [ ] 代码在线运行器
- [ ] 学习进度追踪
- [ ] 多语言支持
- [ ] 主题切换

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发规范

```bash
# 提交格式
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
perf: 性能优化
```

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">
  Made with ❤️ by VueCraft Team
</p>
# 紫微斗数 · 国学基础学习平台

<p align="center">
  <img src="https://img.shields.io/badge/国学-紫微斗数-c9a84c?style=flat-square" alt="紫微斗数">
  <img src="https://img.shields.io/badge/技术-纯前端-0a0a0f?style=flat-square" alt="纯前端">
  <img src="https://img.shields.io/badge/部署-GitHub%20Pages-24292e?style=flat-square" alt="GitHub Pages">
</p>

> 以星为镜，观天之道。探索千年传承的东方智慧。

## ✨ 项目介绍

本项目是「国学基础学习平台」的 **Part 1：紫微斗数** 模块，致力于以现代高端科技感的视觉语言，呈现中国传统命理学的深厚底蕴。

设计风格融合了 **Apple / 法拉利 / 爱马仕** 级别的高端品质感与中国传统文化的墨韵、金色、朱砂等经典元素。

## 🎨 设计亮点

| 维度 | 设计决策 |
|------|---------|
| **色彩** | 深空黑 `#0a0a0f` 为主背景，暖奶油白 `#f4f3ed` 为文字，帝王金 `#c9a84c` 为点缀 |
| **字体** | 中文标题使用思源宋体传递传统韵味，正文使用思源黑体保证可读性 |
| **布局** | 全屏沉浸式 Hero + 分屏学习区 + 图文交替模块 |
| **质感** | 零圆角锐利边缘、1px 细线分隔、大量负空间、画廊级排版 |
| **动效** | Canvas 星空粒子 + 紫微十四主星连线星座图 |

## 📁 项目结构

```
ziwei-platform/
├── index.html          # 主页面
├── styles.css          # 样式系统
├── app.js              # 交互逻辑
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions 自动部署
└── README.md           # 项目说明
```

## 🚀 本地预览

无需任何构建工具，直接用浏览器打开 `index.html` 即可：

```bash
# 方式一：直接打开
open index.html

# 方式二：启动本地服务器
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

## 🌐 在线访问

部署到 GitHub Pages 后，可通过以下地址访问：

```
https://<你的用户名>.github.io/ziwei-platform/
```

## 📚 内容模块

### 当前已上线（Part 1）

- [x] **紫微斗数概论** — 什么是紫微斗数，历史渊源
- [x] **十二宫位体系** — 命宫、兄弟宫、夫妻宫等十二宫详解
- [x] **十四主星** — 紫微星系与天府星系
- [x] **四化飞星** — 化禄、化权、化科、化忌

### 计划中（后续 Part）

- [ ] 八字命理
- [ ] 易经六十四卦
- [ ] 风水基础
- [ ] 奇门遁甲

## 🛠️ 技术栈

- **HTML5** — 语义化结构
- **CSS3** — CSS Variables、Grid、Flexbox、Clip-path
- **Vanilla JavaScript** — Canvas 动画、IntersectionObserver、SVG 操作
- **Google Fonts** — Noto Serif SC / Noto Sans SC

## 📄 许可

本项目仅供学习交流使用，传承中华传统文化。

---

<p align="center">
  <strong>传承千年东方智慧</strong>
</p>

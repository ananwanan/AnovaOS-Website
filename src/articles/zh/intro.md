---
title: 项目介绍
---

## 从一次启动开始

AnovaOS 是面向 x86_64 的独立 Rust 操作系统。它的长期目标是让开发者在系统内部编辑、编译、调试和运行应用，同时逐项验证现有 Linux 软件能使用哪些系统接口。

## 现在可以体验什么

串口模式适合观察 UEFI 引导、交互式 shell 和磁盘持久化。图形桌面提供启动器、PTY 终端、源码编辑器和资源监视器。M17.5 在本地 QEMU 中验证了三个固定的 C、C++、Rust 项目从输入源码到重启后再次运行的流程。

## 如何阅读验证记录

每个阶段单独记录机器配置、验收输入、实际结果及未覆盖范围。M16 的本地存储验收与远端 CI 收尾分别跟踪。M18 的编译器源码重建和纯来宾镜像生成仍有各自的前置条件。

## 上游参考资料

- [项目概览](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/PROJECT_OUTLINE.md)
- [本地桌面验收](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/validation/M17.5.md)
- [项目状态](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/guides/STATUS.md)


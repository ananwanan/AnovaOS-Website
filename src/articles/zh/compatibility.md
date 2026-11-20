---
title: 兼容性边界
---

## 已验证的软件配置

M8 验证了部分 BusyBox 1.36.1 命令。M9 扩展到 musl 1.2.4 静态、静态 PIE 和动态 ELF，包括已声明范围内的线程、信号、TLS 和 PTY。使用上游兼容性文档查找具体程序、版本和依赖。

## 图形与存储

M17 的本地 QEMU 记录覆盖图形终端、文件编辑、受限任务监控和固定的三语言构建流程。选定的 ext4/JBD2 工作盘有单独的受控写入与恢复验证。ext2 支持正常关机后的持久化，没有日志或断电恢复。

## 尚待验证

通用 glibc 应用、SMP、USB、物理硬件适配和原生 Rust `std` 仍在验收范围之外。M15 的内核重建使用已有工具，镜像打包由宿主协助。M18 将根据实测资源重新评估 GCC、LLVM/rustc/Cargo 和来宾独立生成引导镜像。

## 上游参考资料

- [兼容性清单](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/COMPATIBILITY.md)
- [存储恢复验证](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/validation/M16.5.md)
- [后续路线](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/ROADMAP.md)


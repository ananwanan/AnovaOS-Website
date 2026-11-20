---
title: 系统架构
---

## 从固件到第一个进程

UEFI 启动 Limine，后者将内核 ELF、initramfs 和必要的引导信息交给内核。内核建立页表、异常处理、定时器和堆，随后启动用户任务与 VFS，并将交互交给 init 和 shell。

## 两类应用接口

原生应用通过 `anova.native.v1` 调用内核。指定的 Linux ELF 通过单独的 Linux ABI 适配层运行。两条路径最终共享进程、内存和文件语义。模块化单体内核管理硬件和底层资源，图形合成器运行在隔离的用户进程中。

## 资源与设备边界

当前配置使用一个启动处理器、32 个进程／线程槽位和固定的 16 MiB 内核堆。用户任务支持抢占，内核本身不可抢占。外设主要通过轮询提供 I/O。普通桌面采用软件合成，VirGL 的离屏验证单独记录。

## 上游参考资料

- [架构说明](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/ARCHITECTURE.md)
- [图形实现与验证](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/validation/M14.5.md)


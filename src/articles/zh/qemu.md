---
title: 在 QEMU 中体验
---

## 保存串口会话写入的文件

默认镜像使用 q35/TCG、OVMF 和临时 ext2 数据盘。需要跨次启动保留文件时，创建一个新工作盘，并在每次运行时传入同一路径。使用来宾的 `shutdown` 正常关机。

```sh
cargo xtask root-image build/disks/work.ext2
cargo xtask run --disk build/disks/work.ext2
```

## 启动开发桌面

图形模式要求宿主显示环境。在启动器中按 `t` 打开图形 PTY。用 `F5` 创建新 shell，`F4` 关闭。默认桌面包含 shell，带 GCC 的配置需要单独准备编译器和 Linux personality 工作盘。

```sh
cargo xtask desktop-image
cargo xtask run --desktop
```

## 在图形终端中使用 GCC

在宿主仓库依次运行下面的命令。创建镜像时使用新的文件名。进入来宾后可用 `/bin/gcc /etc/terminal-hello.c -o /persist/pty-app` 编译，再运行 `/persist/pty-app`。

```sh
cargo xtask toolchain-build
cargo xtask ext4-journal-image --linux build/disks/pty-work.ext4
cargo xtask terminal-image --toolchain
cargo xtask run --desktop --toolchain --disk build/disks/pty-work.ext4
```

## 上游参考资料

- [图形终端启动说明](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/milestones/M17_PTY.md)
- [验收机器配置](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/validation/M17.2.md)


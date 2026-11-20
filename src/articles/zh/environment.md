---
title: 开发环境
---

## 在主机上准备工具

上游记录的主机是 x86_64 Ubuntu 24.04.3，也验证了 Ubuntu 24.04 的 WSL2 / QEMU TCG 组合。先安装 rustup，然后准备宿主工具。在克隆后的仓库根目录运行 Rust 命令，rustup 会读取项目固定的工具链。

```sh
sudo apt-get update
sudo apt-get install --no-install-recommends qemu-system-x86 xorriso curl dpkg-dev gcc g++ binutils make musl-tools qemu-user e2fsprogs openssl python3
git clone --branch dev https://github.com/ananwanan/AnovaOS.git
cd AnovaOS
rustup show active-toolchain
```

## 检查固定的依赖

仓库固定了 Rust 1.90.0、rustfmt、Clippy 和裸机目标 `x86_64-unknown-none`，并检查 QEMU 8.2.2。首次获取 Limine 和 OVMF 需要网络。下载内容在解包前进行校验，OVMF 提取到本地构建目录。

```sh
cargo xtask fetch
cargo xtask doctor
```

`doctor` 会报告缺失的工具、版本或引导输入。来宾 GCC 和 Rust 工具链的额外依赖见上游配置指南。

## 上游参考资料

- [宿主配置](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/guides/DEVELOPMENT.md)
- [工具链](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/guides/TOOLCHAINS.md)


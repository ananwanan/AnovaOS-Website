---
title: 编译与运行
---

## 构建 UEFI 镜像

在操作系统仓库根目录，先完成环境检查，然后依次构建内核、用户应用和镜像。多个构建流程会共享输出，请按顺序运行。

```sh
cargo xtask build
cargo xtask apps
cargo xtask image
cargo xtask run
```

内核 ELF 位于 `target/x86_64-unknown-none/debug/anova-kernel`，启动镜像位于 `build/images/anova-normal.iso`。默认运行进入串口 shell，使用临时数据盘。

## 检查本次构建

```sh
cargo xtask test-host
cargo xtask verify
```

宿主测试检查分配器、VFS 和调度器等组件。启动验证还检查预期的错误退出和引导保护，每项结果的含义见对应验收记录。

## 上游参考资料

- [构建命令与输出](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/guides/DEVELOPMENT.md)
- [启动验收](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/validation/M0-M1.md)


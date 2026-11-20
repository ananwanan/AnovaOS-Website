---
title: SDK 与应用开发
---

## 创建原生应用

在操作系统仓库中导出 SDK，然后创建 C 模板。模板类型也可选 `cpp` 或 `rust`。导出目录包含启动代码、链接脚本、头文件、Rust 源码、模板和校验清单。

```sh
cargo xtask sdk
cargo xtask app-new c build/my-app
cargo xtask app-build build/my-app
```

构建会生成 `app.elf` 和应用清单 `app.toml`。SDK 版本 1.0.0 描述这套开发包，原生系统调用接口以独立的 `anova.native.v1` 标识。

## 选择原生或 Linux-musl 工具链

原生模板采用无 libc 的 C、无标准库的 C++ 或 Rust `no_std`。来宾 GCC/G++ 和 rustc/Cargo 已验证的用例属于 Linux-musl 路径。编译自己的应用与从源代码重建编译器有独立的验收标准。

## 图形 SDK

`cargo xtask gui-sdk` 导出单独的 `anova.gui.v1` 运行时接口。C 使用头文件，C++ 使用资源所有权封装，Rust 使用安全封装。每个进程最多拥有一个活动窗口，受支持尺寸和输入事件详见图形 SDK。

## 上游参考资料

- [原生 SDK](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/sdk/README.zh-CN.md)
- [图形 SDK](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/sdk/gui/README.zh-CN.md)
- [SDK 验收](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/validation/M13.md)


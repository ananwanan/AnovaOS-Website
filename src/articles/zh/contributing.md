---
title: 开发贡献指南
---

## 选择一个可复现的问题

先阅读当前状态和对应阶段的验收记录。报告问题时，附上分支或提交、宿主和 QEMU 配置、运行命令、观察到的输出及预期结果。新功能可先说明它扩展的子系统和可观察的完成条件。

[提交操作系统 Issue](https://github.com/ananwanan/AnovaOS/issues/new)

## 从 dev 开始

操作系统日常开发和 PR 的目标分支为 `dev`。从该分支创建任务分支，检查自己的改动后提交 PR。上游要求开发标识符、源码注释、提交信息和 PR 标题及描述使用英语。每份第一方文件需要职责说明和文件清单记录，相关中英文文档应同步更新。

```sh
git clone --branch dev https://github.com/ananwanan/AnovaOS.git
cd AnovaOS
git switch -c feat/my-change
```

## 提交前验证

运行与改动相关的子系统测试，记录实际执行的配置。仓库还提供以下通用检查。

```sh
python3 scripts/check_docs.py
cargo xtask check-files
cargo fmt --all -- --check
cargo fmt --manifest-path user/Cargo.toml --all -- --check
git diff --check
```

[向 dev 发起 Pull Request](https://github.com/ananwanan/AnovaOS/compare/dev...)

## 许可与归属

操作系统第一方源码、文档、测试和示例使用 Apache-2.0。保留适用的 NOTICE 和第三方许可，按上游规则标识修改。官网工程独立使用其仓库的 MPL-2.0。

## 上游参考资料

- [协作流程](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/guides/GITHUB_SETUP.md)
- [开发约定](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/guides/CODING_STYLE.md)
- [许可证与第三方内容](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/zh-CN/guides/LICENSING.md)


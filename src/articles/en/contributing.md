---
title: Contributing
---

## Pick a reproducible problem

Read the current status and relevant acceptance record. For an issue, include the revision, host and QEMU profile, commands, observed output and expected result. For a feature proposal, describe the affected subsystem and an observable completion condition.

[Open an OS issue](https://github.com/ananwanan/AnovaOS/issues/new)

## Branch from dev

The OS uses `dev` for everyday development and as the PR base. Start a task branch from it and review your diff before submitting. Upstream requires English identifiers, code comments, commit messages and PR titles and descriptions. First-party files need purpose statements and inventory entries. Update affected Chinese and English documentation together.

```sh
git clone --branch dev https://github.com/ananwanan/AnovaOS.git
cd AnovaOS
git switch -c feat/my-change
```

## Validate the change

Run the relevant subsystem tests and record which profiles you exercised. The repository also provides these general checks.

```sh
python3 scripts/check_docs.py
cargo xtask check-files
cargo fmt --all -- --check
cargo fmt --manifest-path user/Cargo.toml --all -- --check
git diff --check
```

[Open a pull request against dev](https://github.com/ananwanan/AnovaOS/compare/dev...)

## License and attribution

Original OS code, documents, tests and examples use Apache-2.0. Retain applicable NOTICE and third-party licenses, and identify modifications under the upstream rules. The website project separately uses its repository's MPL-2.0 license.

## Upstream references

- [Collaboration workflow](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/guides/GITHUB_SETUP.md)
- [Coding style](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/guides/CODING_STYLE.md)
- [Licensing and third-party content](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/guides/LICENSING.md)


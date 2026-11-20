---
title: Build and run
---

## Build the UEFI image

After the environment check, build the kernel, user applications and image from the OS repository root. Image-building commands share output snapshots, so run them in sequence.

```sh
cargo xtask build
cargo xtask apps
cargo xtask image
cargo xtask run
```

The kernel ELF is at `target/x86_64-unknown-none/debug/anova-kernel`. The boot image is at `build/images/anova-normal.iso`. The default run starts the serial shell with a temporary data disk.

## Check your build

```sh
cargo xtask test-host
cargo xtask verify
```

Host tests exercise components including the allocator, VFS and scheduler. Boot verification also checks deliberate failure exits and boot protections. Consult the acceptance records when interpreting each result.

## Upstream references

- [Commands and outputs](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/guides/DEVELOPMENT.md)
- [Boot validation](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/validation/M0-M1.md)


---
title: Development environment
---

## Prepare your host

The recorded host is x86_64 Ubuntu 24.04.3. The project also documents Ubuntu 24.04 on WSL2 with QEMU TCG. Install rustup, add host tools, then run Rust commands from the checkout so rustup reads the pinned toolchain.

```sh
sudo apt-get update
sudo apt-get install --no-install-recommends qemu-system-x86 xorriso curl dpkg-dev gcc g++ binutils make musl-tools qemu-user e2fsprogs openssl python3
git clone --branch dev https://github.com/ananwanan/AnovaOS.git
cd AnovaOS
rustup show active-toolchain
```

## Check the pinned inputs

The checkout selects Rust 1.90.0, rustfmt, Clippy and the bare-metal `x86_64-unknown-none` target. It checks QEMU 8.2.2. The initial fetch needs network access for the pinned Limine and OVMF inputs. Downloads are verified before extraction and the firmware is kept under the build directory.

```sh
cargo xtask fetch
cargo xtask doctor
```

Read the diagnostics for missing tools, incorrect versions and unavailable boot inputs. Optional guest compilers have additional host dependencies in the upstream guide.

## Upstream references

- [Host setup](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/guides/DEVELOPMENT.md)
- [Toolchains](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/guides/TOOLCHAINS.md)


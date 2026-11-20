---
title: Run in QEMU
---

## Keep files between serial sessions

The default profile uses q35/TCG, OVMF and a disposable ext2 disk. To keep your files, create a new work disk and give its path on every run. Use the guest's `shutdown` command to power off cleanly.

```sh
cargo xtask root-image build/disks/work.ext2
cargo xtask run --disk build/disks/work.ext2
```

## Open the development desktop

Interactive graphics require a host display. Focus the launcher and press `t` for the PTY terminal. Press `F5` for a new shell or `F4` to close. The default desktop includes the shell. Its GCC profile requires a separate toolchain and a Linux-personality work disk.

```sh
cargo xtask desktop-image
cargo xtask run --desktop
```

## Compile inside the graphical terminal

Run these commands in order on the host. Choose a fresh path when creating the disk. Then compile in the guest with `/bin/gcc /etc/terminal-hello.c -o /persist/pty-app` and run `/persist/pty-app`.

```sh
cargo xtask toolchain-build
cargo xtask ext4-journal-image --linux build/disks/pty-work.ext4
cargo xtask terminal-image --toolchain
cargo xtask run --desktop --toolchain --disk build/disks/pty-work.ext4
```

## Upstream references

- [PTY launch instructions](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/milestones/M17_PTY.md)
- [Test machine profile](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/validation/M17.2.md)


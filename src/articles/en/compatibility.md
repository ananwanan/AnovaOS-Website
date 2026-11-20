---
title: Compatibility boundaries
---

## Validated software profiles

M8 exercises a selected group of BusyBox 1.36.1 commands. M9 adds static, static PIE and dynamic musl 1.2.4 ELF programs, with documented coverage of threads, signals, TLS and PTYs. Look up the exact program, version and dependencies in the compatibility reference.

## Graphics and storage

The M17 local QEMU records cover a graphical terminal, file editing, scoped task monitoring and fixed three-language build recipes. Selected ext4/JBD2 work disks have separate controlled-write and recovery tests. Ext2 supports persistence after clean shutdown and has no journal or power-loss recovery.

## Work awaiting verification

General glibc applications, SMP, USB, physical hardware and native Rust `std` remain outside the validated profiles. M15 rebuilt the kernel with existing tools and packaged the image with host assistance. M18 will reassess GCC, LLVM/rustc/Cargo and guest-only boot-image production against measured resource prerequisites.

## Upstream references

- [Compatibility matrix](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/COMPATIBILITY.md)
- [Storage recovery evidence](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/validation/M16.5.md)
- [Roadmap](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/ROADMAP.md)


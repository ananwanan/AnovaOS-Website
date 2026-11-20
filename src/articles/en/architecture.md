---
title: System architecture
---

## From firmware to the first process

UEFI starts Limine, which hands the kernel ELF, initramfs and boot information to the kernel. The kernel establishes paging, exception handling, timers and the heap before bringing up tasks and the VFS. Init and the shell take over user interaction.

## Two application interfaces

Native applications use `anova.native.v1`. Admitted Linux ELF programs enter through a separate Linux ABI adapter. Both paths share process, memory and file semantics. A modular monolithic kernel owns hardware and core resources. The graphical compositor runs in an isolated user process.

## Resource and device boundaries

The current profile uses one boot processor, 32 shared process/thread slots and a fixed 16 MiB kernel heap. User tasks support preemption, while the kernel is non-preemptible. Peripheral devices use polled I/O. Ordinary desktop composition is software-rendered, with separate validation for offscreen VirGL operations.

## Upstream references

- [Architecture reference](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/ARCHITECTURE.md)
- [Graphics validation](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/validation/M14.5.md)


---
title: SDK and applications
---

## Create a native application

Export the SDK from the OS checkout and create a C project. Use `cpp` or `rust` to select another template. The export includes startup files, a linker script, headers, Rust sources, templates and a checksum inventory.

```sh
cargo xtask sdk
cargo xtask app-new c build/my-app
cargo xtask app-build build/my-app
```

The build produces `app.elf` and a checked `app.toml` manifest. SDK 1.0.0 identifies this development kit. Native system calls are versioned independently as `anova.native.v1`.

## Choose the right toolchain

The native templates use freestanding C, C++ without its standard library, or Rust `no_std`. The validated GCC/G++ and rustc/Cargo workloads inside the guest use the Linux-musl personality. Building an application and reconstructing its compiler from source have separate acceptance criteria.

## GUI SDK

`cargo xtask gui-sdk` exports the independent `anova.gui.v1` interface. C uses a header, C++ an ownership wrapper, and Rust a safe wrapper. Each process can own one live window. Consult the GUI SDK for dimensions and supported input events.

## Upstream references

- [Native SDK](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/sdk/README.md)
- [GUI SDK](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/sdk/gui/README.md)
- [SDK validation](https://github.com/ananwanan/AnovaOS/blob/a2a16a635d961713a7fd1b802234626a8b82c0cc/docs/en/validation/M13.md)


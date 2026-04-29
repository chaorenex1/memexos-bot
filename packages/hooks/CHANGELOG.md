# @repo/hooks

## 0.1.1

### Patch Changes

- 1ea9590: Upgrade the shared React stack to React 19 compatibility and align workspace build tooling.
  - widen internal package React peer ranges to support React 19
  - fix shared router, i18n, and persisted store typing for the upgraded toolchain
  - update shared TypeScript and Vite config packages for the new React/Vite setup
  - support stable `@repo/*` package-style imports, including `@repo/theme/globals.css`, across web and desktop builds
  - @repo/utils@0.1.0

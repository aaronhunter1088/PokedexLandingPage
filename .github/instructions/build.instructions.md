---
applyTo: 'package.json'
description: 'Build Instructions'
---
Apply these instructions when modifying the `package.json` file.

## Package Manager

- Use **npm LTS** exclusively (`"packageManager": "npm@version"`).
- Run `npm install` (or the `installLandingPage` script) after any dependency change.
- Do not use `yarn`, `pnpm`, or any other package manager.
- Commit both `package.json` and `package-lock.json` together whenever dependencies change.

## Versioning

- The project version follows **semantic versioning** (`major.minor.patch`).
- Increment the **patch** number for bug fixes and minor updates.
- Increment the **minor** number for new features.
- Keep the **major** number unchanged unless a major architectural change is introduced.
- Always keep the version in `package.json` in sync with the version documented in `README.md`.

## Scripts

The following npm scripts are defined and should be kept up to date:

| Script | Command | Purpose |
| ------ | ------- | ------- |
| `startLandingPage` | `ng serve` | Start dev server at `http://localhost:4200` |
| `startLandingPageAndMobile` | `ng serve --host 0.0.0.0` | Start dev server accessible on the local network |
| `installLandingPage` | `npm install` | Install all dependencies |
| `deployLandingPageForServer` | `ng build --base-href / --deploy-url /` | Production build for server deployment |
| `watch` | `ng build --watch --configuration development` | Build in watch mode (development) |
| `test` | `ng test` | Run Vitest unit tests |

- Do not remove or rename existing scripts without updating all documentation that references them.
- Add new scripts following the `camelCase` naming pattern used above.

## Dependencies

### Runtime dependencies (`dependencies`)

Use the current Angular major line for all `@angular/*` packages and allow compatible minor/patch updates by leaving the range at the major line. Only update these docs when the project moves to a new major version.

| Package | Version |
| ------- | ------- |
| `@angular/animations` | `^22.x` |
| `@angular/cdk` | `^22.x` |
| `@angular/common` | `^22.x` |
| `@angular/compiler` | `^22.x` |
| `@angular/core` | `^22.x` |
| `@angular/forms` | `^22.x` |
| `@angular/material` | `^22.x` |
| `@angular/platform-browser` | `^22.x` |
| `@angular/router` | `^22.x` |
| `ngx-color` | `^10.x` |
| `rxjs` | `~7.8.x` |
| `tslib` | `^2.x` |

### Dev dependencies (`devDependencies`)

| Package | Version |
| ------- | ------- |
| `@angular/build` | `^22.x` |
| `@angular/cli` | `^22.x` |
| `@angular/compiler-cli` | `^22.x` |
| `jsdom` | `^27.x` |
| `typescript` | `~6.0.x` |
| `vitest` | `^4.x` |

- All `@angular/*` packages must stay on the **same major version** (currently `22.x`).
- Use `^` (caret) for Angular and most packages to allow compatible minor/patch updates without doc churn.
- Use `~` (tilde) only where stricter patch-level pinning is needed (e.g., `rxjs`, `typescript`).
- The current toolchain expects **Node.js 20.19 or newer**.
- Do not add unnecessary dependencies — prefer using libraries already present in the project.
- Verify Angular Material compatibility before upgrading any `@angular/*` package.
- Update these version ranges only when the project moves to a new major line (for example `23.x`), not for routine `22.x` minor/patch releases.

## Prettier Configuration

The Prettier config is embedded in `package.json` and must not be moved to a separate file:

- `printWidth`: 100
- `singleQuote`: true
- HTML files use the `angular` parser

Do not change these settings without updating `.editorconfig` and related code style documentation.

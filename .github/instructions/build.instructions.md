---
applyTo: 'package.json'
description: 'Build Instructions'
---
Apply these instructions when modifying the `package.json` file.

## Package Manager

- Use **npm 11.6.2** exclusively (`"packageManager": "npm@11.6.2"`).
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

| Package | Version |
| ------- | ------- |
| `@angular/cdk` | `^21.0.6` |
| `@angular/common` | `^21.0.0` |
| `@angular/compiler` | `^21.0.0` |
| `@angular/core` | `^21.0.0` |
| `@angular/forms` | `^21.0.0` |
| `@angular/material` | `^21.0.6` |
| `@angular/platform-browser` | `^21.0.0` |
| `@angular/router` | `^21.0.0` |
| `ngx-color` | `^10.1.0` |
| `rxjs` | `~7.8.0` |
| `tslib` | `^2.3.0` |

### Dev dependencies (`devDependencies`)

| Package | Version |
| ------- | ------- |
| `@angular/build` | `^21.0.5` |
| `@angular/cli` | `^21.0.5` |
| `@angular/compiler-cli` | `^21.0.0` |
| `jsdom` | `^27.1.0` |
| `typescript` | `~5.9.2` |
| `vitest` | `^4.0.8` |

- All `@angular/*` packages must stay on the **same major version** (currently `21`).
- Use `^` (caret) for Angular and most packages to allow compatible minor/patch updates.
- Use `~` (tilde) only where stricter patch-level pinning is needed (e.g., `rxjs`, `typescript`).
- Do not add unnecessary dependencies — prefer using libraries already present in the project.
- Verify Angular Material compatibility before upgrading any `@angular/*` package.

## Prettier Configuration

The Prettier config is embedded in `package.json` and must not be moved to a separate file:

- `printWidth`: 100
- `singleQuote`: true
- HTML files use the `angular` parser

Do not change these settings without updating `.editorconfig` and related code style documentation.

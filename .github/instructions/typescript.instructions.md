---
applyTo: '**/*.ts'
description: 'TypeScript Coding Standards'
---
Apply these instructions when editing TypeScript source files.

## General

- Use **single quotes** for all strings.
- Indent with **2 spaces** — no tabs.
- Maximum line length is **100 characters**.
- Enable and respect **strict TypeScript** mode (`"strict": true` in `tsconfig.json`).
- Always specify types explicitly; do not rely on inference for public or protected APIs.
- Prefer `const` over `let`; never use `var`.
- End every file with a **trailing newline**.

## Angular Component Rules

- All components must be **standalone** (`standalone: true` in the decorator).
- Always set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Use `templateUrl` and `styleUrl` (or `styleUrls`) — no inline templates or styles.
- Component selectors use the `app-` prefix (e.g., `app-root`, `app-tiles`).
- File names use **lowercase without the `.component` suffix** (e.g., `app.ts`, `tiles.ts`).
- Co-locate the component class, template, and stylesheet in the same folder.

## Import Order

Organize imports in this order, with a blank line between each group:

1. Angular core/common (`@angular/core`, `@angular/common`, etc.)
2. Third-party libraries (`ngx-color`, etc.)
3. Local Angular Material module (`./materialModule`)
4. Sibling or child components
5. Environment files (`../environments/environment`)

## Class Property Ordering

Declare class members in this order:

1. `@ViewChild` / `@ViewChildren` references
2. **Signals** — `protected readonly` for display-only values; `protected` (without `readonly`) for mutable state
3. **Icons** — `protected readonly icon_*` string constants
4. **Exposed globals** — e.g., `protected readonly Math = Math`
5. **External URLs** sourced from `environment`
6. **Color constants** — `protected readonly COLOR_*`
7. **localStorage key constants** — `protected readonly SCREAMING_SNAKE_CASE`
8. **Default/config constants** — other `protected readonly` primitives
9. **Mutable signal properties** — tile/region name state signals
10. `private readonly` data structures (maps, sets, arrays)
11. Any remaining derived signals

## Naming Conventions

| Kind | Convention | Example |
| ---- | ---------- | ------- |
| localStorage keys | `SCREAMING_SNAKE_CASE` | `TILE_1_BACKGROUND_COLOR` |
| Color constants | `COLOR_` prefix + `SCREAMING_SNAKE_CASE` | `COLOR_WHITE`, `COLOR_BLACK` |
| Icon constants | `icon_` prefix + `snake_case` | `icon_sunny`, `icon_bookmark_save` |
| Signals | `camelCase` | `tile1BackgroundColor`, `regionNameBlur` |
| Private helper methods | `camelCase` verb phrases | `setTile1BackgroundColorFromHex`, `hexToRgb` |
| Public/protected action methods | `camelCase` verb phrases | `updateTileTransparency`, `toggleBackground` |

## Signals

- Use Angular's `signal()` API from `@angular/core` for all reactive state.
- Read signal values with `()` call syntax: `this.mySignal()`.
- Mutate signal values with `.set()`: `this.mySignal.set(newValue)`.
- Signal declarations that should never be reassigned use `protected readonly`.
- Signal declarations for mutable component state use `protected` (without `readonly`).

```typescript
// Static / display-only
protected readonly title = signal('My Pokédex')

// Mutable component state
protected tile1BackgroundColor = signal(this.COLOR_WHITE)
```

## Access Modifiers

- Use `protected` for properties and methods accessed from the template.
- Use `private` for internal helper methods and data not exposed to the template.
- Use `private readonly` for internal data structures that are never reassigned.
- Use `protected readonly` for constants, icons, URLs, and immutable config values.
- Constructor parameters injected as dependencies use `private` (e.g., `private cdr: ChangeDetectorRef`).

## LocalStorage

- Define every localStorage key as a `protected readonly SCREAMING_SNAKE_CASE` constant.
- Never use raw string literals as keys outside of the constant declaration.
- Always guard against `null` when reading: use `|| this.signalDefault()` or `=== 'true'` for booleans.
- Parse numbers with `Number(value)`, booleans with `=== 'true'`, strings directly.
- Mirror every `setItem` call with a corresponding constant key.

```typescript
// Key constant
protected readonly TILE_1_TRANSPARENCY = 'tile1Transparency'

// Reading
const stored = localStorage.getItem(this.TILE_1_TRANSPARENCY)
this.tile1Transparency.set(Number(stored || this.tile1Transparency()))

// Writing
localStorage.setItem(this.TILE_1_TRANSPARENCY, value.toString())

// Boolean
const flag = localStorage.getItem(this.MATCH_TILE_COLORS)
this.matchTileColors.set(flag === 'true')
```

## CSS Custom Properties

- Set CSS variables via `document.documentElement.style.setProperty('--var-name', value)`.
- CSS variable names use **kebab-case**, scoped by component (e.g., `--tile1-red-color`, `--region-name-blur`).
- Always convert numeric values to strings when passing to `setProperty`.
- Group hex-to-RGB conversions behind a private helper (`hexToRgb`); never inline the conversion.

## Change Detection

- Inject `ChangeDetectorRef` as `private cdr` in the constructor.
- Call `this.cdr.detectChanges()` after any state mutation that must immediately reflect in the view.
- Do not call `detectChanges()` inside pure helper methods — call it at the end of the public action method.

## Lifecycle Hooks

- Use `ngOnInit()` for initialization logic (localStorage reads, signal setup).
- Use `ngAfterViewInit()` for logic that depends on `@ViewChild` references.
- Declare `ngOnChanges()` and `ngOnDestroy()` even when empty, if the component registers them.
- Keep the constructor for **dependency injection only** — no logic.

## Non-Null Assertions

- Use `!` non-null assertion on `@ViewChild` properties declared at class scope.

```typescript
@ViewChild('sidenav') sidenav!: MatSidenav
```

## Method Comments and Sectioning

- Prefix every public/protected method with a single-line comment describing its purpose.
- Use section dividers to group related methods:

```typescript
// =========== Tile Settings Methods =========== //
```

- Use inline comments to clarify non-obvious logic — keep them concise.

## Environment Variables

- Always import from `../environments/environment` (Angular CLI replaces this at build time).
- Expose environment values as `protected readonly` properties sourced from `environment`:

```typescript
protected readonly springBootAppUrl: string = environment.springBootAppUrl
```

- Never reference `environment` directly in templates — always go via a class property.

## Type Annotations

- Annotate all method return types explicitly (e.g., `: void`, `: string`, `: boolean`).
- Use `any` only when a value is immediately narrowed by a cast (e.g., slider event objects).
- Prefer union types or `| null` over `any` where possible.
- Type object literals inline when the structure is simple:

```typescript
private hexToRgb(hex: string): { r: number; g: number; b: number } | null { ... }
```

## Testing

- Write tests using **Vitest** (`npm test`).
- Test component behaviour, not implementation details.
- Mock `localStorage` for any test that reads or writes persistent settings.
- Mock `ChangeDetectorRef` with at minimum a `{ detectChanges: vi.fn() }` object, cast via `unknown`:

```typescript
const cdr = { detectChanges: vi.fn() } as unknown as ChangeDetectorRef
```

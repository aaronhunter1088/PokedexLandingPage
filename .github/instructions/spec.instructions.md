---
applyTo: '**/*spec.ts'
description: 'Spec Testing Standards'
---
Apply these instructions when generating test classes.

## General

- Use **Vitest** as the test runner — import all test utilities explicitly from `'vitest'`.
- Never rely on globally injected test helpers; always import `describe`, `it`, `expect`, `vi`,
  `beforeEach`, and `afterEach` from `'vitest'`.
- Test component **behaviour**, not implementation details.
- Keep every test independent — no shared mutable state carried between tests.
- End every file with a **trailing newline**.

## Import Order

Organize imports in this order, with a blank line between each group:

1. `import '@angular/compiler'` — always the very first line in every component spec file
2. Angular core/router packages (`@angular/core`, `@angular/router`, etc.)
3. Third-party libraries (`rxjs`, etc.)
4. Vitest utilities (`vitest`)
5. The component under test (local import, last)

```typescript
import '@angular/compiler'
import {ActivatedRoute, Router} from '@angular/router'
import {ChangeDetectorRef, NgZone} from '@angular/core'
import {of} from 'rxjs'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {MyComponent} from './my-component'
```

## Direct Instantiation — No TestBed

- **Do not use `TestBed`**. Instantiate components directly with `new ComponentClass(deps...)`.
- This keeps tests fast, free of Angular Material provider setup, and router-independent.
- Provide all constructor dependencies as hand-crafted mock objects.

## localStorage Mock

Both spec files use an identical Map-backed `Storage` mock. Copy this pattern exactly:

```typescript
const createLocalStorageMock = (): Storage => {
  const store = new Map<string, string>()

  return {
    getItem: (key: string): string | null => store.get(key) ?? null,
    setItem: (key: string, value: string): void => {
      store.set(key, value)
    },
    removeItem: (key: string): void => {
      store.delete(key)
    },
    clear: (): void => {
      store.clear()
    },
    key: (index: number): string | null => Array.from(store.keys())[index] ?? null,
    get length(): number {
      return store.size
    }
  } as Storage
}

const ensureLocalStorage = (): Storage => {
  if (typeof globalThis.localStorage === 'undefined') {
    Object.defineProperty(globalThis, 'localStorage', {
      value: createLocalStorageMock(),
      configurable: true
    })
  }

  return globalThis.localStorage
}
```

- Call `ensureLocalStorage().clear()` in both `beforeEach` and `afterEach`.
- Call `vi.restoreAllMocks()` in `afterEach`.

## Dependency Mocks

### `ChangeDetectorRef`

Mock all five public methods with `vi.fn()` and cast via `unknown`:

```typescript
const cdr = {
  detectChanges: vi.fn(),
  markForCheck: vi.fn(),
  detach: vi.fn(),
  checkNoChanges: vi.fn(),
  reattach: vi.fn()
} as unknown as ChangeDetectorRef
```

### `NgZone`

Use a synchronous `run` implementation so interval/zone callbacks execute immediately:

```typescript
const ngZone = {
  run: (fn: () => void): void => {
    fn()
  }
} as NgZone
```

### `ActivatedRoute`

Use an RxJS `of()` observable to simulate query parameter emission:

```typescript
type QueryParamGetter = (key: string) => string | null

const route = {
  queryParamMap: of({
    get: getParam   // QueryParamGetter passed from the factory
  })
} as ActivatedRoute
```

### `Router`

Mock only the methods the component under test actually calls:

```typescript
const router = {
  navigate: vi.fn()
} as unknown as Router
```

### Accessing `vi.fn()` through a typed interface

When asserting calls on a mock embedded in a typed interface, cast to `any`:

```typescript
expect((cdr as any).detectChanges).toHaveBeenCalled()
expect((router as any).navigate).toHaveBeenCalledWith([], expect.objectContaining({
  queryParams: {}
}))
```

## Component Factory Pattern

Define two factory functions — `createComponent` and `setup` — outside the `describe` block:

```typescript
const createComponent = (/* optional params */): {
  component: MyComponent
  cdr: ChangeDetectorRef
  router: Router          // include only what callers need to assert on
} => {
  // build mocks here
  const component = new MyComponent(ngZone, cdr, route, router)
  return {component, cdr, router}
}

const setup = (/* optional params */): {
  component: MyComponent
  cdr: ChangeDetectorRef
  router: Router
} => {
  const {component, cdr, router} = createComponent(/* params */)
  component.ngOnInit()
  return {component, cdr, router}
}
```

- `createComponent` builds and returns the raw instance without lifecycle hooks.
- `setup` calls `createComponent` then immediately calls `ngOnInit()`.
- Return every dependency that tests may need to assert on (e.g., `cdr`, `router`).
- **Do not return `ngZone`** — it is an internal implementation detail.

### Accessing protected members

When the component uses `protected` access modifiers, cast the return type in `setup` to `any`
so TypeScript does not reject the access in tests:

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (): {component: any; cdr: ChangeDetectorRef} => {
  const {component, cdr} = createComponent()
  component.ngOnInit()
  // Cast to any to allow access to protected members from outside the class in tests
  return {component: component as any, cdr}
}
```

This is only needed when the component declares properties/methods as `protected`. If all
accessed members are `public`, keep the return type fully typed.

## `setInterval` Mocking

When a component registers a `setInterval` callback, capture the function and invoke it
manually in tests rather than relying on timers:

```typescript
describe('MyComponent', () => {
  let capturedIntervalCallback: (() => void) | undefined

  beforeEach(() => {
    ensureLocalStorage().clear()
    capturedIntervalCallback = undefined
    vi.spyOn(globalThis, 'setInterval').mockImplementation((fn: TimerHandler) => {
      capturedIntervalCallback = fn as () => void
      return 0 as unknown as ReturnType<typeof setInterval>
    })
  })

  // In a test:
  it('should do X when interval fires', () => {
    const {component} = setup()
    capturedIntervalCallback!()
    expect(component.someValue).toBe('expected')
  })
})
```

## Test Structure and Naming

### `describe` / `it`

- One top-level `describe` per file, named after the component class (e.g., `describe('App', ...)`).
- All test names start with `'should'` and describe observable behaviour, not method names:
  - ✅ `'should swap logo from spring to angular when interval fires'`
  - ❌ `'ngLogoImgValue changes on setInterval'`

### Section dividers

Group related tests under a section comment:

```typescript
// =========== Section Name =========== //
```

Standard sections (use all that apply, in this order):

1. `Component Creation`
2. `Default Property Values` / `Default Signal Values`
3. Feature-specific groups (e.g., `Query Parameters — Toggle State`, `Tile Settings Button Icons`)
4. `Side Effects` (calls to `cdr.detectChanges`, `router.navigate`, etc.)
5. `localStorage Persistence on Init`
6. Any domain-specific behaviour (e.g., `Logo Swap (setInterval Callback)`)

## Assertion Patterns

| Scenario | Assertion |
| -------- | --------- |
| Exact equality | `expect(x).toBe(value)` |
| Floating point | `expect(x).toBeCloseTo(n)` |
| Truthy / defined | `expect(x).toBeTruthy()` / `expect(x).toBeDefined()` |
| Substring / array contains | `expect(x).toContain(value)` |
| Regex match | `expect(x).toMatch(/pattern/)` |
| Type check | `expect(typeof x).toBe('string')` |
| Mock was called | `expect((mock as any).fn).toHaveBeenCalled()` |
| Mock was not called | `expect((mock as any).fn).not.toHaveBeenCalled()` |
| Mock called with args | `expect((mock as any).fn).toHaveBeenCalledWith(arg1, expect.objectContaining({...}))` |
| Signal value | `component.signalName()` — call with `()` before asserting |

## Simulating Events

### Slider input

```typescript
const event = {target: {valueAsNumber: 0.5}}
component.updateSomeSlider(event)
```

### Checkbox / toggle

Pass the boolean directly to the handler method — do not construct a DOM event:

```typescript
component.updateMatchTileColors(true)
component.updateMatchTileColors(false)
```

## localStorage Assertions

Read from `localStorage` (the globally available mock) to verify persistence:

```typescript
expect(localStorage.getItem('tile1Darkmode')).toBe('true')
```

Set values in `localStorage` **before** calling `setup()` to test initialisation from stored state:

```typescript
localStorage.setItem('tile1BackgroundColor', '#FF0000')
const {component} = setup()
expect(component.tile1BackgroundColor()).toBe('#FF0000')
```

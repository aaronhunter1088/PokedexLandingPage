import '@angular/compiler'
import {ActivatedRoute, Router} from '@angular/router'
import {ChangeDetectorRef, NgZone} from '@angular/core'
import {of} from 'rxjs'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {Tiles} from './tiles'

type QueryParamGetter = (key: string) => string | null

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

const createComponent = (getParam: QueryParamGetter = () => null): {
  component: Tiles
  cdr: ChangeDetectorRef
  router: Router
} => {
  const ngZone = {
    run: (fn: () => void): void => {
      fn()
    }
  } as NgZone
  const cdr = {
    detectChanges: vi.fn(),
    markForCheck: vi.fn(),
    detach: vi.fn(),
    checkNoChanges: vi.fn(),
    reattach: vi.fn()
  } as ChangeDetectorRef
  const route = {
    queryParamMap: of({
      get: getParam
    })
  } as ActivatedRoute
  const router = {
    navigate: vi.fn()
  } as unknown as Router

  const component = new Tiles(ngZone, cdr, route, router)

  return {component, cdr, router}
}

const setup = (getParam: QueryParamGetter = () => null): {
  component: Tiles
  cdr: ChangeDetectorRef
  router: Router
} => {
  const {component, cdr, router} = createComponent(getParam)
  component.ngOnInit()
  return {component, cdr, router}
}

// =========== Tests =========== //

describe('Tiles', () => {
  // Capture the setInterval callback so logo-swap logic can be tested directly
  let capturedIntervalCallback: (() => void) | undefined

  beforeEach(() => {
    ensureLocalStorage().clear()
    capturedIntervalCallback = undefined
    vi.spyOn(globalThis, 'setInterval').mockImplementation((fn: TimerHandler) => {
      capturedIntervalCallback = fn as () => void
      return 0 as unknown as ReturnType<typeof setInterval>
    })
  })

  afterEach(() => {
    ensureLocalStorage().clear()
    vi.restoreAllMocks()
  })

  // =========== Component Creation =========== //

  it('should create', () => {
    const {component} = setup()
    expect(component).toBeTruthy()
  })

  // =========== Default Property Values =========== //

  it('should default all toggles to false', () => {
    const {component} = setup()
    expect(component.toggle1Checked).toBe(false)
    expect(component.toggle2Checked).toBe(false)
    expect(component.toggle3Checked).toBe(false)
  })

  it('should default ngLogoImgValue to spring-logo-white.png', () => {
    const {component} = setup()
    expect(component.ngLogoImgValue).toBe('spring-logo-white.png')
  })

  it('should have springBootVersion set', () => {
    const {component} = setup()
    expect(component.springBootVersion).toBeTruthy()
    expect(typeof component.springBootVersion).toBe('string')
  })

  // =========== Query Parameters — Toggle State =========== //

  it('should not set toggle when no parameters are provided', () => {
    const {component} = setup()
    expect(component.toggle1Checked).toBe(false)
    expect(component.toggle2Checked).toBe(false)
    expect(component.toggle3Checked).toBe(false)
  })

  it('should set toggle1 to true when tileNumber=1 and darkmode=true', () => {
    const {component} = setup((key: string) => {
      if (key === 'tileNumber') return '1'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect(component.toggle1Checked).toBe(true)
    expect(component.toggle2Checked).toBe(false)
    expect(component.toggle3Checked).toBe(false)
  })

  it('should set toggle1 to false when tileNumber=1 and darkmode=false', () => {
    const {component} = setup((key: string) => {
      if (key === 'tileNumber') return '1'
      if (key === 'darkmode') return 'false'
      return null
    })

    expect(component.toggle1Checked).toBe(false)
  })

  it('should set toggle2 when tileNumber=2', () => {
    const {component} = setup((key: string) => {
      if (key === 'tileNumber') return '2'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect(component.toggle1Checked).toBe(false)
    expect(component.toggle2Checked).toBe(true)
    expect(component.toggle3Checked).toBe(false)
  })

  it('should set toggle3 when tileNumber=3', () => {
    const {component} = setup((key: string) => {
      if (key === 'tileNumber') return '3'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect(component.toggle1Checked).toBe(false)
    expect(component.toggle2Checked).toBe(false)
    expect(component.toggle3Checked).toBe(true)
  })

  it('should not set toggle when only tileNumber is provided', () => {
    const {component} = setup((key: string) => {
      if (key === 'tileNumber') return '1'
      return null
    })

    expect(component.toggle1Checked).toBe(false)
    expect(component.toggle2Checked).toBe(false)
    expect(component.toggle3Checked).toBe(false)
  })

  it('should not set toggle when only darkmode is provided', () => {
    const {component} = setup((key: string) => {
      if (key === 'darkmode') return 'true'
      return null
    })

    expect(component.toggle1Checked).toBe(false)
    expect(component.toggle2Checked).toBe(false)
    expect(component.toggle3Checked).toBe(false)
  })

  it('should not set toggle when tileNumber is invalid', () => {
    const {component} = setup((key: string) => {
      if (key === 'tileNumber') return '4'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect(component.toggle1Checked).toBe(false)
    expect(component.toggle2Checked).toBe(false)
    expect(component.toggle3Checked).toBe(false)
  })

  // =========== Query Parameters — Side Effects =========== //

  it('should call cdr.detectChanges when valid params are provided', () => {
    const {cdr} = setup((key: string) => {
      if (key === 'tileNumber') return '1'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect((cdr as any).detectChanges).toHaveBeenCalled()
  })

  it('should call router.navigate to clear query params when valid params are provided', () => {
    const {router} = setup((key: string) => {
      if (key === 'tileNumber') return '1'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect((router as any).navigate).toHaveBeenCalledWith([], expect.objectContaining({
      queryParams: {}
    }))
  })

  it('should not call router.navigate when tileNumber is invalid', () => {
    const {router} = setup((key: string) => {
      if (key === 'tileNumber') return '4'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect((router as any).navigate).not.toHaveBeenCalled()
  })

  it('should not call router.navigate when params are missing', () => {
    const {router} = setup()
    expect((router as any).navigate).not.toHaveBeenCalled()
  })

  // =========== updateMode Methods =========== //

  it('should set toggle1 and save to localStorage when updateMode1 is called with true', () => {
    const {component} = setup()
    component.updateMode1(true)
    expect(component.toggle1Checked).toBe(true)
    expect(localStorage.getItem('tile1Darkmode')).toBe('true')
  })

  it('should set toggle1 and save to localStorage when updateMode1 is called with false', () => {
    const {component} = setup()
    component.updateMode1(false)
    expect(component.toggle1Checked).toBe(false)
    expect(localStorage.getItem('tile1Darkmode')).toBe('false')
  })

  it('should set toggle2 and save to localStorage when updateMode2 is called with true', () => {
    const {component} = setup()
    component.updateMode2(true)
    expect(component.toggle2Checked).toBe(true)
    expect(localStorage.getItem('tile2Darkmode')).toBe('true')
  })

  it('should set toggle2 and save to localStorage when updateMode2 is called with false', () => {
    const {component} = setup()
    component.updateMode2(false)
    expect(component.toggle2Checked).toBe(false)
    expect(localStorage.getItem('tile2Darkmode')).toBe('false')
  })

  it('should set toggle3 and save to localStorage when updateMode3 is called with true', () => {
    const {component} = setup()
    component.updateMode3(true)
    expect(component.toggle3Checked).toBe(true)
    expect(localStorage.getItem('tile3Darkmode')).toBe('true')
  })

  it('should set toggle3 and save to localStorage when updateMode3 is called with false', () => {
    const {component} = setup()
    component.updateMode3(false)
    expect(component.toggle3Checked).toBe(false)
    expect(localStorage.getItem('tile3Darkmode')).toBe('false')
  })

  // =========== localStorage Persistence on Init =========== //

  it('should load darkmode settings from localStorage on init', () => {
    localStorage.setItem('tile1Darkmode', 'true')
    localStorage.setItem('tile2Darkmode', 'true')
    localStorage.setItem('tile3Darkmode', 'false')

    const {component} = setup()

    expect(component.toggle1Checked).toBe(true)
    expect(component.toggle2Checked).toBe(true)
    expect(component.toggle3Checked).toBe(false)
  })

  it('should save query parameter values to localStorage', () => {
    setup((key: string) => {
      if (key === 'tileNumber') return '2'
      if (key === 'darkmode') return 'true'
      return null
    })

    expect(localStorage.getItem('tile2Darkmode')).toBe('true')
  })

  it('should not overwrite localStorage for tiles not referenced by query params', () => {
    localStorage.setItem('tile1Darkmode', 'true')

    setup((key: string) => {
      if (key === 'tileNumber') return '2'
      if (key === 'darkmode') return 'false'
      return null
    })

    // tile1 localStorage should be untouched
    expect(localStorage.getItem('tile1Darkmode')).toBe('true')
    expect(localStorage.getItem('tile2Darkmode')).toBe('false')
  })

  // =========== Logo Swap (setInterval Callback) =========== //

  it('should register a setInterval callback on init', () => {
    setup()
    expect(capturedIntervalCallback).toBeDefined()
  })

  it('should swap ngLogoImgValue from spring to angular when interval fires and toggle3 is false', () => {
    const {component} = setup()
    expect(component.ngLogoImgValue).toBe('spring-logo-white.png')
    capturedIntervalCallback!()
    expect(component.ngLogoImgValue).toBe('angular-logo-white.png')
  })

  it('should swap ngLogoImgValue from angular back to spring on the second interval fire', () => {
    const {component} = setup()
    capturedIntervalCallback!()
    capturedIntervalCallback!()
    expect(component.ngLogoImgValue).toBe('spring-logo-white.png')
  })

  it('should use black logo when toggle3 is true and interval fires', () => {
    const {component} = setup()
    component.toggle3Checked = true
    capturedIntervalCallback!()
    expect(component.ngLogoImgValue).toBe('angular-logo-black.png')
  })

  it('should use white logo when toggle3 is false and interval fires', () => {
    const {component} = setup()
    component.toggle3Checked = false
    capturedIntervalCallback!()
    expect(component.ngLogoImgValue).toBe('angular-logo-white.png')
  })
})

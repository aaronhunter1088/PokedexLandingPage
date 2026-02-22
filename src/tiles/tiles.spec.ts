import '@angular/compiler'
import {ActivatedRoute} from '@angular/router'
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

  const component = new Tiles(ngZone, cdr, route)

  return {component, cdr}
}

const setup = (getParam: QueryParamGetter = () => null): {
  component: Tiles
  cdr: ChangeDetectorRef
} => {
  const {component, cdr} = createComponent(getParam)
  component.ngOnInit()
  return {component, cdr}
}

describe('Tiles', () => {
  beforeEach(() => {
    ensureLocalStorage().clear()
    vi.spyOn(globalThis, 'setInterval').mockImplementation(() => 0 as unknown as number)
  })

  afterEach(() => {
    ensureLocalStorage().clear()
    vi.restoreAllMocks()
  })

  it('should create', () => {
    const {component} = setup()
    expect(component).toBeTruthy()
  })

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

  it('should save to localStorage when updateMode1 is called', () => {
    const {component} = setup()
    component.updateMode1(true)
    expect(localStorage.getItem('tile1Darkmode')).toBe('true')
    expect(component.toggle1Checked).toBe(true)
  })

  it('should save to localStorage when updateMode2 is called', () => {
    const {component} = setup()
    component.updateMode2(true)
    expect(localStorage.getItem('tile2Darkmode')).toBe('true')
    expect(component.toggle2Checked).toBe(true)
  })

  it('should save to localStorage when updateMode3 is called', () => {
    const {component} = setup()
    component.updateMode3(true)
    expect(localStorage.getItem('tile3Darkmode')).toBe('true')
    expect(component.toggle3Checked).toBe(true)
  })

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
})

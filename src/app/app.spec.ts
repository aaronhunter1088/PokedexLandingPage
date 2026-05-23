import '@angular/compiler'
import {ChangeDetectorRef} from '@angular/core'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {App} from './app'

// =========== localStorage Mock =========== //

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

// =========== Component Factory =========== //

const createComponent = (): {component: App; cdr: ChangeDetectorRef} => {
  const cdr = {
    detectChanges: vi.fn(),
    markForCheck: vi.fn(),
    detach: vi.fn(),
    checkNoChanges: vi.fn(),
    reattach: vi.fn()
  } as unknown as ChangeDetectorRef

  const component = new App(cdr)

  return {component, cdr}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (): {component: any; cdr: ChangeDetectorRef} => {
  const {component, cdr} = createComponent()
  component.ngOnInit()
  // Cast to any to allow access to protected members from outside the class in tests
  return {component: component as any, cdr}
}

// =========== Tests =========== //

describe('App', () => {
  beforeEach(() => {
    ensureLocalStorage().clear()
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

  // =========== Default Signal Values =========== //

  it('should have default title', () => {
    const {component} = setup()
    expect(component.title()).toBe('My Pokédex')
  })

  it('should have default region name Kanto', () => {
    const {component} = setup()
    expect(component.regionName()).toBe('Kanto')
  })

  it('should have default background image', () => {
    const {component} = setup()
    expect(component.backgroundImage()).toBe('1kantoMap.png')
  })

  it('should have a formatted copyright text after init', () => {
    const {component} = setup()
    expect(component.copyrightText()).toContain('©')
  })

  it('should have backgroundImageAndNameSaved as false by default', () => {
    const {component} = setup()
    expect(component.backgroundImageAndNameSaved()).toBe(false)
  })

  it('should have matchTileBackgroundAndOutlineColor as false by default', () => {
    const {component} = setup()
    expect(component.matchTileBackgroundAndOutlineColor()).toBe(false)
  })

  it('should have matchTileBackgroundAndOutlineShade as false by default', () => {
    const {component} = setup()
    expect(component.matchTileBackgroundAndOutlineShade()).toBe(false)
  })

  it('should have matchRegionNameBackgroundAndOutlineColor as false by default', () => {
    const {component} = setup()
    expect(component.matchRegionNameBackgroundAndOutlineColor()).toBe(false)
  })

  // =========== Tile Settings Button Icons =========== //

  it('should default all tile settings button icons to apps', () => {
    const {component} = setup()
    expect(component.tile1SettingsButtonIcon()).toBe('apps')
    expect(component.tile2SettingsButtonIcon()).toBe('apps')
    expect(component.tile3SettingsButtonIcon()).toBe('apps')
  })

  it('should toggle tile1 settings button icon to check_box and back on repeated calls', () => {
    const {component} = setup()
    component.updateSettingsTile1ButtonIcon()
    expect(component.tile1SettingsButtonIcon()).toBe('check_box')
    component.updateSettingsTile1ButtonIcon()
    expect(component.tile1SettingsButtonIcon()).toBe('apps')
  })

  it('should toggle tile2 settings button icon to check_box and back on repeated calls', () => {
    const {component} = setup()
    component.updateSettingsTile2ButtonIcon()
    expect(component.tile2SettingsButtonIcon()).toBe('check_box')
    component.updateSettingsTile2ButtonIcon()
    expect(component.tile2SettingsButtonIcon()).toBe('apps')
  })

  it('should toggle tile3 settings button icon to check_box and back on repeated calls', () => {
    const {component} = setup()
    component.updateSettingsTile3ButtonIcon()
    expect(component.tile3SettingsButtonIcon()).toBe('check_box')
    component.updateSettingsTile3ButtonIcon()
    expect(component.tile3SettingsButtonIcon()).toBe('apps')
  })

  it('should save tile1 settings button icon to localStorage', () => {
    const {component} = setup()
    component.updateSettingsTile1ButtonIcon()
    expect(localStorage.getItem('tile1SettingsButtonIcon')).toBe('check_box')
  })

  it('should save tile2 settings button icon to localStorage', () => {
    const {component} = setup()
    component.updateSettingsTile2ButtonIcon()
    expect(localStorage.getItem('tile2SettingsButtonIcon')).toBe('check_box')
  })

  it('should save tile3 settings button icon to localStorage', () => {
    const {component} = setup()
    component.updateSettingsTile3ButtonIcon()
    expect(localStorage.getItem('tile3SettingsButtonIcon')).toBe('check_box')
  })

  // =========== Background =========== //

  it('should return a CSS url() string from getBackgroundImageUrl', () => {
    const {component} = setup()
    const url = component.getBackgroundImageUrl()
    expect(url).toMatch(/^url\('/)
    expect(url).toContain('.png')
  })

  it('should update region name to a valid region when toggleBackground is called', () => {
    const {component} = setup()
    const validRegions = [
      'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Ancient Sinnoh',
      'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'
    ]
    component.toggleBackground()
    expect(validRegions).toContain(component.regionName())
  })

  it('should update backgroundImage to a .png file when toggleBackground is called', () => {
    const {component} = setup()
    component.toggleBackground()
    expect(component.backgroundImage()).toMatch(/\.png$/)
  })

  it('should save background image and region name when toggleBackgroundImage is called', () => {
    const {component} = setup()
    component.toggleBackgroundImage('1kantoMap.png', 'Kanto')
    expect(component.backgroundImageAndNameSaved()).toBe(true)
    expect(component.backgroundImageAndNameRemoved()).toBe(false)
    expect(localStorage.getItem('1kantoMap.png')).not.toBeUndefined()
  })

  it('should unsave background when toggleBackgroundImage is called a second time', () => {
    const {component} = setup()
    component.toggleBackgroundImage('1kantoMap.png', 'Kanto')
    component.toggleBackgroundImage('1kantoMap.png', 'Kanto')
    expect(component.backgroundImageAndNameSaved()).toBe(false)
    expect(component.backgroundImageAndNameRemoved()).toBe(true)
  })

  // =========== Match Tile Settings =========== //

  it('should update matchTileBackgroundAndOutlineColor when updateMatchTileColors is called', () => {
    const {component} = setup()
    component.updateMatchTileColors(true)
    expect(component.matchTileBackgroundAndOutlineColor()).toBe(true)
    component.updateMatchTileColors(false)
    expect(component.matchTileBackgroundAndOutlineColor()).toBe(false)
  })

  it('should save matchTileColors to localStorage when updateMatchTileColors is called', () => {
    const {component} = setup()
    component.updateMatchTileColors(true)
    expect(localStorage.getItem('matchTileColors')).toBe('true')
  })

  it('should update matchTileBackgroundAndOutlineShade when updateMatchTileShade is called', () => {
    const {component} = setup()
    component.updateMatchTileShade(true)
    expect(component.matchTileBackgroundAndOutlineShade()).toBe(true)
    component.updateMatchTileShade(false)
    expect(component.matchTileBackgroundAndOutlineShade()).toBe(false)
  })

  // =========== show* Methods — No Tiles Selected =========== //

  it('should return 0 from showThisTransparency when no tiles are selected', () => {
    const {component} = setup()
    expect(component.showThisTransparency()).toBe(0)
  })

  it('should return 0 from showThisOutline when no tiles are selected', () => {
    const {component} = setup()
    expect(component.showThisOutline()).toBe(0)
  })

  it('should return 0 from showThisBlur when no tiles are selected', () => {
    const {component} = setup()
    expect(component.showThisBlur()).toBe(0)
  })

  it('should return default font from showThisFont when no tiles are selected', () => {
    const {component} = setup()
    expect(component.showThisFont()).toBe('Roboto, sans-serif')
  })

  it('should return black from showThisFontColor when no tiles are selected', () => {
    const {component} = setup()
    expect(component.showThisFontColor()).toBe('#000000')
  })

  // =========== show* Methods — Single Tile Selected =========== //

  it('should return tile1 transparency from showThisTransparency when only tile1 is selected', () => {
    const {component} = setup()
    component.updateSettingsTile1ButtonIcon() // select tile 1
    const event = {target: {valueAsNumber: 0.6}}
    component.updateTileTransparency(event)
    expect(component.showThisTransparency()).toBeCloseTo(0.6)
  })

  it('should return tile2 transparency from showThisTransparency when only tile2 is selected', () => {
    const {component} = setup()
    component.updateSettingsTile2ButtonIcon()
    const event = {target: {valueAsNumber: 0.4}}
    component.updateTileTransparency(event)
    expect(component.showThisTransparency()).toBeCloseTo(0.4)
  })

  it('should return tile1 blur from showThisBlur when only tile1 is selected', () => {
    const {component} = setup()
    component.updateSettingsTile1ButtonIcon()
    component.updateTileBlur({target: {valueAsNumber: 8}})
    expect(component.showThisBlur()).toBe(8)
  })

  it('should return tile1 font from showThisFont when only tile1 is selected', () => {
    const {component} = setup()
    component.updateSettingsTile1ButtonIcon()
    component.updateTileTextFont("'Tangerine', cursive")
    expect(component.showThisFont()).toBe("'Tangerine', cursive")
  })

  it('should return tile1 text color from showThisFontColor when only tile1 is selected', () => {
    const {component} = setup()
    component.updateSettingsTile1ButtonIcon()
    expect(component.showThisFontColor()).toBe('#000000')
  })

  // =========== Region Name Settings =========== //

  it('should update matchRegionNameBackgroundAndOutlineColor when updateMatchRegionNameColors is called', () => {
    const {component} = setup()
    component.updateMatchRegionNameColors(true)
    expect(component.matchRegionNameBackgroundAndOutlineColor()).toBe(true)
    component.updateMatchRegionNameColors(false)
    expect(component.matchRegionNameBackgroundAndOutlineColor()).toBe(false)
  })

  it('should update regionNameTransparency when updateRegionNameTransparency is called', () => {
    const {component} = setup()
    component.updateRegionNameTransparency({target: {valueAsNumber: 0.75}})
    expect(component.regionNameTransparency()).toBeCloseTo(0.75)
  })

  it('should save regionNameTransparency to localStorage', () => {
    const {component} = setup()
    component.updateRegionNameTransparency({target: {valueAsNumber: 0.5}})
    expect(localStorage.getItem('regionNameTransparency')).toBe('0.5')
  })

  it('should update regionNameBlur when updateRegionNameBlur is called', () => {
    const {component} = setup()
    component.updateRegionNameBlur({target: {valueAsNumber: 10}})
    expect(component.regionNameBlur()).toBe(10)
  })

  it('should save regionNameBlur to localStorage', () => {
    const {component} = setup()
    component.updateRegionNameBlur({target: {valueAsNumber: 10}})
    expect(localStorage.getItem('regionNameBlur')).toBe('10')
  })

  it('should update regionNameOutline when updateRegionNameOutline is called', () => {
    const {component} = setup()
    component.updateRegionNameOutline({target: {valueAsNumber: 0.5}})
    expect(component.regionNameOutline()).toBeCloseTo(0.5)
  })

  it('should save regionNameOutline to localStorage', () => {
    const {component} = setup()
    component.updateRegionNameOutline({target: {valueAsNumber: 0.5}})
    expect(localStorage.getItem('regionNameOutline')).toBe('0.5')
  })

  it('should update regionNameTextFontFamily when updateRegionNameTextFont is called', () => {
    const {component} = setup()
    component.updateRegionNameTextFont("'Tangerine', cursive")
    expect(component.regionNameTextFontFamily()).toBe("'Tangerine', cursive")
  })

  it('should return regionNameTransparency from showThisRegionNameTransparency by default', () => {
    const {component} = setup()
    component.updateRegionNameTransparency({target: {valueAsNumber: 0.3}})
    expect(component.showThisRegionNameTransparency()).toBeCloseTo(0.3)
  })

  it('should return regionNameOutline from showThisRegionNameOutline by default', () => {
    const {component} = setup()
    component.updateRegionNameOutline({target: {valueAsNumber: 0.8}})
    expect(component.showThisRegionNameOutline()).toBeCloseTo(0.8)
  })

  // =========== Tile Text Font =========== //

  it('should update tile1TextFontFamily when tile1 is selected and updateTileTextFont is called', () => {
    const {component} = setup()
    component.updateSettingsTile1ButtonIcon()
    component.updateTileTextFont("'Comic Sans MS', cursive, sans-serif")
    expect(component.tile1TextFontFamily()).toBe("'Comic Sans MS', cursive, sans-serif")
  })

  it('should not update any tile font when no tiles are selected', () => {
    const {component} = setup()
    component.updateTileTextFont("'Tangerine', cursive")
    // All tile font families remain at default
    expect(component.tile1TextFontFamily()).toBe('Roboto, sans-serif')
    expect(component.tile2TextFontFamily()).toBe('Roboto, sans-serif')
    expect(component.tile3TextFontFamily()).toBe('Roboto, sans-serif')
  })

  // =========== localStorage Persistence on Init =========== //

  it('should restore tile1 background color from localStorage on init', () => {
    localStorage.setItem('tile1BackgroundColor', '#FF0000')
    const {component} = setup()
    expect(component.tile1BackgroundColor()).toBe('#FF0000')
  })

  it('should restore matchTileColors from localStorage on init', () => {
    localStorage.setItem('matchTileColors', 'true')
    const {component} = setup()
    expect(component.matchTileBackgroundAndOutlineColor()).toBe(true)
  })

  it('should restore tile1 settings button icon from localStorage on init', () => {
    localStorage.setItem('tile1SettingsButtonIcon', 'check_box')
    const {component} = setup()
    expect(component.tile1SettingsButtonIcon()).toBe('check_box')
  })

  it('should restore regionNameTextFontFamily from localStorage on init', () => {
    localStorage.setItem('regionNameTextFontFamily', "'Tangerine', cursive")
    const {component} = setup()
    expect(component.regionNameTextFontFamily()).toBe("'Tangerine', cursive")
  })
})

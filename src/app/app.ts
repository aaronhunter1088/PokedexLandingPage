import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, ViewChild} from '@angular/core'
import {ColorEvent} from 'ngx-color'
import {ColorCompactModule} from "ngx-color/compact"
import {MaterialModule} from "./materialModule"
import {MatSidenav} from "@angular/material/sidenav"
import {Tiles} from "../tiles/tiles"
import {MatExpansionPanel} from "@angular/material/expansion"

@Component({
    selector: 'app-root',
    imports: [MaterialModule, Tiles, ColorCompactModule,],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    // obtain reference to the element #sidenav
    @ViewChild('sidenav') sidenav!: MatSidenav
    // obtain reference to the element #tileAccordian
    @ViewChild('tileAccordian') tileAccordian!: MatExpansionPanel
    // obtain reference to the element #regionNameAccordian
    @ViewChild('regionNameAccordian') regionNameAccordian!: MatExpansionPanel
    // obtain reference to the element #aboutAccordian
    @ViewChild('aboutAccordian') aboutAccordian!: MatExpansionPanel
    // Signals
    protected readonly title = signal('My Pokédex') // &#233 é
    protected readonly copyrightText = signal('2026')
    // Icons in use
    protected readonly icon_info = 'info'
    protected readonly icon_replay = 'replay'
    protected readonly icon_shuffle = 'shuffle'
    protected readonly icon_apps = 'apps'
    protected readonly icon_check_box = 'check_box'
    protected readonly Math = Math
    // Colors
    protected readonly COLOR_WHITE = '#FFFFFF'
    protected readonly COLOR_BLACK = '#000000'
    // Local Storage Keys
    protected readonly DEFAULT_TEXT_FONT_FAMILY = 'Roboto, sans-serif'
    protected readonly LAST_TILE_SETTINGS_BUTTON_CLICKED = "tileSettingsButtonLastClicked"
    protected readonly TILE_1 = "tile1"
    protected readonly TILE_2 = "tile2"
    protected readonly TILE_3 = "tile3"
    protected readonly TILE_1_SETTINGS_BUTTON_ICON = "tile1SettingsButtonIcon"
    protected readonly TILE_2_SETTINGS_BUTTON_ICON = "tile2SettingsButtonIcon"
    protected readonly TILE_3_SETTINGS_BUTTON_ICON = "tile3SettingsButtonIcon"
    protected readonly TILE_1_TRANSPARENCY = "tile1Transparency"
    protected readonly TILE_2_TRANSPARENCY = "tile2Transparency"
    protected readonly TILE_3_TRANSPARENCY = "tile3Transparency"
    protected readonly TILE_1_OUTLINE = "tile1Outline"
    protected readonly TILE_2_OUTLINE = "tile2Outline"
    protected readonly TILE_3_OUTLINE = "tile3Outline"
    protected readonly TILE_1_BACKGROUND_COLOR = "tile1BackgroundColor"
    protected readonly TILE_2_BACKGROUND_COLOR = "tile2BackgroundColor"
    protected readonly TILE_3_BACKGROUND_COLOR = "tile3BackgroundColor"
    protected readonly TILE_1_OUTLINE_COLOR = "tile1OutlineColor"
    protected readonly TILE_2_OUTLINE_COLOR = "tile2OutlineColor"
    protected readonly TILE_3_OUTLINE_COLOR = "tile3OutlineColor"
    protected readonly TILE_1_BLUR = "tile1Blur"
    protected readonly TILE_2_BLUR = "tile2Blur"
    protected readonly TILE_3_BLUR = "tile3Blur"
    protected readonly MATCH_TILE_COLORS = "matchTileColors"
    protected readonly MATCH_TILE_TRANSPARENCY = "matchTileTransparency"
    protected readonly MATCHED_TILE_COLOR = "matchedTileColor"
    protected readonly MATCHED_TILE_TRANSPARENCY = "matchedTileTransparency"
    protected readonly TILE_1_TEXT_FONT_FAMILY = "tile1TextFontFamily"
    protected readonly TILE_2_TEXT_FONT_FAMILY = "tile2TextFontFamily"
    protected readonly TILE_3_TEXT_FONT_FAMILY = "tile3TextFontFamily"
    protected readonly TILE_1_TEXT_COLOR = "tile1TextColor"
    protected readonly TILE_2_TEXT_COLOR = "tile2TextColor"
    protected readonly TILE_3_TEXT_COLOR = "tile3TextColor"
    protected readonly MATCH_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR = "matchRegionNameBackgroundColor"
    protected readonly MATCHED_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR = "matchedRegionNameColor"
    protected readonly REGION_NAME_BACKGROUND_COLOR = "regionNameBackgroundColor"
    protected readonly REGION_NAME_OUTLINE_COLOR = "regionNameOutlineColor"
    protected readonly REGION_NAME_TRANSPARENCY = "regionNameTransparency"
    protected readonly REGION_NAME_BLUR = "regionNameBlur"
    protected readonly REGION_NAME_OUTLINE = "regionNameOutline"
    protected readonly REGION_NAME_TEXT_FONT_FAMILY = "regionNameTextFontFamily"
    protected readonly REGION_NAME_TEXT_COLOR = "regionNameTextColor"
    // Default Properties
    protected settingsIcon = signal(this.icon_info)
    // tile specific settings
    protected tile1SettingsButtonIcon = signal(this.icon_apps)
    protected tile2SettingsButtonIcon = signal(this.icon_apps)
    protected tile3SettingsButtonIcon = signal(this.icon_apps)
    protected matchTileBackgroundAndOutlineShade = signal(false)
    protected matchTileBackgroundAndOutlineColor = signal(false)
    protected matchedTileBackgroundAndOutlineColor = signal(this.COLOR_WHITE)
    protected matchedTileTransparencyAndOutline = signal(0)
    protected tile1BackgroundColor = signal(this.COLOR_WHITE)
    protected tile2BackgroundColor = signal(this.COLOR_WHITE)
    protected tile3BackgroundColor = signal(this.COLOR_WHITE)
    protected tile1OutlineColor = signal(this.COLOR_WHITE)
    protected tile2OutlineColor = signal(this.COLOR_WHITE)
    protected tile3OutlineColor = signal(this.COLOR_WHITE)
    protected tile1Transparency = signal(0)
    protected tile2Transparency = signal(0)
    protected tile3Transparency = signal(0)
    protected tile1Outline = signal(0)
    protected tile2Outline = signal(0)
    protected tile3Outline = signal(0)
    protected tile1Blur = signal(0)
    protected tile2Blur = signal(0)
    protected tile3Blur = signal(0)
    protected tile1TextFontFamily = signal(this.DEFAULT_TEXT_FONT_FAMILY)
    protected tile2TextFontFamily = signal(this.DEFAULT_TEXT_FONT_FAMILY)
    protected tile3TextFontFamily = signal(this.DEFAULT_TEXT_FONT_FAMILY)
    protected tile1TextColor = signal(this.COLOR_BLACK)
    protected tile2TextColor = signal(this.COLOR_BLACK)
    protected tile3TextColor = signal(this.COLOR_BLACK)
    // region name specific settings
    protected matchRegionNameBackgroundAndOutlineColor = signal(false)
    protected matchRegionNameTransparencyAndOutlineShade = signal(false)
    protected matchedRegionNameBackgroundAndOutlineColor = signal(this.COLOR_BLACK)
    protected matchedRegionNameTransparencyAndOutlineShade = signal(0)
    protected regionNameBackgroundColor = signal(this.COLOR_WHITE)
    protected regionNameOutlineColor = signal(this.COLOR_WHITE)
    protected regionNameTransparency = signal(0)
    protected regionNameBlur = signal(0)
    protected regionNameOutline = signal(1)
    protected regionNameTextFontFamily = signal(this.DEFAULT_TEXT_FONT_FAMILY)
    protected regionNameTextColor = signal(this.COLOR_BLACK)
    protected panelTileSettingsOpenState = signal(false)
    protected panelRegionNameSettingsOpenState = signal(false)
    private readonly regionsNameMap: { [key: string]: string } = {
        'Kanto': '1kantoMap.png',
        'Johto': '2johtoMap.png',
        'Hoenn': '3hoennMap.png',
        'Sinnoh': '41sinnohMap.png',
        'Ancient Sinnoh': '42hisuiSinnohMap.png',
        'Unova': '5unovaMap.png',
        'Kalos': '6kalosMap.png',
        'Alola': '7alolaMap.png',
        'Galar': '8galarMap.png',
        'Paldea': '9paldeaMap.png'
    }
    protected regionName = signal(Object.keys(this.regionsNameMap)[0])
    protected randomImageIndex = signal(0)
    protected backgroundImage = signal(Object.values(this.regionsNameMap)[0])

    // Component  constructor
    constructor(private cdr: ChangeDetectorRef) {
    }

    // Runs once when the component is initialized
    ngOnInit(): void {
        // Initialize settings from local storage. this ensures a consistent experience for users
        this.initializeTileSettingsFromLocalStorage()
        this.initializeRegionNameSettingsFromLocalStorage()
        this.initializeCopyrightText()
        this.cdr.detectChanges()
        // Used while testing sidenav settings
        //this.sidenav.open()
    }

    /*
     * Runs once:
     * After the first ngOnInit
     * After all @ViewChild and @ViewChildren queries are resolved
     * Before any user interaction occurs
     * It does not run again when:
     *
     * The sidenav opens or closes
     * Any properties change
     * User interactions occur
     */
    ngAfterViewInit(): void {
        // Close any accordians when the sidenav is closed if open
        this.sidenav.closedStart.subscribe(() => {
            if (this.tileAccordian?.expanded) this.tileAccordian.close()
            if (this.regionNameAccordian?.expanded) this.regionNameAccordian.close()
            if (this.aboutAccordian?.expanded) this.aboutAccordian.close()
        })
    }

    ngOnChanges() {
    }

    // =========== Initialization Methods =========== //

    // Initialize Tile Settings from Local Storage
    private initializeTileSettingsFromLocalStorage(): void {
        // Load which tiles were selected last
        const tile1SelectedValue = localStorage.getItem(this.TILE_1_SETTINGS_BUTTON_ICON)
        this.tile1SettingsButtonIcon.set(tile1SelectedValue || this.tile1SettingsButtonIcon())
        const tile2SelectedValue = localStorage.getItem(this.TILE_2_SETTINGS_BUTTON_ICON)
        this.tile2SettingsButtonIcon.set(tile2SelectedValue || this.tile2SettingsButtonIcon())
        const tile3SelectedValue = localStorage.getItem(this.TILE_3_SETTINGS_BUTTON_ICON)
        this.tile3SettingsButtonIcon.set(tile3SelectedValue || this.tile3SettingsButtonIcon())

        // Load tile transparencies
        const tile1TransparencyValue = localStorage.getItem(this.TILE_1_TRANSPARENCY)
        this.setTile1BackgroundTransparency(Number(tile1TransparencyValue || this.tile1Transparency()))
        const tile2TransparencyValue = localStorage.getItem(this.TILE_2_TRANSPARENCY)
        this.setTile2BackgroundTransparency(Number(tile2TransparencyValue || this.tile2Transparency()))
        const tile3TransparencyValue = localStorage.getItem(this.TILE_3_TRANSPARENCY)
        this.setTile3BackgroundTransparency(Number(tile3TransparencyValue || this.tile3Transparency()))

        // Load tile background color
        const tile1BackgroundColorValue = localStorage.getItem(this.TILE_1_BACKGROUND_COLOR)
        this.tile1BackgroundColor.set(tile1BackgroundColorValue || this.tile1BackgroundColor())
        const tile2BackgroundColorValue = localStorage.getItem(this.TILE_2_BACKGROUND_COLOR)
        this.tile2BackgroundColor.set(tile2BackgroundColorValue || this.tile2BackgroundColor())
        const tile3BackgroundColorValue = localStorage.getItem(this.TILE_3_BACKGROUND_COLOR)
        this.tile3BackgroundColor.set(tile3BackgroundColorValue || this.tile3BackgroundColor())
        this.setTile1BackgroundColorFromHex(this.tile1BackgroundColor())
        this.setTile2BackgroundColorFromHex(this.tile2BackgroundColor())
        this.setTile3BackgroundColorFromHex(this.tile3BackgroundColor())

        // set variables
        localStorage.setItem(this.TILE_1_BACKGROUND_COLOR, this.tile1BackgroundColor())
        localStorage.setItem(this.TILE_2_BACKGROUND_COLOR, this.tile2BackgroundColor())
        localStorage.setItem(this.TILE_3_BACKGROUND_COLOR, this.tile3BackgroundColor())
        console.log("Initialized tile background colors from local storage.")

        // Load tile outline color
        const tile1OutlineColorValue = localStorage.getItem(this.TILE_1_OUTLINE_COLOR)
        this.tile1OutlineColor.set(tile1OutlineColorValue || this.tile1OutlineColor())
        const tile2OutlineColorValue = localStorage.getItem(this.TILE_2_OUTLINE_COLOR)
        this.tile2OutlineColor.set(tile2OutlineColorValue || this.tile2OutlineColor())
        const tile3OutlineColorValue = localStorage.getItem(this.TILE_3_OUTLINE_COLOR)
        this.tile3OutlineColor.set(tile3OutlineColorValue || this.tile3OutlineColor())

        // Initialize tile outline color CSS variables
        this.setTile1OutlineColorFromHex(this.tile1OutlineColor())
        this.setTile2OutlineColorFromHex(this.tile2OutlineColor())
        this.setTile3OutlineColorFromHex(this.tile3OutlineColor())
        console.log("Initialized tile outline colors from local storage.")

        // Load outline
        const tile1OutlineValue = localStorage.getItem(this.TILE_1_OUTLINE)
        this.setTile1Outline(Number(tile1OutlineValue || this.tile1Outline()))
        const tile2OutlineValue = localStorage.getItem(this.TILE_2_OUTLINE)
        this.setTile2Outline(Number(tile2OutlineValue || this.tile2Outline()))
        const tile3OutlineValue = localStorage.getItem(this.TILE_3_OUTLINE)
        this.setTile3Outline(Number(tile3OutlineValue || this.tile3Outline()))

        // Load blur
        const tile1BlurValue = localStorage.getItem(this.TILE_1_BLUR)
        this.setTile1Blur(Number(tile1BlurValue || this.tile1Blur()))
        const tile2BlurValue = localStorage.getItem(this.TILE_2_BLUR)
        this.setTile2Blur(Number(tile2BlurValue || this.tile2Blur()))
        const tile3BlurValue = localStorage.getItem(this.TILE_3_BLUR)
        this.setTile3Blur(Number(tile3BlurValue || this.tile3Blur()))
        console.log("Initialized tile blur from local storage.")

        // Load matchTileColors
        const matchTileColorsValue = localStorage.getItem(this.MATCH_TILE_COLORS)
        this.matchTileBackgroundAndOutlineColor.set(matchTileColorsValue === 'true')
        if (this.matchTileBackgroundAndOutlineColor()) {
            // Load matched tile color
            const matchedTileColorValue = localStorage.getItem(this.MATCHED_TILE_COLOR)
            this.matchedTileBackgroundAndOutlineColor.set(matchedTileColorValue || this.matchedTileBackgroundAndOutlineColor())
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
            }
        }
        localStorage.setItem(this.MATCHED_TILE_COLOR, this.matchedTileBackgroundAndOutlineColor())
        localStorage.setItem(this.MATCH_TILE_COLORS, this.matchTileBackgroundAndOutlineColor().toString())
        if (this.matchTileBackgroundAndOutlineShade()) {
            // load matched tile transparency
            const matchedTileShadeValue = localStorage.getItem(this.MATCHED_TILE_TRANSPARENCY)
            this.matchedTileTransparencyAndOutline.set(Number(matchedTileShadeValue || this.matchedTileTransparencyAndOutline()))
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1BackgroundTransparency(this.matchedTileTransparencyAndOutline())
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2BackgroundTransparency(this.matchedTileTransparencyAndOutline())
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3BackgroundTransparency(this.matchedTileTransparencyAndOutline())
            }
        }
        localStorage.setItem(this.MATCH_TILE_TRANSPARENCY, this.matchTileBackgroundAndOutlineShade().toString())
        localStorage.setItem(this.MATCHED_TILE_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
        console.log("Initialized matched tile color and transparency from local storage.")

        // Load font family
        const tile1FontValue = localStorage.getItem(this.TILE_1_TEXT_FONT_FAMILY)
        this.setTile1TextFontFamily(tile1FontValue || this.tile1TextFontFamily())
        const tile2FontValue = localStorage.getItem(this.TILE_2_TEXT_FONT_FAMILY)
        this.setTile2TextFontFamily(tile2FontValue || this.tile2TextFontFamily())
        const tile3FontValue = localStorage.getItem(this.TILE_3_TEXT_FONT_FAMILY)
        this.setTile3TextFontFamily(tile3FontValue || this.tile3TextFontFamily())

        // Load tile text color
        const tile1TextColorValue = localStorage.getItem(this.TILE_1_TEXT_COLOR)
        console.debug("tile1TextColorValue:", tile1TextColorValue)
        this.setTile1TextColorFromHex(tile1TextColorValue || this.tile1TextColor())
        const tile2TextColorValue = localStorage.getItem(this.TILE_2_TEXT_COLOR)
        this.setTile2TextColorFromHex(tile2TextColorValue || this.tile2TextColor())
        const tile3TextColorValue = localStorage.getItem(this.TILE_3_TEXT_COLOR)
        this.setTile3TextColorFromHex(tile3TextColorValue || this.tile3TextColor())
        console.log("Initialized tile text colors from local storage.")
    }

    // Initialize Region Name Settings from Local Storage
    private initializeRegionNameSettingsFromLocalStorage(): void {
        // Load matchRegionNameColors
        const matchRegionNameColorsValue = localStorage.getItem(this.MATCH_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR)
        this.matchRegionNameBackgroundAndOutlineColor.set(matchRegionNameColorsValue === 'true')
        localStorage.setItem(this.MATCH_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, this.matchRegionNameBackgroundAndOutlineColor().toString())

        if (this.matchRegionNameBackgroundAndOutlineColor()) {
            // Load matched region name color
            const matchedRegionNameColorValue = localStorage.getItem(this.MATCHED_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR)
            this.matchedRegionNameBackgroundAndOutlineColor.set(matchedRegionNameColorValue || this.matchedRegionNameBackgroundAndOutlineColor())
            localStorage.setItem(this.MATCHED_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, this.matchedRegionNameBackgroundAndOutlineColor())
        }

        // Load region name background color
        const regionNameBackgroundColorValue = localStorage.getItem(this.REGION_NAME_BACKGROUND_COLOR)
        this.regionNameBackgroundColor.set(regionNameBackgroundColorValue || this.regionNameBackgroundColor())
        localStorage.setItem(this.REGION_NAME_BACKGROUND_COLOR, this.regionNameBackgroundColor())

        // Load region name outline color
        const regionNameOutlineColorValue = localStorage.getItem(this.REGION_NAME_OUTLINE_COLOR)
        this.regionNameOutlineColor.set(regionNameOutlineColorValue || this.regionNameOutlineColor())
        localStorage.setItem(this.REGION_NAME_OUTLINE_COLOR, this.regionNameOutlineColor())

        // Initialize region name color CSS variables
        this.setRegionNameColorFromHex(this.regionNameBackgroundColor())

        // Initialize region name outline color CSS variables
        this.setRegionNameOutlineColorFromHex(this.regionNameOutlineColor())

        // Load transparency
        const regionNameTransparencyValue = localStorage.getItem(this.REGION_NAME_TRANSPARENCY)
        this.updateRegionNameTransparency({target: {valueAsNumber: Number(regionNameTransparencyValue || 0)}})

        // Load blur
        const regionNameBlurValue = localStorage.getItem(this.REGION_NAME_BLUR)
        this.updateRegionNameBlur({target: {valueAsNumber: Number(regionNameBlurValue || 0)}})

        // Load outline
        const regionNameOutlineValue = localStorage.getItem(this.REGION_NAME_OUTLINE)
        this.updateRegionNameOutline({target: {valueAsNumber: Number(regionNameOutlineValue || 1)}})

        // Load font family
        const regionNameFontValue = localStorage.getItem(this.REGION_NAME_TEXT_FONT_FAMILY)
        this.updateRegionNameTextFont(regionNameFontValue || this.DEFAULT_TEXT_FONT_FAMILY)

        // Load region name text color
        const regionNameTextColorValue = localStorage.getItem(this.REGION_NAME_TEXT_COLOR)
        this.regionNameTextColor.set(regionNameTextColorValue || this.regionNameTextColor())
        this.setRegionNameTextColorFromHex(this.regionNameTextColor())
        localStorage.setItem(this.REGION_NAME_TEXT_COLOR, this.regionNameTextColor())
    }

    // Initialize Copyright Text
    private initializeCopyrightText(): void {
        const currentYear = new Date().getFullYear().toString()
        const copyrightText = (currentYear === this.copyrightText())
            ? `© ${this.copyrightText()}`
            : `© ${this.copyrightText()} - ${currentYear}`
        this.copyrightText.set(copyrightText)
    }

    // =========== Header Actions =========== //

    // Update the background
    toggleBackground(): void {
        let randomIndex = this.randomImageIndex()
        while (randomIndex === this.randomImageIndex()) {
            randomIndex = Math.floor(Math.random() * Object.values(this.regionsNameMap).length)
        }
        this.randomImageIndex.set(randomIndex)
        const entry = Object.entries(this.regionsNameMap)[randomIndex]
        this.regionName.set(entry[0])
        this.backgroundImage.set(entry[1])
    }

    // Get the background image URL as a CSS url() string
    getBackgroundImageUrl(): string {
        return `url('${this.backgroundImage()}')`
    }

    // Update the info/replay icon
    updateSettingsIcon(): void {
        this.sidenav.toggle()
        if (this.settingsIcon() === this.icon_info) {
            this.settingsIcon.set(this.icon_replay)

        } else {
            this.settingsIcon.set(this.icon_info)
        }

    }

    // Update the Settings Tile 1 Button Icon
    updateSettingsTile1ButtonIcon(): void {
        if (this.tile1SettingsButtonIcon() === this.icon_apps) {
            this.tile1SettingsButtonIcon.set(this.icon_check_box)
        }
        else {
            this.tile1SettingsButtonIcon.set(this.icon_apps)
        }
        localStorage.setItem(this.TILE_1_SETTINGS_BUTTON_ICON, this.tile1SettingsButtonIcon())
        localStorage.setItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED, this.TILE_1)
    }

    // Update the Settings Tile 2 Button Icon
    updateSettingsTile2ButtonIcon(): void {
        if (this.tile2SettingsButtonIcon() === this.icon_apps) {
            this.tile2SettingsButtonIcon.set(this.icon_check_box)
        }
        else {
            this.tile2SettingsButtonIcon.set(this.icon_apps)
        }
        localStorage.setItem(this.TILE_2_SETTINGS_BUTTON_ICON, this.tile1SettingsButtonIcon())
        localStorage.setItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED, this.TILE_2)
    }

    // Update the Settings Tile 3 Button Icon
    updateSettingsTile3ButtonIcon(): void {
        if (this.tile3SettingsButtonIcon() === this.icon_apps) {
            this.tile3SettingsButtonIcon.set(this.icon_check_box)
        }
        else {
            this.tile3SettingsButtonIcon.set(this.icon_apps)
        }
        localStorage.setItem(this.TILE_3_SETTINGS_BUTTON_ICON, this.tile1SettingsButtonIcon())
        localStorage.setItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED, this.TILE_3)
    }

    // =========== Tile Settings Methods =========== //

    // Update Match Tile Colors Checkbox
    updateMatchTileColors(checked: boolean) {
        this.matchTileBackgroundAndOutlineColor.set(checked)
        localStorage.setItem(this.MATCH_TILE_COLORS, checked.toString())
        const lastTileClicked = localStorage.getItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED)
        if (lastTileClicked === this.TILE_1) {
            this.matchedTileBackgroundAndOutlineColor.set(this.tile1BackgroundColor())
        } else if (lastTileClicked === this.TILE_2) {
            this.matchedTileBackgroundAndOutlineColor.set(this.tile2BackgroundColor())
        } else if (lastTileClicked === this.TILE_3) {
            this.matchedTileBackgroundAndOutlineColor.set(this.tile3BackgroundColor())
        } else {
            // PROBLEM: what if user clicks matchTileColors without selecting any tiles first?
            this.matchedTileBackgroundAndOutlineColor.set(this.COLOR_WHITE) // default color
        }
        localStorage.setItem(this.MATCHED_TILE_COLOR, this.matchedTileBackgroundAndOutlineColor())
        this.cdr.detectChanges()
    }

    // Update Match Tile Shade Checkbox
    updateMatchTileShade(checked: boolean) {
        this.matchTileBackgroundAndOutlineShade.set(checked)
        localStorage.setItem(this.MATCH_TILE_TRANSPARENCY, checked.toString())
        const lastTileClicked = localStorage.getItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED)
        if (lastTileClicked === this.TILE_1) {
            this.matchedTileTransparencyAndOutline.set(this.tile1Transparency())
        }
        else if (lastTileClicked === this.TILE_2) {
            this.matchedTileTransparencyAndOutline.set(this.tile2Transparency())
        }
        else if (lastTileClicked === this.TILE_3) {
            this.matchedTileTransparencyAndOutline.set(this.tile3Transparency())
        }
        else {
            // PROBLEM: what if user clicks matchTileShade without selecting any tiles first?
            this.matchedTileTransparencyAndOutline.set(0) // default shade
        }
        localStorage.setItem(this.MATCHED_TILE_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
        this.cdr.detectChanges()
    }

    // Update Match Tile Shade Checkbox
    updateMatchRegionNameShade(checked: boolean) {
        this.matchRegionNameTransparencyAndOutlineShade.set(checked)
        this.matchedRegionNameTransparencyAndOutlineShade.set(this.regionNameTransparency())
        document.documentElement
        localStorage.setItem(this.MATCH_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, checked.toString())
        this.matchedRegionNameTransparencyAndOutlineShade.set(this.regionNameTransparency())
        localStorage.setItem(this.MATCHED_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, this.matchedRegionNameTransparencyAndOutlineShade().toString())
        this.cdr.detectChanges()
    }

    // Update Tile Transparency
    updateTileTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber
        // Apply to all tiles only if all are selected
        if (this.allTilesSelected() && !this.someTilesSelected()) {
            this.setTile1BackgroundTransparency(value)
            this.setTile2BackgroundTransparency(value)
            this.setTile3BackgroundTransparency(value)
        } else {
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1BackgroundTransparency(value)
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2BackgroundTransparency(value)
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3BackgroundTransparency(value)
            }
            if (this.matchTileBackgroundAndOutlineColor()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
            }
            if (this.matchTileBackgroundAndOutlineShade()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1BackgroundTransparency(this.matchedTileTransparencyAndOutline())
                    this.setTile1Outline(this.matchedTileTransparencyAndOutline())
                    localStorage.setItem(this.TILE_1_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
                    localStorage.setItem(this.TILE_1_OUTLINE, this.matchedTileTransparencyAndOutline().toString())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2BackgroundTransparency(this.matchedTileTransparencyAndOutline())
                    this.setTile2Outline(this.matchedTileTransparencyAndOutline())
                    localStorage.setItem(this.TILE_2_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
                    localStorage.setItem(this.TILE_2_OUTLINE, this.matchedTileTransparencyAndOutline().toString())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3BackgroundTransparency(this.matchedTileTransparencyAndOutline())
                    this.setTile3Outline(this.matchedTileTransparencyAndOutline())
                    localStorage.setItem(this.TILE_3_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
                    localStorage.setItem(this.TILE_3_OUTLINE, this.matchedTileTransparencyAndOutline().toString())
                }
            }
        }
        this.cdr.detectChanges()
    }

    // Show Tile Transparency
    showThisTransparency(): any {
        // Return 0 if: no tiles are selected what so ever
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            return 0
        } else {
            if (this.allTilesSelected() || !(this.onlyTile1Selected() ||
                                             this.onlyTile2Selected() ||
                                             this.onlyTile3Selected())) {
                if (this.matchTileBackgroundAndOutlineShade()) {
                    return this.matchedTileTransparencyAndOutline()
                }
                else {
                    // if multiple tiles are selected, return the transparency of the last clicked tile
                    const lastClicked = localStorage.getItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED)
                    if (lastClicked === this.TILE_1) {
                        return this.tile1Transparency()
                    } else if (lastClicked === this.TILE_2) {
                        return this.tile2Transparency()
                    } else if (lastClicked === this.TILE_3) {
                        return this.tile3Transparency()
                    } else {
                        throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage")
                    }
                }
            }
            else if (this.someTilesSelected()) {
                if (this.onlyTile1Selected()) {
                    return this.tile1Transparency()
                }
                if (this.onlyTile2Selected()) {
                    return this.tile2Transparency()
                }
                if (this.onlyTile3Selected()) {
                    return this.tile3Transparency()
                }
            }
            else {
                console.log("showThisTransparency: how did we get here")
                return 0
            }
        }
    }

    // Update Tile Background Color
    updateTileBackgroundColorVariables(colors: ColorEvent) {
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            console.log("No tiles are selected.")
        } else {
            // should only apply if at least one tile is selected
            if (this.matchTileBackgroundAndOutlineColor()) {
                this.setMatchedTileColor(colors)
                localStorage.setItem("matchedTileColor", this.matchedTileBackgroundAndOutlineColor())
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
            } else {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.tile1BackgroundColor.set(colors.color.hex)
                    this.setTile1BackgroundColorVariables(colors)
                    localStorage.setItem(this.TILE_1_BACKGROUND_COLOR, this.tile1BackgroundColor())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.tile2BackgroundColor.set(colors.color.hex)
                    this.setTile2BackgroundColorVariables(colors)
                    localStorage.setItem(this.TILE_2_BACKGROUND_COLOR, this.tile2BackgroundColor())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.tile3BackgroundColor.set(colors.color.hex)
                    this.setTile3BackgroundColorVariables(colors)
                    localStorage.setItem(this.TILE_3_BACKGROUND_COLOR, this.tile3BackgroundColor())
                }
            }
        }
        this.cdr.detectChanges()
    }

    // Update Tile Outline
    updateTileOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber
        if (this.allTilesSelected() && !this.someTilesSelected()) {
            this.setTile1Outline(value)
            this.setTile2Outline(value)
            this.setTile3Outline(value)
        } else {
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1Outline(value)
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2Outline(value)
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3Outline(value)
            }
            if (this.matchTileBackgroundAndOutlineColor()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3MatchedColorProperties(this.matchedTileBackgroundAndOutlineColor())
                }
            }
            if (this.matchTileBackgroundAndOutlineShade()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1BackgroundTransparency(this.matchedTileTransparencyAndOutline())
                    this.setTile1Outline(this.matchedTileTransparencyAndOutline())
                    localStorage.setItem(this.TILE_1_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
                    localStorage.setItem(this.TILE_1_OUTLINE, this.matchedTileTransparencyAndOutline().toString())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2BackgroundTransparency(this.matchedTileTransparencyAndOutline())
                    this.setTile2Outline(this.matchedTileTransparencyAndOutline())
                    localStorage.setItem(this.TILE_2_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
                    localStorage.setItem(this.TILE_2_OUTLINE, this.matchedTileTransparencyAndOutline().toString())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3BackgroundTransparency(this.matchedTileTransparencyAndOutline())
                    this.setTile3Outline(this.matchedTileTransparencyAndOutline())
                    localStorage.setItem(this.TILE_3_TRANSPARENCY, this.matchedTileTransparencyAndOutline().toString())
                    localStorage.setItem(this.TILE_3_OUTLINE, this.matchedTileTransparencyAndOutline().toString())
                }
            }
        }
        this.cdr.detectChanges()
    }

    // Show Tile Outline
    showThisOutline(): any {
        // Return 0 if: no tiles are selected what so ever
        if (!this.allTilesSelected()) {
            return 0
        } else {
            if (this.allTilesSelected() || this.someTilesSelected()) {
                if (this.matchTileBackgroundAndOutlineShade()) {
                    return this.matchedTileTransparencyAndOutline()
                } else {
                    // if multiple tiles are selected, return the outline of the last clicked tile
                    const lastClicked = localStorage.getItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED)
                    if (lastClicked === this.TILE_1) {
                        return this.tile1Outline()
                    } else if (lastClicked === this.TILE_2) {
                        return this.tile2Outline()
                    } else if (lastClicked === this.TILE_3) {
                        return this.tile3Outline()
                    } else {
                        throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage")
                    }
                }
            }
            else if (this.someTilesSelected()) {
                if (this.onlyTile1Selected()) {
                    return this.tile1Outline()
                }
                if (this.onlyTile2Selected()) {
                    return this.tile2Outline()
                }
                if (this.onlyTile3Selected()) {
                    return this.tile3Outline()
                }
            } else {
                console.log("showThisOutline: how did we get here")
                return 0
            }
        }
    }

    // Update Tile Outline Color
    updateTileOutlineColorVariables(colors: ColorEvent) {
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            console.log("No tiles are selected.")
        } else {
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.tile1OutlineColor.set(colors.color.hex)
                this.setTile1OutlineColorVariables(colors)
                localStorage.setItem(this.TILE_1_OUTLINE_COLOR, this.tile1OutlineColor())
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.tile2OutlineColor.set(colors.color.hex)
                this.setTile2OutlineColorVariables(colors)
                localStorage.setItem(this.TILE_2_OUTLINE_COLOR, this.tile2OutlineColor())
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.tile3OutlineColor.set(colors.color.hex)
                this.setTile3OutlineColorVariables(colors)
                localStorage.setItem(this.TILE_3_OUTLINE_COLOR, this.tile3OutlineColor())
            }
            if (this.matchTileBackgroundAndOutlineColor()) {
                this.setMatchedTileColor(colors)
                localStorage.setItem(this.MATCHED_TILE_COLOR, this.matchedTileBackgroundAndOutlineColor())
                this.setTile1OutlineColorVariables(colors)
                this.setTile2OutlineColorVariables(colors)
                this.setTile3OutlineColorVariables(colors)
                this.tile1OutlineColor.set(this.matchedTileBackgroundAndOutlineColor())
                this.tile2OutlineColor.set(this.matchedTileBackgroundAndOutlineColor())
                this.tile3OutlineColor.set(this.matchedTileBackgroundAndOutlineColor())
                localStorage.setItem(this.TILE_1_OUTLINE_COLOR, this.tile1OutlineColor())
                localStorage.setItem(this.TILE_2_OUTLINE_COLOR, this.tile2OutlineColor())
                localStorage.setItem(this.TILE_3_OUTLINE_COLOR, this.tile3OutlineColor())
            }
        }
        this.cdr.detectChanges()
    }

    // Update Tile Blur
    updateTileBlur(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber
        if (this.allTilesSelected() && !this.someTilesSelected()) {
            this.setTile1Blur(value)
            this.setTile2Blur(value)
            this.setTile3Blur(value)
        } else {
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1Blur(value)
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2Blur(value)
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3Blur(value)
            }
        }
        this.cdr.detectChanges()
    }

    // Show Tile Blur
    showThisBlur(): any {
        // Return 0 if: no tiles are selected what so ever
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            return 0
        } else {
            if (this.allTilesSelected() || !(this.onlyTile1Selected() ||
                                             this.onlyTile2Selected() ||
                                             this.onlyTile3Selected())) {
                // if multiple tiles are selected, return the blur of the last clicked tile
                const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked")
                if (lastClicked === this.TILE_1) {
                    return this.tile1Blur()
                } else if (lastClicked === this.TILE_2) {
                    return this.tile2Blur()
                } else if (lastClicked === this.TILE_3) {
                    return this.tile3Blur()
                } else {
                    throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage")
                }
            } else {
                if (this.onlyTile1Selected()) {
                    return this.tile1Blur()
                }
                if (this.onlyTile2Selected()) {
                    return this.tile2Blur()
                }
                if (this.onlyTile3Selected()) {
                    return this.tile3Blur()
                }
            }
        }
    }

    // Update Tile Text Font
    updateTileTextFont(font: string) {
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            console.log("No tiles are selected.")
        } else {
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1TextFontFamily(font)
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2TextFontFamily(font)
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3TextFontFamily(font)
            }
        }
        this.cdr.detectChanges()
    }

    // Show Tile Text Font
    showThisFont(): any {
        // Return 0 if: no tiles are selected what so ever
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            return this.DEFAULT_TEXT_FONT_FAMILY
        } else {
            if (this.allTilesSelected() || this.someTilesSelected()) {
                // if multiple tiles are selected, return the blur of the last clicked tile
                const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked")
                if (lastClicked === this.TILE_1) {
                    return this.tile1TextFontFamily()
                } else if (lastClicked === this.TILE_2) {
                    return this.tile2TextFontFamily()
                } else if (lastClicked === this.TILE_3) {
                    return this.tile3TextFontFamily()
                } else {
                    throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage")
                }
            } else {
                if (this.onlyTile1Selected()) {
                    return this.tile1TextFontFamily()
                }
                if (this.onlyTile2Selected()) {
                    return this.tile2TextFontFamily()
                }
                if (this.onlyTile3Selected()) {
                    return this.tile3TextFontFamily()
                }
            }
        }
    }

    // Set Tile 1 Text Font Family
    setTile1TextFontFamily(font: string) {
        this.tile1TextFontFamily.set(font)
        document.documentElement.style.setProperty('--tile1-text-font-family', font)
        localStorage.setItem(this.TILE_1_TEXT_FONT_FAMILY, font)
    }

    // Set Tile 2 Text Font Family
    setTile2TextFontFamily(font: string) {
        this.tile2TextFontFamily.set(font)
        document.documentElement.style.setProperty('--tile2-text-font-family', font)
        localStorage.setItem(this.TILE_2_TEXT_FONT_FAMILY, font)
    }

    // Set Tile 3 Text Font Family
    setTile3TextFontFamily(font: string) {
        this.tile3TextFontFamily.set(font)
        document.documentElement.style.setProperty('--tile3-text-font-family', font)
        localStorage.setItem(this.TILE_3_TEXT_FONT_FAMILY, font)
    }

    showThisFontColor(): any {
        // return black if no tiles are selected
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            return this.COLOR_BLACK
        } else {
            if (this.allTilesSelected() || this.someTilesSelected()) {
                // if multiple tiles are selected, return the color of the last clicked tile
                const lastClicked = localStorage.getItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED)
                if (lastClicked === this.TILE_1) {
                    return this.tile1TextColor()
                } else if (lastClicked === this.TILE_2) {
                    return this.tile2TextColor()
                }
                else if (lastClicked === this.TILE_3) {
                    return this.tile3TextColor()
                } else {
                    throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage")
                }
            }
            else {
                if (this.onlyTile1Selected()) {
                    return this.tile1TextColor()
                }
                if (this.onlyTile2Selected()) {
                    return this.tile2TextColor()
                }
                if (this.onlyTile3Selected()) {
                    return this.tile3TextColor()
                }
            }
        }
    }

    // Update Tile Text Color
    updateTileTextColorVariables(colors: ColorEvent) {
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            console.log("No tiles are selected.")
        } else {
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1TextColorFromHex(colors.color.hex)
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2TextColorFromHex(colors.color.hex)
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3TextColorFromHex(colors.color.hex)
            }
        }
        this.cdr.detectChanges()
    }

    // =========== Region Name Settings Methods =========== //

    // Update Match Region Name Colors Checkbox
    updateMatchRegionNameColors(checked: boolean) {
        this.matchRegionNameBackgroundAndOutlineColor.set(checked)
        localStorage.setItem(this.MATCH_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, checked.toString())
        this.cdr.detectChanges()
    }

    // Update Region Name Background Color
    updateRegionNameBackgroundColorVariables(colors: ColorEvent) {
        this.setRegionNameBackgroundColorVariables(colors)
        this.regionNameBackgroundColor.set(colors.color.hex)
        if (this.matchRegionNameBackgroundAndOutlineColor()) {
            this.setMatchedRegionNameColor(colors)
            localStorage.setItem(this.MATCHED_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, this.matchedRegionNameBackgroundAndOutlineColor())
            this.setRegionNameOutlineColorVariables(colors)
            this.regionNameOutlineColor.set(colors.color.hex)
            localStorage.setItem(this.REGION_NAME_OUTLINE_COLOR, this.regionNameOutlineColor())
        }
        localStorage.setItem(this.REGION_NAME_BACKGROUND_COLOR, this.regionNameBackgroundColor())
        this.cdr.detectChanges()
    }

    // Update Region Name Transparency
    updateRegionNameTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber
        document.documentElement.style.setProperty('--region-name-transparency',
            value.toString())
        this.regionNameTransparency.set(value)
        if (this.matchRegionNameTransparencyAndOutlineShade()) {
            this.matchedRegionNameTransparencyAndOutlineShade.set(value)
        }
        this.cdr.detectChanges()
        localStorage.setItem(this.REGION_NAME_TRANSPARENCY, value.toString())
    }

    showThisRegionNameTransparency(): any {
        if (this.matchRegionNameTransparencyAndOutlineShade()) {
            document.documentElement.style.setProperty('--region-name-transparency', this.matchedRegionNameTransparencyAndOutlineShade().toString())
            document.documentElement.style.setProperty('--region-name-outline', this.matchedRegionNameTransparencyAndOutlineShade().toString())
            return this.matchedRegionNameTransparencyAndOutlineShade()
        } else {
            return this.regionNameTransparency()
        }
    }

    // Update Region Name Blur
    updateRegionNameBlur(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber
        document.documentElement.style.setProperty('--region-name-backdrop-filter',
            `blur(${value}px)`)
        document.documentElement.style.setProperty('--region-name-webkit-backdrop-filter',
            `blur(${value}px)`)
        this.regionNameBlur.set(value)
        this.cdr.detectChanges()
        localStorage.setItem(this.REGION_NAME_BLUR, value.toString())
    }

    // Update Region Name Outline
    updateRegionNameOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber
        this.regionNameOutline.set(value)
        if (this.matchRegionNameTransparencyAndOutlineShade()) {
            this.matchedRegionNameTransparencyAndOutlineShade.set(value)
        }
        document.documentElement.style.setProperty('--region-name-outline', value.toString())
        this.cdr.detectChanges()
        localStorage.setItem(this.REGION_NAME_OUTLINE, value.toString())
    }

    showThisRegionNameOutline(): any {
        if (this.matchRegionNameTransparencyAndOutlineShade()) {
            document.documentElement.style.setProperty('--region-name-transparency', this.matchedRegionNameTransparencyAndOutlineShade().toString())
            document.documentElement.style.setProperty('--region-name-outline', this.matchedRegionNameTransparencyAndOutlineShade().toString())
            return this.matchedRegionNameTransparencyAndOutlineShade()
        } else {
            return this.regionNameOutline()
        }
    }

    // Update Region Name Outline Color
    updateRegionNameOutlineColorVariables(colors: ColorEvent) {
        this.setRegionNameOutlineColorVariables(colors)
        this.regionNameOutlineColor.set(colors.color.hex)
        if (this.matchRegionNameBackgroundAndOutlineColor()) {
            this.setMatchedRegionNameColor(colors)
            localStorage.setItem(this.MATCHED_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, this.matchedRegionNameBackgroundAndOutlineColor())
            this.setRegionNameBackgroundColorVariables(colors)
            this.regionNameBackgroundColor.set(colors.color.hex)
            localStorage.setItem(this.REGION_NAME_BACKGROUND_COLOR, this.regionNameBackgroundColor())
        }

        this.cdr.detectChanges()
        localStorage.setItem(this.MATCH_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, this.matchRegionNameBackgroundAndOutlineColor().toString())
        localStorage.setItem(this.MATCHED_REGION_NAME_BACKGROUND_AND_OUTLINE_COLOR, this.matchedRegionNameBackgroundAndOutlineColor())
        localStorage.setItem(this.REGION_NAME_OUTLINE_COLOR, this.regionNameOutlineColor())
    }

    // Update Region Name Text Font
    updateRegionNameTextFont(font: string) {
        document.documentElement.style.setProperty('--region-name-text-font-family', font)
        this.regionNameTextFontFamily.set(font)
        this.cdr.detectChanges()
        localStorage.setItem(this.REGION_NAME_TEXT_FONT_FAMILY, font)
    }

    // Update Region Name Text Color
    updateRegionNameTextColorVariables(colors: ColorEvent) {
        this.setRegionNameTextColorVariables(colors)
        this.cdr.detectChanges()
        this.regionNameTextColor.set(colors.color.hex)
        localStorage.setItem(this.REGION_NAME_TEXT_COLOR, this.regionNameTextColor())
        console.debug("updating region name text color to: " + this.regionNameTextColor())
    }

    // =========== Private Helper Methods =========== //

    // Set Tile 1 Matched Color Properties
    private setTile1MatchedColorProperties(hex: string): void {
        this.tile1BackgroundColor.set(this.matchedTileBackgroundAndOutlineColor())
        this.tile1OutlineColor.set(this.matchedTileBackgroundAndOutlineColor())
        this.setTile1BackgroundColorFromHex(hex)
        this.setTile1OutlineColorFromHex(hex)
        localStorage.setItem(this.TILE_1_BACKGROUND_COLOR, this.tile1BackgroundColor())
        localStorage.setItem(this.TILE_1_OUTLINE_COLOR, this.tile1OutlineColor())
    }

    // Set Tile 2 Matched Color Properties
    private setTile2MatchedColorProperties(hex: string): void {
        this.tile2BackgroundColor.set(this.matchedTileBackgroundAndOutlineColor())
        this.tile2OutlineColor.set(this.matchedTileBackgroundAndOutlineColor())
        this.setTile2BackgroundColorFromHex(hex)
        this.setTile2OutlineColorFromHex(hex)
        localStorage.setItem(this.TILE_2_BACKGROUND_COLOR, this.tile2BackgroundColor())
        localStorage.setItem(this.TILE_2_OUTLINE_COLOR, this.tile2OutlineColor())
    }

    // Set Tile 3 Matched Color Properties
    private setTile3MatchedColorProperties(hex: string): void {
        this.tile3BackgroundColor.set(this.matchedTileBackgroundAndOutlineColor())
        this.tile3OutlineColor.set(this.matchedTileBackgroundAndOutlineColor())
        this.setTile3BackgroundColorFromHex(hex)
        this.setTile3OutlineColorFromHex(hex)
        localStorage.setItem(this.TILE_3_BACKGROUND_COLOR, this.tile3BackgroundColor())
        localStorage.setItem(this.TILE_3_OUTLINE_COLOR, this.tile3OutlineColor())
    }

    // Set Tile 1 Background Transparency
    private setTile1BackgroundTransparency(value: number) {
        this.tile1Transparency.set(value)
        this.matchedTileTransparencyAndOutline.set(this.tile1Transparency())
        document.documentElement.style.setProperty('--tile1-transparency', value.toString())
        localStorage.setItem(this.TILE_1_TRANSPARENCY, value.toString())
    }

    // Set Tile 3 Background Transparency
    private setTile2BackgroundTransparency(value: number) {
        this.tile2Transparency.set(value)
        this.matchedTileTransparencyAndOutline.set(this.tile2Transparency())
        document.documentElement.style.setProperty('--tile2-transparency', value.toString())
        localStorage.setItem(this.TILE_2_TRANSPARENCY, value.toString())
    }

    // Set Tile 3 Background Transparency
    private setTile3BackgroundTransparency(value: number) {
        this.tile3Transparency.set(value)
        this.matchedTileTransparencyAndOutline.set(this.tile3Transparency())
        document.documentElement.style.setProperty('--tile3-transparency', value.toString())
        localStorage.setItem(this.TILE_3_TRANSPARENCY, value.toString())
    }

    // Set Tile Color Variables
    private setTile1BackgroundColorVariables(colors: ColorEvent) {
        this.setTile1BackgroundColorFromHex(colors.color.hex)
    }
    // Set Tile 1 Background Color From Hex (initialization)
    private setTile1BackgroundColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile1-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile1-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile1-blue-color', rgb.b.toString())
        }
    }

    // Set Tile Color Variables
    private setTile2BackgroundColorVariables(colors: ColorEvent) {
        this.setTile2BackgroundColorFromHex(colors.color.hex)
    }
    // Set Tile 2 Background Color From Hex (initialization)
    private setTile2BackgroundColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile2-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile2-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile2-blue-color', rgb.b.toString())
        }
    }

    // Set Tile Color Variables
    private setTile3BackgroundColorVariables(colors: ColorEvent) {
        this.setTile3BackgroundColorFromHex(colors.color.hex)
    }
    // Set Tile 3 Background Color From Hex (initialization)
    private setTile3BackgroundColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile3-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile3-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile3-blue-color', rgb.b.toString())
        }
    }

    // Set Matched Tile Color
    private setMatchedTileColor(colors: ColorEvent) {
        this.matchedTileBackgroundAndOutlineColor.set(colors.color.hex)
    }

    // Set Tile 1 Outline
    private setTile1Outline(value: number) {
        this.tile1Outline.set(value)
        this.matchedTileTransparencyAndOutline.set(this.tile1Outline())
        document.documentElement.style.setProperty('--tile1-outline', value.toString())
        localStorage.setItem(this.TILE_1_OUTLINE, value.toString())
    }

    // Set Tile 1 Outline
    private setTile2Outline(value: number) {
        this.tile2Outline.set(value)
        this.matchedTileTransparencyAndOutline.set(this.tile2Outline())
        document.documentElement.style.setProperty('--tile2-outline', value.toString())
        localStorage.setItem(this.TILE_2_OUTLINE, value.toString())
    }

    // Set Tile 1 Outline
    private setTile3Outline(value: number) {
        this.tile3Outline.set(value)
        this.matchedTileTransparencyAndOutline.set(this.tile3Outline())
        document.documentElement.style.setProperty('--tile3-outline', value.toString())
        localStorage.setItem(this.TILE_3_OUTLINE, value.toString())
    }

    // Set Tile 1 Blur
    private setTile1Blur(value: number) {
        this.tile1Blur.set(value)
        document.documentElement.style.setProperty('--tile1-backdrop-filter', this.setBlurString(value))
        document.documentElement.style.setProperty('--tile1-webkit-backdrop-filter', this.setBlurString(value))
        localStorage.setItem(this.TILE_1_BLUR, value.toString())
    }

    // Set Tile 2 Blur
    private setTile2Blur(value: number) {
        this.tile2Blur.set(value)
        document.documentElement.style.setProperty('--tile2-backdrop-filter', this.setBlurString(value))
        document.documentElement.style.setProperty('--tile2-webkit-backdrop-filter', this.setBlurString(value))
        localStorage.setItem(this.TILE_2_BLUR, value.toString())
    }

    // Set Tile 3 Blur
    private setTile3Blur(value: number) {
        this.tile3Blur.set(value)
        document.documentElement.style.setProperty('--tile3-backdrop-filter', this.setBlurString(value))
        document.documentElement.style.setProperty('--tile3-webkit-backdrop-filter', this.setBlurString(value))
        localStorage.setItem(this.TILE_3_BLUR, value.toString())
    }
    
    // Helper to create blur string
    private setBlurString(value: number): string {
        return `blur(${value}px)`
    }

    // Set Tile Outline Color Variables
    private setTile1OutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile1-outline-red-color', colors.color.rgb.r.toString())
        document.documentElement.style.setProperty('--tile1-outline-green-color', colors.color.rgb.g.toString())
        document.documentElement.style.setProperty('--tile1-outline-blue-color', colors.color.rgb.b.toString())
    }

    // Set Tile Outline Color Variables
    private setTile2OutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile2-outline-red-color', colors.color.rgb.r.toString())
        document.documentElement.style.setProperty('--tile2-outline-green-color', colors.color.rgb.g.toString())
        document.documentElement.style.setProperty('--tile2-outline-blue-color', colors.color.rgb.b.toString())
    }

    // Set Tile Outline Color Variables
    private setTile3OutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile3-outline-red-color', colors.color.rgb.r.toString())
        document.documentElement.style.setProperty('--tile3-outline-green-color', colors.color.rgb.g.toString())
        document.documentElement.style.setProperty('--tile3-outline-blue-color', colors.color.rgb.b.toString())
    }

    // Set Tile Outline Color From Hex (initialization)
    private setTile1OutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile1-outline-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile1-outline-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile1-outline-blue-color', rgb.b.toString())
        }
    }

    // Set Tile Outline Color From Hex (initialization)
    private setTile2OutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile2-outline-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile2-outline-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile2-outline-blue-color', rgb.b.toString())
        }
    }

    // Set Tile Outline Color From Hex (initialization)
    private setTile3OutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile3-outline-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile3-outline-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile3-outline-blue-color', rgb.b.toString())
        }
    }

    // Set Tile 1 Text Color From Hex (initialization)
    private setTile1TextColorFromHex(hex: string) {
        this.tile1TextColor.set(hex)
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile1-text-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile1-text-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile1-text-blue-color', rgb.b.toString())
        }
        localStorage.setItem(this.TILE_1_TEXT_COLOR, this.tile1TextColor())
    }

    // Set Tile 2 Text Color From Hex (initialization)
    private setTile2TextColorFromHex(hex: string) {
        this.tile2TextColor.set(hex)
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile2-text-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile2-text-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile2-text-blue-color', rgb.b.toString())
        }
        localStorage.setItem(this.TILE_2_TEXT_COLOR, this.tile2TextColor())
    }

    // Set Tile 3 Text Color From Hex (initialization)
    private setTile3TextColorFromHex(hex: string) {
        this.tile3TextColor.set(hex)
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--tile3-text-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--tile3-text-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--tile3-text-blue-color', rgb.b.toString())
        }
        localStorage.setItem(this.TILE_3_TEXT_COLOR, this.tile3TextColor())
    }

    // Set Region Name Background Color Variables
    private setRegionNameBackgroundColorVariables(colors: ColorEvent) {
        this.setRegionNameColorFromHex(colors.color.hex)
    }

    // Set Matched Region Name Color
    private setMatchedRegionNameColor(colors: ColorEvent) {
        this.setRegionNameColorFromHex(colors.color.hex)
    }
    // Set Region Name Color From Hex (initialization)
    private setRegionNameColorFromHex(hex: string) {
        console.debug("Setting matched region name color to: " + hex)
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--region-name-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--region-name-green-color',  rgb.g.toString())
            document.documentElement.style.setProperty('--region-name-blue-color',  rgb.b.toString())
        }
    }

    // Set Tile Outline Color Variables
    private setRegionNameOutlineColorVariables(colors: ColorEvent) {
        this.setRegionNameOutlineColorFromHex(colors.color.hex)
    }
    // Set Region Name Outline Color From Hex (initialization)
    private setRegionNameOutlineColorFromHex(hex: string) {
        console.debug("Setting region name outline color to: " + hex)
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--region-name-outline-red-color', rgb.r.toString())
            document.documentElement.style.setProperty('--region-name-outline-green-color', rgb.g.toString())
            document.documentElement.style.setProperty('--region-name-outline-blue-color', rgb.b.toString())
        }
    }

    // Set Region Name Color Variables
    private setRegionNameTextColorVariables(colors: ColorEvent) {
        this.setRegionNameTextColorFromHex(colors.color.hex)
    }
    // Set Region Name Text Color From Hex (initialization)
    private setRegionNameTextColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex)
        if (rgb) {
            document.documentElement.style.setProperty('--red-region-name-text-color', rgb.r.toString())
            document.documentElement.style.setProperty('--green-region-name-text-color', rgb.g.toString())
            document.documentElement.style.setProperty('--blue-region-name-text-color', rgb.b.toString())
        }
    }

    // Helper methods to set CSS variables from hex color strings
    private hexToRgb(hex: string): { r: number, g: number, b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        console.debug("Converting hex " + hex + " to rgb: " + result)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null
    }

    // Returns true if all tiles are selected
    private allTilesSelected(): boolean {
        return this.tile1SettingsButtonIcon() === this.icon_check_box &&
               this.tile2SettingsButtonIcon() === this.icon_check_box &&
               this.tile3SettingsButtonIcon() === this.icon_check_box
    }

    // Returns true if some tiles are selected
    private someTilesSelected(): boolean {
        return this.tile1SettingsButtonIcon() === this.icon_check_box ||
               this.tile2SettingsButtonIcon() === this.icon_check_box ||
               this.tile3SettingsButtonIcon() === this.icon_check_box
    }

    // Return true only if Tile 1 is selected
    private onlyTile1Selected(): boolean {
        return this.tile1SettingsButtonIcon() === this.icon_check_box
            && this.tile2SettingsButtonIcon() === this.icon_apps
            && this.tile3SettingsButtonIcon() === this.icon_apps
    }

    // Returns true only if Tile 2 is selected
    private onlyTile2Selected(): boolean {
        return this.tile2SettingsButtonIcon() === this.icon_check_box
            && this.tile1SettingsButtonIcon() === this.icon_apps
            && this.tile3SettingsButtonIcon() === this.icon_apps
    }

    // Returns true only if Tile 3 is selected
    private onlyTile3Selected(): boolean {
        return this.tile3SettingsButtonIcon() === this.icon_check_box
            && this.tile1SettingsButtonIcon() === this.icon_apps
            && this.tile2SettingsButtonIcon() === this.icon_apps
    }
}

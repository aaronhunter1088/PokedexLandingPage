import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, ViewChild} from '@angular/core';
import {ColorEvent} from 'ngx-color';
import {ColorCompactModule} from "ngx-color/compact";
import {MaterialModule} from "./materialModule";
import {MatSidenav} from "@angular/material/sidenav";
import {Tiles} from "../tiles/tiles";
import {MatExpansionPanel} from "@angular/material/expansion";

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
    @ViewChild('sidenav') sidenav!: MatSidenav;
    // obtain reference to the element #tileAccordian
    @ViewChild('tileAccordian') tileAccordian!: MatExpansionPanel;
    // obtain reference to the element #regionNameAccordian
    @ViewChild('regionNameAccordian') regionNameAccordian!: MatExpansionPanel;
    // obtain reference to the element #aboutAccordian
    @ViewChild('aboutAccordian') aboutAccordian!: MatExpansionPanel;
    // icons in use
    protected readonly icon_info = 'info';
    protected readonly icon_replay = 'replay';
    protected readonly icon_shuffle = 'shuffle';
    protected readonly icon_apps = 'apps';
    protected readonly icon_check_box = 'check_box';
    protected readonly Math = Math;
    protected readonly title = signal('My Pokédex'); // &#233; é
    protected readonly copyrightText = signal('2026');
    protected readonly color_white = '#FFFFFF';
    protected readonly color_black = '#000000';
    protected readonly LAST_TILE_SETTINGS_BUTTON_CLICKED
                        = "tileSettingsButtonLastClicked";

    protected currentIcon = signal(this.icon_info);
    protected tile1SettingsButtonIcon = signal(this.icon_apps);
    protected tile2SettingsButtonIcon = signal(this.icon_apps);
    protected tile3SettingsButtonIcon = signal(this.icon_apps);
    protected regionColor = signal(this.color_white);
    // tile specific settings
    protected matchTileColors = signal(false);
    protected matchedTileColor = signal(this.color_white);
    protected matchTileShade = signal(false);
    protected matchedTileShade = signal(0);
    protected tile1BackgroundColor = signal(this.color_white);
    protected tile2BackgroundColor = signal(this.color_white);
    protected tile3BackgroundColor = signal(this.color_white);
    protected tile1OutlineColor = signal(this.color_white);
    protected tile2OutlineColor = signal(this.color_white);
    protected tile3OutlineColor = signal(this.color_white);
    protected tile1Transparency = signal(0);
    protected tile2Transparency = signal(0);
    protected tile3Transparency = signal(0);
    protected tile1Blur = signal(0);
    protected tile2Blur = signal(0);
    protected tile3Blur = signal(0);
    protected tile1Outline = signal(0);
    protected tile2Outline = signal(0);
    protected tile3Outline = signal(0);
    protected tile1TextFontFamily = signal('Roboto, sans-serif');
    protected tile2TextFontFamily = signal('Roboto, sans-serif');
    protected tile3TextFontFamily = signal('Roboto, sans-serif');
    protected tile1TextColor = signal(this.color_black);
    protected tile2TextColor = signal(this.color_black);
    protected tile3TextColor = signal(this.color_black);
    // region name specific settings
    protected matchRegionNameColors = signal(false);
    protected matchedRegionNameColor = signal('');
    protected regionNameBackgroundColor = signal(this.color_white);
    protected regionNameOutlineColor = signal(this.color_white);
    protected regionNameTransparency = signal(0);
    protected regionNameBlur = signal(0);
    protected regionNameOutline = signal(1);
    protected regionNameTextFontFamily = signal('Roboto, sans-serif');
    protected regionNameTextColor = signal(this.color_black);
    protected readonly panelTileSettingsOpenState = signal(false);
    protected readonly panelRegionNameSettingsOpenState = signal(false);
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
    };
    protected backgroundImage = signal(Object.values(this.regionsNameMap)[0]);
    protected regionName = signal(Object.keys(this.regionsNameMap)[0]);

    // Component  constructor
    constructor(private cdr: ChangeDetectorRef) {
    }

    // Runs once when the component is initialized
    ngOnInit(): void {
        // Initialize settings from local storage. this ensures a consistent experience for users
        this.initializeTileSettingsFromLocalStorage();
        this.initializeRegionNameSettingsFromLocalStorage();
        this.initializeCopyrightText();
        this.cdr.detectChanges();
        // Used while testing sidenav settings
        this.sidenav.open();
    }

    /*
     * Runs once:
     * After the first ngOnInit
     * After all @ViewChild and @ViewChildren queries are resolved
     * Before any user interaction occurs
     * It does not run again when:
     *
     *
     * The sidenav opens or closes
     * Any properties change
     * User interactions occur
     */
    ngAfterViewInit(): void {
        // Close any accordians when the sidenav is closed if open
        this.sidenav.closedStart.subscribe(() => {
            if (this.tileAccordian?.expanded) this.tileAccordian.close();
            if (this.regionNameAccordian?.expanded) this.regionNameAccordian.close();
            if (this.aboutAccordian?.expanded) this.aboutAccordian.close();
        });
    }

    ngOnChanges() {
    }

    // Update the background
    toggleBackground(): void {
        const randomIndex = Math.floor(Math.random() * Object.values(this.regionsNameMap).length);
        const entry = Object.entries(this.regionsNameMap)[randomIndex];
        const regionNameKey = entry[0];
        const image = entry[1];
        this.backgroundImage.set(image);
        this.regionName.set(regionNameKey);
    }

    // Get the background image URL as a CSS url() string
    getBackgroundImageUrl(): string {
        return `url('${this.backgroundImage()}')`;
    }

    // =========== Header Actions =========== //

    // Update the info/replay icon
    updateIcon(): void {
        this.sidenav.toggle();
        if (this.currentIcon() === this.icon_info) {
            this.currentIcon.set(this.icon_replay);

        } else {
            this.currentIcon.set(this.icon_info);
        }

    }

    // Update the Settings Tile 1 Button Icon
    updateSettingsTile1ButtonIcon(): void {
        if (this.tile1SettingsButtonIcon() === this.icon_apps) {
            this.tile1SettingsButtonIcon.set(this.icon_check_box)
        }
        else {
            this.tile1SettingsButtonIcon.set(this.icon_apps);
        }
        localStorage.setItem("tile1SettingsButtonIcon", this.tile1SettingsButtonIcon())
        localStorage.setItem("tileSettingsButtonLastClicked", "tile1")
    }

    // Update the Settings Tile 2 Button Icon
    updateSettingsTile2ButtonIcon(): void {
        if (this.tile2SettingsButtonIcon() === this.icon_apps) {
            this.tile2SettingsButtonIcon.set(this.icon_check_box)
        }
        else {
            this.tile2SettingsButtonIcon.set(this.icon_apps);
        }
        localStorage.setItem("tile2SettingsButtonIcon", this.tile1SettingsButtonIcon())
        localStorage.setItem("tileSettingsButtonLastClicked", "tile2")
    }

    // Update the Settings Tile 3 Button Icon
    updateSettingsTile3ButtonIcon(): void {
        if (this.tile3SettingsButtonIcon() === this.icon_apps) {
            this.tile3SettingsButtonIcon.set(this.icon_check_box)
        }
        else {
            this.tile3SettingsButtonIcon.set(this.icon_apps);
        }
        localStorage.setItem("tile3SettingsButtonIcon", this.tile1SettingsButtonIcon())
        localStorage.setItem("tileSettingsButtonLastClicked", "tile3")
    }

    // =========== Tile Settings Methods =========== //

    // Update Match Tile Colors Checkbox
    updateMatchTileColors(checked: boolean) {
        this.matchTileColors.set(checked);
        localStorage.setItem("matchTileColors", checked.toString());
        const lastTileClicked = localStorage.getItem("tileSettingsButtonLastClicked");
        if (lastTileClicked === "tile1") {
            this.matchedTileColor.set(this.tile1BackgroundColor());
        } else if (lastTileClicked === "tile2") {
            this.matchedTileColor.set(this.tile2BackgroundColor());
        } else if (lastTileClicked === "tile3") {
            this.matchedTileColor.set(this.tile3BackgroundColor());
        } else {
            // PROBLEM: what if user clicks matchTileColors without selecting any tiles first?
            this.matchedTileColor.set(this.color_white); // default color
        }
        localStorage.setItem("matchedTileColor", this.matchedTileColor());
        this.cdr.detectChanges();
    }

    // Update Match Tile Shade Checkbox
    updateMatchTileShade(checked: boolean) {
        this.matchTileShade.set(checked);
        localStorage.setItem("matchTileShade", checked.toString());
        const lastTileClicked = localStorage.getItem(this.LAST_TILE_SETTINGS_BUTTON_CLICKED);
        if (lastTileClicked === "tile1") {
            this.matchedTileShade.set(this.tile1Transparency());
        } else if (lastTileClicked === "tile2") {
            this.matchedTileShade.set(this.tile2Transparency());
        } else if (lastTileClicked === "tile3") {
            this.matchedTileShade.set(this.tile3Transparency());
        } else {
            // PROBLEM: what if user clicks matchTileShade without selecting any tiles first?
            this.matchedTileShade.set(0); // default shade
        }
        localStorage.setItem("matchedTileShade", this.matchedTileShade().toString());
        this.cdr.detectChanges();
    }

    // Update Tile Transparency
    updateTileTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
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
            if (this.matchTileColors()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1MatchedColorProperties(this.matchedTileColor())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2MatchedColorProperties(this.matchedTileColor())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3MatchedColorProperties(this.matchedTileColor())
                }
            }
            if (this.matchTileShade()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1BackgroundTransparency(this.matchedTileShade())
                    this.setTile1Outline(this.matchedTileShade())
                    localStorage.setItem("tile1Transparency", this.matchedTileShade().toString());
                    localStorage.setItem("tile1Outline", this.matchedTileShade().toString());
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2BackgroundTransparency(this.matchedTileShade())
                    this.setTile2Outline(this.matchedTileShade())
                    localStorage.setItem("tile2Transparency", this.matchedTileShade().toString());
                    localStorage.setItem("tile2Outline", this.matchedTileShade().toString());
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3BackgroundTransparency(this.matchedTileShade())
                    this.setTile3Outline(this.matchedTileShade())
                    localStorage.setItem("tile3Transparency", this.matchedTileShade().toString());
                    localStorage.setItem("tile3Outline", this.matchedTileShade().toString());
                }
            }
        }
        this.cdr.detectChanges();
    }

    showThisTransparency(): any {
        // Return 0 if: no tiles are selected what so ever
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            return 0
        } else {
            if (this.allTilesSelected() || this.someTilesSelected()) {
                if (this.matchTileShade()) {
                    console.debug("showThisTransparency: matchTileShade is true");
                    return this.matchedTileShade()
                    // // if multiple tiles are selected, return the transparency of the last clicked tile
                    // const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked");
                    // if (lastClicked === "tile1") {
                    //
                    // } else if (lastClicked === "tile2") {
                    //     return this.matchedTileShade()
                    // } else if (lastClicked === "tile3") {
                    //     return this.matchedTileShade()
                    // } else {
                    //     throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage");
                    // }
                }
                else {
                    // if multiple tiles are selected, return the transparency of the last clicked tile
                    const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked");
                    if (lastClicked === "tile1") {
                        return this.tile1Transparency();
                    } else if (lastClicked === "tile2") {
                        return this.tile2Transparency();
                    } else if (lastClicked === "tile3") {
                        return this.tile3Transparency();
                    } else {
                        throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage");
                    }
                }
            } else if (this.someTilesSelected()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box && this.tile2SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile1Transparency();
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile2Transparency();
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile2SettingsButtonIcon() === this.icon_apps) {
                    return this.tile3Transparency();
                }
            } else {
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
            if (this.matchTileColors()) {
                this.setMatchedTileColor(colors);
                localStorage.setItem("matchedTileColor", this.matchedTileColor());
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1MatchedColorProperties(this.matchedTileColor())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2MatchedColorProperties(this.matchedTileColor())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3MatchedColorProperties(this.matchedTileColor())
                }
            } else {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.tile1BackgroundColor.set(colors.color.hex);
                    this.setTile1BackgroundColorVariables(colors)
                    localStorage.setItem("tile1BackgroundColor", this.tile1BackgroundColor());
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.tile2BackgroundColor.set(colors.color.hex);
                    this.setTile2BackgroundColorVariables(colors)
                    localStorage.setItem("tile2BackgroundColor", this.tile2BackgroundColor());
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.tile3BackgroundColor.set(colors.color.hex);
                    this.setTile3BackgroundColorVariables(colors)
                    localStorage.setItem("tile3BackgroundColor", this.tile3BackgroundColor());
                }
            }
        }
        this.cdr.detectChanges();
    }

    // Update Tile Outline
    updateTileOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
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
            if (this.matchTileColors()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1MatchedColorProperties(this.matchedTileColor())
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2MatchedColorProperties(this.matchedTileColor())
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3MatchedColorProperties(this.matchedTileColor())
                }
            }
            if (this.matchTileShade()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile1BackgroundTransparency(this.matchedTileShade())
                    this.setTile1Outline(this.matchedTileShade())
                    localStorage.setItem("tile1Transparency", this.matchedTileShade().toString());
                    localStorage.setItem("tile1Outline", this.matchedTileShade().toString());
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile2BackgroundTransparency(this.matchedTileShade())
                    this.setTile2Outline(this.matchedTileShade())
                    localStorage.setItem("tile2Transparency", this.matchedTileShade().toString());
                    localStorage.setItem("tile2Outline", this.matchedTileShade().toString());
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                    this.setTile3BackgroundTransparency(this.matchedTileShade())
                    this.setTile3Outline(this.matchedTileShade())
                    localStorage.setItem("tile3Transparency", this.matchedTileShade().toString());
                    localStorage.setItem("tile3Outline", this.matchedTileShade().toString());
                }
            }
        }
        this.cdr.detectChanges();
    }

    showThisOutline(): any {
        // Return 0 if: no tiles are selected what so ever
        if (this.allTilesSelected() && !this.someTilesSelected()) {
            return 0
        } else {
            if (this.allTilesSelected() || this.someTilesSelected()) {
                if (this.matchTileShade()) {
                    return this.matchedTileShade()
                    // // if multiple tiles are selected, return the transparency of the last clicked tile
                    // const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked");
                    // if (lastClicked === "tile1") {
                    //     return this.matchTileShade()
                    // } else if (lastClicked === "tile2") {
                    //     return this.matchTileShade()
                    // } else if (lastClicked === "tile3") {
                    //     return this.matchTileShade()
                    // } else {
                    //     throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage");
                    // }
                } else {
                    // if multiple tiles are selected, return the outline of the last clicked tile
                    const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked");
                    if (lastClicked === "tile1") {
                        return this.tile1Outline();
                    } else if (lastClicked === "tile2") {
                        return this.tile2Outline();
                    } else if (lastClicked === "tile3") {
                        return this.tile3Outline();
                    } else {
                        throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage");
                    }
                }
            }
            else if (this.someTilesSelected()) {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box && this.tile2SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile1Outline();
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile2Outline();
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile2SettingsButtonIcon() === this.icon_apps) {
                    return this.tile3Outline();
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
                this.tile1OutlineColor.set(colors.color.hex);
                this.setTile1OutlineColorVariables(colors);
                localStorage.setItem("tile1OutlineColor", this.tile1OutlineColor());
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.tile2OutlineColor.set(colors.color.hex);
                this.setTile2OutlineColorVariables(colors);
                localStorage.setItem("tile2OutlineColor", this.tile2OutlineColor());
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.tile3OutlineColor.set(colors.color.hex);
                this.setTile3OutlineColorVariables(colors);
                localStorage.setItem("tile3OutlineColor", this.tile3OutlineColor());
            }
            if (this.matchTileColors()) {
                this.setMatchedTileColor(colors);
                localStorage.setItem("matchedTileColor", this.matchedTileColor());
                this.setTile1OutlineColorVariables(colors);
                this.setTile2OutlineColorVariables(colors);
                this.setTile3OutlineColorVariables(colors);
                this.tile1OutlineColor.set(this.matchedTileColor());
                this.tile2OutlineColor.set(this.matchedTileColor());
                this.tile3OutlineColor.set(this.matchedTileColor());
                localStorage.setItem("tile1OutlineColor", this.tile1OutlineColor());
                localStorage.setItem("tile2OutlineColor", this.tile2OutlineColor());
                localStorage.setItem("tile3OutlineColor", this.tile3OutlineColor());
            }
        }
        this.cdr.detectChanges();
    }

    // Update Tile Blur
    updateTileBlur(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
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
        this.cdr.detectChanges();
    }

    showThisBlur(): any {
        // Return 0 if: no tiles are selected what so ever
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            return 0
        } else {
            if (this.allTilesSelected() || this.someTilesSelected()) {
                // if multiple tiles are selected, return the blur of the last clicked tile
                const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked");
                if (lastClicked === "tile1") {
                    return this.tile1Blur();
                } else if (lastClicked === "tile2") {
                    return this.tile2Blur();
                } else if (lastClicked === "tile3") {
                    return this.tile3Blur();
                } else {
                    throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage");
                }
            } else {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box && this.tile2SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile1Blur();
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile2Blur();
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile2SettingsButtonIcon() === this.icon_apps) {
                    return this.tile3Blur();
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
        this.cdr.detectChanges();
    }

    showThisFont(): any {
        // Return 0 if: no tiles are selected what so ever
        if (!this.allTilesSelected() && !this.someTilesSelected()) {
            return 'Roboto, sans-serif'
        } else {
            if (this.allTilesSelected() || this.someTilesSelected()) {
                // if multiple tiles are selected, return the blur of the last clicked tile
                const lastClicked = localStorage.getItem("tileSettingsButtonLastClicked");
                if (lastClicked === "tile1") {
                    return this.tile1TextFontFamily()
                } else if (lastClicked === "tile2") {
                    return this.tile2TextFontFamily()
                } else if (lastClicked === "tile3") {
                    return this.tile3TextFontFamily()
                } else {
                    throw new Error("tileSettingsButtonLastClicked is not set correctly in localStorage");
                }
            } else {
                if (this.tile1SettingsButtonIcon() === this.icon_check_box && this.tile2SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile1TextFontFamily()
                }
                if (this.tile2SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile3SettingsButtonIcon() === this.icon_apps) {
                    return this.tile2TextFontFamily()
                }
                if (this.tile3SettingsButtonIcon() === this.icon_check_box && this.tile1SettingsButtonIcon() === this.icon_apps && this.tile2SettingsButtonIcon() === this.icon_apps) {
                    return this.tile3TextFontFamily()
                }
            }
        }
    }

    setTile1TextFontFamily(font: string) {
        this.tile1TextFontFamily.set(font)
        document.documentElement.style.setProperty('--tile1-text-font-family', font);
        localStorage.setItem("tile1TextFontFamily", font);
    }

    setTile2TextFontFamily(font: string) {
        this.tile2TextFontFamily.set(font)
        document.documentElement.style.setProperty('--tile2-text-font-family', font);
        localStorage.setItem("tile2TextFontFamily", font);
    }

    setTile3TextFontFamily(font: string) {
        this.tile3TextFontFamily.set(font)
        document.documentElement.style.setProperty('--tile3-text-font-family', font);
        localStorage.setItem("tile3TextFontFamily", font);
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
        this.cdr.detectChanges();
    }


    // =========== Region Name Settings Methods =========== //

    // Update Match Region Name Colors Checkbox
    updateMatchRegionNameColors(checked: boolean) {
        this.matchRegionNameColors.set(checked);
        localStorage.setItem("matchRegionNameColors", checked.toString());
        this.cdr.detectChanges();
    }

    // Update Region Name Background Color
    updateRegionNameBackgroundColorVariables(colors: ColorEvent) {
        this.setRegionNameBackgroundColorVariables(colors);
        this.regionNameBackgroundColor.set(colors.color.hex);
        if (this.matchRegionNameColors()) {
            this.setMatchedRegionNameColor(colors);
            localStorage.setItem("matchedRegionNameColor", this.matchedRegionNameColor());
            this.setRegionNameOutlineColorVariables(colors);
            this.regionNameOutlineColor.set(colors.color.hex);
            localStorage.setItem("regionNameOutlineColor", this.regionNameOutlineColor());
        }
        localStorage.setItem("regionNameBackgroundColor", this.regionNameBackgroundColor());
        this.cdr.detectChanges();
    }

    // Update Region Name Transparency
    updateRegionNameTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--region-name-transparency',
            value.toString());
        this.regionNameTransparency.set(value);
        this.cdr.detectChanges();
        localStorage.setItem("regionNameTransparency", value.toString());
    }

    // Update Region Name Blur
    updateRegionNameBlur(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--region-name-backdrop-filter',
            `blur(${value}px)`);
        document.documentElement.style.setProperty('--region-name-webkit-backdrop-filter',
            `blur(${value}px)`);
        this.regionNameBlur.set(value);
        this.cdr.detectChanges();
        localStorage.setItem("regionNameBlur", value.toString());
    }

    // Update Region Name Outline
    updateRegionNameOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--region-name-outline',
            value.toString());
        this.regionNameOutline.set(value);
        this.cdr.detectChanges();
        localStorage.setItem("regionNameOutline", value.toString());
    }

    // Update Region Name Outline Color
    updateRegionNameOutlineColorVariables(colors: ColorEvent) {
        this.setRegionNameOutlineColorVariables(colors);
        this.regionNameOutlineColor.set(colors.color.hex);
        if (this.matchRegionNameColors()) {
            this.setMatchedRegionNameColor(colors);
            localStorage.setItem("matchedRegionNameColor", this.matchedRegionNameColor());
            this.setRegionNameBackgroundColorVariables(colors);
            this.regionNameBackgroundColor.set(colors.color.hex);
            localStorage.setItem("regionNameBackgroundColor", this.regionNameBackgroundColor());
        }

        this.cdr.detectChanges();
        localStorage.setItem("matchRegionNameColors", this.matchRegionNameColors().toString());
        localStorage.setItem("matchedRegionNameColor", this.matchedRegionNameColor());
        localStorage.setItem("regionNameOutlineColor", this.regionNameOutlineColor());
    }

    // Update Region Name Text Font
    updateRegionNameTextFont(font: string) {
        document.documentElement.style.setProperty('--region-name-text-font-family', font);
        this.regionNameTextFontFamily.set(font)
        this.cdr.detectChanges();
        localStorage.setItem("regionNameTextFontFamily", font);
    }

    // Update Region Name Text Color
    updateRegionNameTextColorVariables(colors: ColorEvent) {
        this.setRegionNameTextColorVariables(colors);
        this.cdr.detectChanges();
        this.regionNameTextColor.set(colors.color.hex);
        localStorage.setItem("regionNameTextColor", this.regionNameTextColor());
        console.debug("updating region name text color to: " + this.regionNameTextColor());
    }

    // Initialize Tile Settings from Local Storage
    private initializeTileSettingsFromLocalStorage(): void {
        // Load which tiles were selected last
        const tile1SelectedValue = localStorage.getItem("tile1SettingsButtonIcon");
        this.tile1SettingsButtonIcon.set(tile1SelectedValue || this.tile1SettingsButtonIcon());
        const tile2SelectedValue = localStorage.getItem("tile2SettingsButtonIcon");
        this.tile2SettingsButtonIcon.set(tile2SelectedValue || this.tile2SettingsButtonIcon());
        const tile3SelectedValue = localStorage.getItem("tile3SettingsButtonIcon");
        this.tile3SettingsButtonIcon.set(tile3SelectedValue || this.tile3SettingsButtonIcon());

        // Load tile transparencies
        const tile1TransparencyValue = localStorage.getItem("tile1Transparency");
        this.setTile1BackgroundTransparency(Number(tile1TransparencyValue || this.tile1Transparency()));
        const tile2TransparencyValue = localStorage.getItem("tile2Transparency");
        this.setTile2BackgroundTransparency(Number(tile2TransparencyValue || this.tile2Transparency()));
        const tile3TransparencyValue = localStorage.getItem("tile3Transparency");
        this.setTile3BackgroundTransparency(Number(tile3TransparencyValue || this.tile3Transparency()));

        // Load tile background color
        const tile1BackgroundColorValue = localStorage.getItem("tile1BackgroundColor");
        this.tile1BackgroundColor.set(tile1BackgroundColorValue || this.tile1BackgroundColor());
        const tile2BackgroundColorValue = localStorage.getItem("tile2BackgroundColor");
        this.tile2BackgroundColor.set(tile2BackgroundColorValue || this.tile1BackgroundColor());
        const tile3BackgroundColorValue = localStorage.getItem("tile3BackgroundColor");
        this.tile3BackgroundColor.set(tile3BackgroundColorValue || this.tile1BackgroundColor());
        this.setTile1BackgroundColorFromHex(this.tile1BackgroundColor())
        this.setTile2BackgroundColorFromHex(this.tile2BackgroundColor())
        this.setTile3BackgroundColorFromHex(this.tile3BackgroundColor())

        // set variables
        localStorage.setItem("tile1BackgroundColor", this.tile1BackgroundColor());
        localStorage.setItem("tile2BackgroundColor", this.tile1BackgroundColor());
        localStorage.setItem("tile3BackgroundColor", this.tile1BackgroundColor());

        // Load tile outline color
        const tile1OutlineColorValue = localStorage.getItem("tile1OutlineColor");
        this.tile1OutlineColor.set(tile1OutlineColorValue || this.tile1OutlineColor());
        const tile2OutlineColorValue = localStorage.getItem("tile2OutlineColor");
        this.tile2OutlineColor.set(tile2OutlineColorValue || this.tile2OutlineColor());
        const tile3OutlineColorValue = localStorage.getItem("tile3OutlineColor");
        this.tile3OutlineColor.set(tile3OutlineColorValue || this.tile3OutlineColor());

        // Initialize tile outline color CSS variables
        this.setTile1OutlineColorFromHex(this.tile1OutlineColor());
        this.setTile2OutlineColorFromHex(this.tile2OutlineColor());
        this.setTile3OutlineColorFromHex(this.tile3OutlineColor());

        // Load outline
        const tile1OutlineValue = localStorage.getItem("tile1Outline");
        this.setTile1Outline(Number(tile1OutlineValue || this.tile1Outline()))
        const tile2OutlineValue = localStorage.getItem("tile2Outline");
        this.setTile2Outline(Number(tile2OutlineValue || this.tile2Outline()))
        const tile3OutlineValue = localStorage.getItem("tile3Outline");
        this.setTile3Outline(Number(tile3OutlineValue || this.tile3Outline()))

        // Load blur
        const tile1BlurValue = localStorage.getItem("tile1Blur");
        this.setTile1Blur(Number(tile1BlurValue || this.tile1Blur()));
        const tile2BlurValue = localStorage.getItem("tile2Blur");
        this.setTile2Blur(Number(tile2BlurValue || this.tile2Blur()));
        const tile3BlurValue = localStorage.getItem("tile3Blur");
        this.setTile3Blur(Number(tile3BlurValue || this.tile3Blur()));

        // Load matchTileColors
        const matchTileColorsValue = localStorage.getItem("matchTileColors");
        this.matchTileColors.set(matchTileColorsValue === 'true');
        if (this.matchTileColors()) {
            // Load matched tile color
            const matchedTileColorValue = localStorage.getItem("matchedTileColor");
            this.matchedTileColor.set(matchedTileColorValue || this.matchedTileColor());
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1MatchedColorProperties(this.matchedTileColor())
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2MatchedColorProperties(this.matchedTileColor())
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3MatchedColorProperties(this.matchedTileColor())
            }
        }
        localStorage.setItem("matchedTileColor", this.matchedTileColor());
        localStorage.setItem("matchTileColors", this.matchTileColors().toString());
        if (this.matchTileShade()) {
            // load matched tile transparency
            const matchedTileShadeValue = localStorage.getItem("matchedTileShade");
            this.matchedTileShade.set(Number(matchedTileShadeValue || this.matchedTileShade()));
            if (this.tile1SettingsButtonIcon() === this.icon_check_box) {
                this.setTile1BackgroundTransparency(this.matchedTileShade())
            }
            if (this.tile2SettingsButtonIcon() === this.icon_check_box) {
                this.setTile2BackgroundTransparency(this.matchedTileShade())
            }
            if (this.tile3SettingsButtonIcon() === this.icon_check_box) {
                this.setTile3BackgroundTransparency(this.matchedTileShade())
            }
        }
        localStorage.setItem("matchTileShade", this.matchTileShade().toString());
        localStorage.setItem("matchedTileShade", this.matchedTileShade().toString());

        // Load font family
        const tile1FontValue = localStorage.getItem("tile1TextFontFamily");
        this.setTile1TextFontFamily(tile1FontValue || this.tile1TextFontFamily());
        const tile2FontValue = localStorage.getItem("tile2TextFontFamily");
        this.setTile2TextFontFamily(tile2FontValue || this.tile2TextFontFamily());
        const tile3FontValue = localStorage.getItem("tile3TextFontFamily");
        this.setTile3TextFontFamily(tile3FontValue || this.tile3TextFontFamily());

        // Load tile text color
        const tile1TextColorValue = localStorage.getItem("tile1TextColor");
        this.setTile1TextColorFromHex(tile1TextColorValue || this.tile1TextColor());
        const tile2TextColorValue = localStorage.getItem("tile2TextColor");
        this.setTile2TextColorFromHex(tile2TextColorValue || this.tile2TextColor());
        const tile3TextColorValue = localStorage.getItem("tile3TextColor");
        this.setTile3TextColorFromHex(tile3TextColorValue || this.tile3TextColor());
    }

    // Initialize Region Name Settings from Local Storage
    private initializeRegionNameSettingsFromLocalStorage(): void {
        // Load matchRegionNameColors
        const matchRegionNameColorsValue = localStorage.getItem("matchRegionNameColors");
        this.matchRegionNameColors.set(matchRegionNameColorsValue === 'true');
        localStorage.setItem("matchRegionNameColors", this.matchRegionNameColors().toString());

        if (this.matchRegionNameColors()) {
            // Load matched region name color
            const matchedRegionNameColorValue = localStorage.getItem("matchedRegionNameColor");
            this.matchedRegionNameColor.set(matchedRegionNameColorValue || this.matchedRegionNameColor());
            localStorage.setItem("matchedRegionNameColor", this.matchedRegionNameColor());
        }

        // Load region name background color
        const regionNameBackgroundColorValue = localStorage.getItem("regionNameBackgroundColor");
        this.regionNameBackgroundColor.set(regionNameBackgroundColorValue || this.color_white);
        localStorage.setItem("regionNameBackgroundColor", this.regionNameBackgroundColor());

        // Load region name outline color
        const regionNameOutlineColorValue = localStorage.getItem("regionNameOutlineColor");
        this.regionNameOutlineColor.set(regionNameOutlineColorValue || this.regionNameOutlineColor());
        localStorage.setItem("regionNameOutlineColor", this.regionNameOutlineColor());

        // Initialize region name color CSS variables
        this.setRegionNameColorFromHex(this.regionNameBackgroundColor());

        // Initialize region name outline color CSS variables
        this.setRegionNameOutlineColorFromHex(this.regionNameOutlineColor());

        // Load transparency
        const regionNameTransparencyValue = localStorage.getItem("regionNameTransparency");
        this.updateRegionNameTransparency({target: {valueAsNumber: Number(regionNameTransparencyValue || 0)}});

        // Load blur
        const regionNameBlurValue = localStorage.getItem("regionNameBlur");
        this.updateRegionNameBlur({target: {valueAsNumber: Number(regionNameBlurValue || 0)}});

        // Load outline
        const regionNameOutlineValue = localStorage.getItem("regionNameOutline");
        this.updateRegionNameOutline({target: {valueAsNumber: Number(regionNameOutlineValue || 1)}});

        // Load font family
        const regionNameFontValue = localStorage.getItem("regionNameTextFontFamily");
        this.updateRegionNameTextFont(regionNameFontValue || 'Roboto, sans-serif');

        // Load region name text color
        const regionNameTextColorValue = localStorage.getItem("regionNameTextColor");
        this.regionNameTextColor.set(regionNameTextColorValue || this.regionNameTextColor());
        this.setRegionNameTextColorFromHex(this.regionNameTextColor());
        localStorage.setItem("regionNameTextColor", this.regionNameTextColor());
    }

    // Initialize Copyright Text
    private initializeCopyrightText(): void {
        const currentYear = new Date().getFullYear().toString();
        (currentYear === this.copyrightText())
            ? this.copyrightText.set(`© ${this.copyrightText()}`)
            : this.copyrightText.set(`© ${this.copyrightText()} - ${currentYear}`);
    }

    private setTile1MatchedColorProperties(hex: string): void {
        this.tile1BackgroundColor.set(this.matchedTileColor());
        this.tile1OutlineColor.set(this.matchedTileColor());
        this.setTile1BackgroundColorFromHex(hex)
        this.setTile1OutlineColorFromHex(hex)
        localStorage.setItem("tile1BackgroundColor", this.tile1BackgroundColor());
        localStorage.setItem("tile1OutlineColor", this.tile1OutlineColor());
    }

    private setTile2MatchedColorProperties(hex: string): void {
        this.tile2BackgroundColor.set(this.matchedTileColor());
        this.tile2OutlineColor.set(this.matchedTileColor());
        this.setTile2BackgroundColorFromHex(hex)
        this.setTile2OutlineColorFromHex(hex)
        localStorage.setItem("tile2BackgroundColor", this.tile2BackgroundColor());
        localStorage.setItem("tile2OutlineColor", this.tile2OutlineColor());
    }

    private setTile3MatchedColorProperties(hex: string): void {
        this.tile3BackgroundColor.set(this.matchedTileColor());
        this.tile3OutlineColor.set(this.matchedTileColor());
        this.setTile3BackgroundColorFromHex(hex)
        this.setTile3OutlineColorFromHex(hex)
        localStorage.setItem("tile3BackgroundColor", this.tile3BackgroundColor());
        localStorage.setItem("tile3OutlineColor", this.tile3OutlineColor());
    }

    // Set Tile 1 Background Transparency
    private setTile1BackgroundTransparency(value: number) {
        this.tile1Transparency.set(value)
        this.matchedTileShade.set(this.tile1Transparency())
        document.documentElement.style.setProperty('--tile1-transparency', value.toString());
        localStorage.setItem("tile1Transparency", value.toString());
    }

    // Set Tile 3 Background Transparency
    private setTile2BackgroundTransparency(value: number) {
        this.tile2Transparency.set(value)
        this.matchedTileShade.set(this.tile2Transparency())
        document.documentElement.style.setProperty('--tile2-transparency', value.toString());
        localStorage.setItem("tile2Transparency", value.toString());
    }

    // Set Tile 3 Background Transparency
    private setTile3BackgroundTransparency(value: number) {
        this.tile3Transparency.set(value)
        this.matchedTileShade.set(this.tile3Transparency())
        document.documentElement.style.setProperty('--tile3-transparency', value.toString());
        localStorage.setItem("tile3Transparency", value.toString());
    }

    // Set Tile Color Variables
    private setTile1BackgroundColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile1-red-color', colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--tile1-green-color', colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--tile1-blue-color', colors.color.rgb.b.toString());
    }
    // Set Tile 1 Background Color From Hex (initialization)
    private setTile1BackgroundColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile1-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile1-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile1-blue-color', rgb.b.toString());
        }
    }

    // Set Tile Color Variables
    private setTile2BackgroundColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile2-red-color', colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--tile2-green-color', colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--tile2-blue-color', colors.color.rgb.b.toString());
    }
    // Set Tile 2 Background Color From Hex (initialization)
    private setTile2BackgroundColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile2-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile2-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile2-blue-color', rgb.b.toString());
        }
    }

    // Set Tile Color Variables
    private setTile3BackgroundColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile3-red-color', colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--tile3-green-color', colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--tile3-blue-color', colors.color.rgb.b.toString());
    }
    // Set Tile 3 Background Color From Hex (initialization)
    private setTile3BackgroundColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile3-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile3-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile3-blue-color', rgb.b.toString());
        }
    }

    // Set Matched Tile Color
    private setMatchedTileColor(colors: ColorEvent) {
        this.matchedTileColor.set(colors.color.hex);
    }

    // Set Tile 1 Outline
    private setTile1Outline(value: number) {
        this.tile1Outline.set(value);
        this.matchedTileShade.set(this.tile1Outline())
        document.documentElement.style.setProperty('--tile1-outline', value.toString());
        localStorage.setItem("tile1Outline", value.toString());
    }

    // Set Tile 1 Outline
    private setTile2Outline(value: number) {
        this.tile2Outline.set(value);
        this.matchedTileShade.set(this.tile2Outline())
        document.documentElement.style.setProperty('--tile2-outline', value.toString());
        localStorage.setItem("tile2Outline", value.toString());
    }

    // Set Tile 1 Outline
    private setTile3Outline(value: number) {
        this.tile3Outline.set(value);
        this.matchedTileShade.set(this.tile3Outline())
        document.documentElement.style.setProperty('--tile3-outline', value.toString());
        localStorage.setItem("tile3Outline", value.toString());
    }

    private setTile1Blur(value: number) {
        this.tile1Blur.set(value);
        document.documentElement.style.setProperty('--tile1-backdrop-filter',
            `blur(${value}px)`);
        document.documentElement.style.setProperty('--tile1-webkit-backdrop-filter',
            `blur(${value}px)`);
        localStorage.setItem("tile1Blur", value.toString());
    }

    private setTile2Blur(value: number) {
        this.tile2Blur.set(value);
        document.documentElement.style.setProperty('--tile2-backdrop-filter',
            `blur(${value}px)`);
        document.documentElement.style.setProperty('--tile2-webkit-backdrop-filter',
            `blur(${value}px)`);
        localStorage.setItem("tile2Blur", value.toString());
    }

    private setTile3Blur(value: number) {
        this.tile3Blur.set(value);
        document.documentElement.style.setProperty('--tile3-backdrop-filter',
            `blur(${value}px)`);
        document.documentElement.style.setProperty('--tile3-webkit-backdrop-filter',
            `blur(${value}px)`);
        localStorage.setItem("tile3Blur", value.toString());
    }

    // Set Tile Outline Color Variables
    private setTile1OutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile1-outline-red-color', colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--tile1-outline-green-color', colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--tile1-outline-blue-color', colors.color.rgb.b.toString());
    }

    // Set Tile Outline Color Variables
    private setTile2OutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile2-outline-red-color', colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--tile2-outline-green-color', colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--tile2-outline-blue-color', colors.color.rgb.b.toString());
    }

    // Set Tile Outline Color Variables
    private setTile3OutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--tile3-outline-red-color', colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--tile3-outline-green-color', colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--tile3-outline-blue-color', colors.color.rgb.b.toString());
    }

    // Set Tile Outline Color From Hex (initialization)
    private setTile1OutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile1-outline-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile1-outline-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile1-outline-blue-color', rgb.b.toString());
        }
    }

    // Set Tile Outline Color From Hex (initialization)
    private setTile2OutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile2-outline-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile2-outline-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile2-outline-blue-color', rgb.b.toString());
        }
    }

    // Set Tile Outline Color From Hex (initialization)
    private setTile3OutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile3-outline-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile3-outline-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile3-outline-blue-color', rgb.b.toString());
        }
    }

    // Set Tile Color Variables
    private setTileTextColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-tile-text-color', colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-tile-text-color', colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-tile-text-color', colors.color.rgb.b.toString());
    }

    // Set Tile 1 Text Color From Hex (initialization)
    private setTile1TextColorFromHex(hex: string) {
        this.tile1TextColor.set(hex);
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile1-text-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile1-text-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile1-text-blue-color', rgb.b.toString());
        }
        localStorage.setItem("tile1TextColor", this.tile1TextColor());
    }

    // Set Tile 2 Text Color From Hex (initialization)
    private setTile2TextColorFromHex(hex: string) {
        this.tile2TextColor.set(hex);
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile2-text-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile2-text-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile2-text-blue-color', rgb.b.toString());
        }
        localStorage.setItem("tile2TextColor", this.tile2TextColor());
    }

    // Set Tile 3 Text Color From Hex (initialization)
    private setTile3TextColorFromHex(hex: string) {
        this.tile3TextColor.set(hex);
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--tile3-text-red-color', rgb.r.toString());
            document.documentElement.style.setProperty('--tile3-text-green-color', rgb.g.toString());
            document.documentElement.style.setProperty('--tile3-text-blue-color', rgb.b.toString());
        }
        localStorage.setItem("tile3TextColor", this.tile3TextColor());
    }

    // Set Region Name Background Color Variables
    private setRegionNameBackgroundColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-region-name-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-region-name-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-region-name-color',
            colors.color.rgb.b.toString());
    }

    // Set Matched Region Name Color
    private setMatchedRegionNameColor(colors: ColorEvent) {
        this.matchedRegionNameColor.set(colors.color.hex);
    }

    // Set Region Name Color From Hex (initialization)
    private setRegionNameColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--red-region-name-color', rgb.r.toString());
            document.documentElement.style.setProperty('--green-region-name-color', rgb.g.toString());
            document.documentElement.style.setProperty('--blue-region-name-color', rgb.b.toString());
        }
    }

    // Set Tile Outline Color Variables
    private setRegionNameOutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-region-name-outline-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-region-name-outline-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-region-name-outline-color',
            colors.color.rgb.b.toString());
    }

    // Set Region Name Outline Color From Hex (initialization)
    private setRegionNameOutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--red-region-name-outline-color', rgb.r.toString());
            document.documentElement.style.setProperty('--green-region-name-outline-color', rgb.g.toString());
            document.documentElement.style.setProperty('--blue-region-name-outline-color', rgb.b.toString());
        }
    }

    // Set Region Name Color Variables
    private setRegionNameTextColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-region-name-text-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-region-name-text-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-region-name-text-color',
            colors.color.rgb.b.toString());
    }

    // Set Region Name Text Color From Hex (initialization)
    private setRegionNameTextColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        console.debug("region name text color, red: " + rgb?.r.toString());
        console.debug("region name text color, green: " + rgb?.g.toString());
        console.debug("region name text color, blue: " + rgb?.b.toString());
        if (rgb) {
            document.documentElement.style.setProperty('--red-region-name-text-color', rgb.r.toString());
            document.documentElement.style.setProperty('--green-region-name-text-color', rgb.g.toString());
            document.documentElement.style.setProperty('--blue-region-name-text-color', rgb.b.toString());
        }
    }

    // Helper methods to set CSS variables from hex color strings
    private hexToRgb(hex: string): { r: number, g: number, b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Helper method to determine if All Tiles are selected
    private allTilesSelected(): boolean {
        return this.tile1SettingsButtonIcon() === this.icon_check_box &&
            this.tile2SettingsButtonIcon() === this.icon_check_box &&
            this.tile3SettingsButtonIcon() === this.icon_check_box;
    }

    private someTilesSelected(): boolean {
        return this.tile1SettingsButtonIcon() === this.icon_check_box ||
            this.tile2SettingsButtonIcon() === this.icon_check_box ||
            this.tile3SettingsButtonIcon() === this.icon_check_box;
    }
}

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
    protected readonly title = signal('My Pokédex'); // &#233; é
    protected readonly copyrightText = signal('2026');
    protected currentIcon = signal(this.icon_info);
    protected regionColor = signal('white');
    // tile specific settings
    protected matchTileColors = signal(false);
    protected matchedTileColor = signal('');
    protected tileColor = signal('');
    protected tileOutlineColor = signal('');
    protected tileTransparency = signal(0);
    protected tileBlur = signal(0);
    protected tileOutline = signal(1);
    protected tileTextFontFamily = signal('Roboto, sans-serif');
    protected tileTextColor = signal('black');
    // region name specific settings
    protected matchRegionNameColors = signal(false);
    protected matchedRegionNameColor = signal('');
    protected regionNameOutlineColor = signal('');
    protected regionNameTransparency = signal(0);
    protected regionNameBlur = signal(0);
    protected regionNameOutline = signal(1);
    protected regionNameTextFontFamily = signal('Roboto, sans-serif');
    protected regionNameTextColor = signal('black');
    protected readonly panelTileSettingsOpenState = signal(false);
    protected readonly panelRegionNameSettingsOpenState = signal(false);
    private readonly regionsInfoMap: { [key: string]: string[] } = {
        'Kanto': ['1kantoMap.png', '#C0C0C0'],
        'Johto': ['2johtoMap.png', '#C0C0C0'],
        'Hoenn': ['3hoennMap.png', '#C0C0C0'],
        'Sinnoh': ['41sinnohMap.png', '#C0C0C0'],
        'Ancient Sinnoh': ['42hisuiSinnohMap.png', '#FFDEAD'],
        'Unova': ['5unovaMap.png', '#C0C0C0'],
        'Kalos': ['6kalosMap.png', '#C0C0C0'],
        'Alola': ['7alolaMap.png', '#C0C0C0'],
        'Galar': ['8galarMap.png', '#C0C0C0'],
        'Paldea': ['9paldeaMap.png', '#C0C0C0']
    };
    protected backgroundImage = signal(Object.values(this.regionsInfoMap)[0][0]);
    protected regionName = signal(Object.values(this.regionsInfoMap)[0][1]);

    // Component  constructor
    constructor(private cdr: ChangeDetectorRef) {
        this.toggleBackground();
    }

    // Runs once when the component is initialized
    ngOnInit(): void {
        // Initialize settings from local storage. this ensures a consistent experience for users
        this.initializeTileSettingsFromLocalStorage();
        this.initializeRegionNameSettingsFromLocalStorage();
        this.initializeCopyrightText();
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
        const randomIndex = Math.floor(Math.random() * Object.entries(this.regionsInfoMap).length);
        const entry = Object.entries(this.regionsInfoMap)[randomIndex];
        const regionNameKey = entry[0];
        const image = entry[1][0];
        const color = entry[1][1];
        this.backgroundImage.set(image);
        this.regionName.set(regionNameKey);
        this.regionColor.set(color);
    }

    // Get the background image URL as a CSS url() string
    getBackgroundImageUrl(): string {
        return `url('${this.backgroundImage()}')`;
    }

    // Initialize Copyright Text
    private initializeCopyrightText(): void {
        const currentYear = new Date().getFullYear().toString();
        (currentYear === this.copyrightText())
            ? this.copyrightText.set(`© ${this.copyrightText()}`)
            : this.copyrightText.set(`© ${this.copyrightText()} - ${currentYear}`);
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

    // Update Match Tile Colors Checkbox
    updateMatchTileColors(checked: boolean) {
        this.matchTileColors.set(checked);
        localStorage.setItem("matchTileColors", checked.toString());
        this.cdr.detectChanges();
    }

    // Update Tile Color
    updateTileColorVariables(colors: ColorEvent) {
        this.setTileColorVariables(colors);
        this.tileColor.set(colors.color.hex);
        if (this.matchTileColors()) {
            this.setTileOutlineColorVariables(colors);
            this.setMatchedTileColor(colors);
            this.tileOutlineColor.set(colors.color.hex);
        }
        this.cdr.detectChanges();
        localStorage.setItem("matchedTileColor", this.matchedTileColor());
        localStorage.setItem("matchTileColors", this.matchTileColors().toString());
        localStorage.setItem("tileColor", this.tileColor());
        localStorage.setItem("tileOutlineColor", this.tileOutlineColor());
    }

    // =========== Tile Settings Methods =========== //

    // Update Tile Transparency
    updateTileTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--tile-transparency',
            value.toString());
        this.tileTransparency.set(value);
        this.cdr.detectChanges();
        localStorage.setItem("tileTransparency", value.toString());
    }

    // Update Tile Blur
    updateTileBlur(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--tile-backdrop-filter',
            `blur(${value}px)`);
        document.documentElement.style.setProperty('--tile-webkit-backdrop-filter',
            `blur(${value}px)`);
        this.tileBlur.set(value);
        this.cdr.detectChanges();
        localStorage.setItem("tileBlur", value.toString());
    }

    // Update Tile Outline
    updateTileOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--tile-border',
            value.toString());
        this.tileOutline.set(value);
        this.cdr.detectChanges();
        localStorage.setItem("tileOutline", value.toString());
    }

    // Update Tile Outline Color
    updateTileBorderColorVariables(colors: ColorEvent) {
        this.setTileOutlineColorVariables(colors);
        this.tileOutlineColor.set(colors.color.hex);
        if (this.matchTileColors()) {
            this.setTileColorVariables(colors);
            this.setMatchedTileColor(colors);
            this.tileColor.set(colors.color.hex);
        }
        this.cdr.detectChanges();
        localStorage.setItem("matchTileColors", this.matchTileColors().toString());
        localStorage.setItem("matchedTileColor", this.matchedTileColor());
        localStorage.setItem("tileOutlineColor", this.tileOutlineColor());
        localStorage.setItem("tileColor", this.tileColor());
    }

    // Update Tile Text Font
    updateTileTextFont(font: string) {
        document.documentElement.style.setProperty('--tile-text-font-family', font);
        this.tileTextFontFamily.set(font)
        this.cdr.detectChanges();
        localStorage.setItem("tileTextFontFamily", font);
    }

    // Update Tile Text Color
    updateTileTextColorVariables(colors: ColorEvent) {
        this.setTileTextColorVariables(colors);
        this.cdr.detectChanges();
        this.tileTextColor.set(colors.color.hex);
        localStorage.setItem("tileTextColor", this.tileTextColor());
    }

    // Update Match Region Name Colors Checkbox
    updateMatchRegionNameColors(checked: boolean) {
        this.matchRegionNameColors.set(checked);
        localStorage.setItem("matchRegionNameColors", checked.toString());
        this.cdr.detectChanges();
    }

    // Update Region Name Color
    updateRegionNameColorVariables(colors: ColorEvent) {
        this.setRegionNameColorVariables(colors);
        if (this.matchRegionNameColors()) {
            this.setRegionNameOutlineColorVariables(colors);
            this.setMatchedRegionNameColor(colors);
            this.regionNameOutlineColor.set(colors.color.hex);
        }
        this.cdr.detectChanges();
        localStorage.setItem("matchRegionNameColors", this.matchRegionNameColors().toString());
        localStorage.setItem("matchedRegionNameColor", this.matchedRegionNameColor());
        localStorage.setItem("regionNameOutlineColor", this.regionNameOutlineColor());
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
        document.documentElement.style.setProperty('--region-name-border',
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
            this.setRegionNameColorVariables(colors);
            this.setMatchedRegionNameColor(colors);
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
    }

    // Initialize Tile Settings from Local Storage
    private initializeTileSettingsFromLocalStorage(): void {
        // Load matchTileColors
        const matchTileColorsValue = localStorage.getItem("matchTileColors");
        this.matchTileColors.set(matchTileColorsValue === 'true');

        // Load matched tile color
        const matchedTileColorValue = localStorage.getItem("matchedTileColor");
        this.matchedTileColor.set(matchedTileColorValue || '#ffffff');

        // Load tile color
        const tileColorValue = localStorage.getItem("tileColor");
        this.tileColor.set(tileColorValue || this.matchedTileColor());

        // Load tile outline color
        const tileOutlineColorValue = localStorage.getItem("tileOutlineColor");
        this.tileOutlineColor.set(tileOutlineColorValue || '#ffffff');

        // Initialize tile color CSS variables
        const tileColorToUse = this.tileColor();
        if (tileColorToUse) {
            this.setTileColorFromHex(tileColorToUse);
        }

        // Initialize tile outline color CSS variables
        const outlineColorToUse = this.tileOutlineColor();
        if (outlineColorToUse) {
            this.setTileOutlineColorFromHex(outlineColorToUse);
        }

        // Load transparency
        const tileTransparencyValue = localStorage.getItem("tileTransparency");
        this.updateTileTransparency({target: {valueAsNumber: Number(tileTransparencyValue || 0)}});

        // Load blur
        const tileBlurValue = localStorage.getItem("tileBlur");
        this.updateTileBlur({target: {valueAsNumber: Number(tileBlurValue || 0)}});

        // Load outline
        const tileOutlineValue = localStorage.getItem("tileOutline");
        this.updateTileOutline({target: {valueAsNumber: Number(tileOutlineValue || 1)}});

        // Load font family
        const tileFontValue = localStorage.getItem("tileTextFontFamily");
        this.updateTileTextFont(tileFontValue || 'Roboto, sans-serif');

        // Load text color
        const tileTextColorValue = localStorage.getItem("tileTextColor");
        this.tileTextColor.set(tileTextColorValue || '#000000');
        if (tileTextColorValue) {
            this.setTileTextColorFromHex(tileTextColorValue);
        }
    }

    // =========== Region Name Settings Methods =========== //

    // Initialize Region Name Settings from Local Storage
    private initializeRegionNameSettingsFromLocalStorage(): void {
        // Load matchRegionNameColors
        const matchRegionNameColorsValue = localStorage.getItem("matchRegionNameColors");
        this.matchRegionNameColors.set(matchRegionNameColorsValue === 'true');

        // Load matched region name color
        const matchedRegionNameColorValue = localStorage.getItem("matchedRegionNameColor");
        this.matchedRegionNameColor.set(matchedRegionNameColorValue || '#ffffff');

        // Load region name outline color
        const regionNameOutlineColorValue = localStorage.getItem("regionNameOutlineColor");
        this.regionNameOutlineColor.set(regionNameOutlineColorValue || '#ffffff');

        // Initialize region name color CSS variables
        const regionNameColorToUse = this.matchedRegionNameColor();
        if (regionNameColorToUse) {
            this.setRegionNameColorFromHex(regionNameColorToUse);
        }

        // Initialize region name outline color CSS variables
        const outlineColorToUse = this.regionNameOutlineColor();
        if (outlineColorToUse) {
            this.setRegionNameOutlineColorFromHex(outlineColorToUse);
        }

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

        // Load text color
        const regionNameTextColorValue = localStorage.getItem("regionNameTextColor");
        this.regionNameTextColor.set(regionNameTextColorValue || '#000000');
        if (regionNameTextColorValue) {
            this.setRegionNameTextColorFromHex(regionNameTextColorValue);
        }
    }

    // Set Tile Color Variables
    private setTileColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-tile-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-tile-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-tile-color',
            colors.color.rgb.b.toString());
    }

    // Set Matched Tile Color
    private setMatchedTileColor(colors: ColorEvent) {
        this.matchedTileColor.set(colors.color.hex);
    }

    // Set Tile Color From Hex (initialization)
    private setTileColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--red-tile-color', rgb.r.toString());
            document.documentElement.style.setProperty('--green-tile-color', rgb.g.toString());
            document.documentElement.style.setProperty('--blue-tile-color', rgb.b.toString());
        }
    }

    // Set Tile Outline Color Variables
    private setTileOutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-tile-border-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-tile-border-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-tile-border-color',
            colors.color.rgb.b.toString());
    }

    // Set Tile Outline Color From Hex (initialization)
    private setTileOutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--red-tile-border-color', rgb.r.toString());
            document.documentElement.style.setProperty('--green-tile-border-color', rgb.g.toString());
            document.documentElement.style.setProperty('--blue-tile-border-color', rgb.b.toString());
        }
    }

    // Set Tile Color Variables
    private setTileTextColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-tile-text-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-tile-text-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-tile-text-color',
            colors.color.rgb.b.toString());
    }

    // Set Tile Text Color From Hex (initialization)
    private setTileTextColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--red-tile-text-color', rgb.r.toString());
            document.documentElement.style.setProperty('--green-tile-text-color', rgb.g.toString());
            document.documentElement.style.setProperty('--blue-tile-text-color', rgb.b.toString());
        }
    }

    // Set Region Name Color Variables
    private setRegionNameColorVariables(colors: ColorEvent) {
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

    // Set Tile Border Color Variables
    private setRegionNameOutlineColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-region-name-border-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-region-name-border-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-region-name-border-color',
            colors.color.rgb.b.toString());
    }

    // Set Region Name Outline Color From Hex (initialization)
    private setRegionNameOutlineColorFromHex(hex: string) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            document.documentElement.style.setProperty('--red-region-name-border-color', rgb.r.toString());
            document.documentElement.style.setProperty('--green-region-name-border-color', rgb.g.toString());
            document.documentElement.style.setProperty('--blue-region-name-border-color', rgb.b.toString());
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

}

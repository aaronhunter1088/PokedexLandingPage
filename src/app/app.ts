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
    // icons in use
    protected readonly icon_info = 'info';
    protected readonly icon_replay = 'replay';
    protected readonly icon_shuffle = 'shuffle';
    private readonly regionsInfoMap: { [key: string]: string[] } = {
        'Kanto': ['1kantoMap.png', '#C0C0C0'],
        'Johto': ['2johtoMap.png', '#C0C0C0'],
        'Hoenn': ['3hoennMap.png', '#C0C0C0'],
        'Sinnoh': ['41sinnohMap.png', '#C0C0C0'],
        'Ancient Sinnoh': ['42hisuiSinnohMap.png', '#FFDEAD'],
        'Unova': ['5unovaMap.png', '#C0C0C0'],
        'Kalos': ['6kalosMap.png', '#C0C0C0'],
        'Alola': ['7alolaMap.png', '#C0C0C0'],
        'Galar': ['8galarMap.png','#C0C0C0'],
        'Paldea': ['9paldeaMap.png', '#C0C0C0']
    };

    protected readonly title = signal('My Pokédex'); // &#233; é
    protected currentIcon = signal(this.icon_info);
    protected backgroundImage = signal(Object.values(this.regionsInfoMap)[0][0]);
    protected regionName = signal(Object.values(this.regionsInfoMap)[0][1]);
    protected regionColor = signal('white');//signal(Object.values(this.regionsInfoMap)[0][2]);
    protected tileTransparency = signal(0);
    protected regionNameTransparency = signal(0);
    protected tileBlur = signal(0);
    protected regionNameBlur = signal(0);
    protected tileOutline = signal(1);
    protected regionNameOutline = signal(1);
    protected matchTileColors = signal(false);
    protected matchRegionNameColors = signal(false);
    protected matchedTileColor = signal('');
    protected matchedRegionNameColor = signal('');
    protected tileTextFontFamily = signal('Roboto, sans-serif');
    protected regionNameTextFontFamily = signal('Roboto, sans-serif');
    protected readonly panelTileSettingsOpenState = signal(false);
    protected readonly panelRegionNameSettingsOpenState = signal(false);
    // obtain reference to the element #sidenav
    @ViewChild('sidenav') sidenav!: MatSidenav;
    // obtain reference to the element #tileAccordian
    @ViewChild('tileAccordian') tileAccordian!: MatExpansionPanel;
    // obtain reference to the element #regionNameAccordian
    @ViewChild('regionNameAccordian') regionNameAccordian!: MatExpansionPanel;
    // obtain reference to the element #aboutAccordian
    @ViewChild('aboutAccordian') aboutAccordian!: MatExpansionPanel;

    constructor(private cdr: ChangeDetectorRef) {
        this.toggleBackground();
    }

    ngOnInit(): void {
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
    protected getBackgroundImageUrl(): string {
        return `url('${this.backgroundImage()}')`;
    }

    // Update the info/replay icon
    updateIcon(): void {
        this.sidenav.toggle();
        if (this.currentIcon() === this.icon_info) {
            this.currentIcon.set(this.icon_replay);

        } else {
            this.currentIcon.set(this.icon_info);
        }

    }

    // Update Tile Transparency
    updateTileTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--tile-transparency',
            value.toString());
        this.tileTransparency.set(value);
        this.cdr.detectChanges();
    }

    // Update Region Name Transparency
    updateRegionNameTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--region-name-transparency',
            value.toString());
        this.regionNameTransparency.set(value);
        this.cdr.detectChanges();
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
    }

    // Update Tile Outline
    updateTileOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--tile-border',
            value.toString());
        this.tileOutline.set(value);
        this.cdr.detectChanges();
    }

    // Update Region Name Outline
    updateRegionNameOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--region-name-border',
            value.toString());
        this.regionNameOutline.set(value);
        this.cdr.detectChanges();
    }

    // Update Tile Color
    updateTileColorVariables(colors: ColorEvent) {
        this.setTileColorVariables(colors);
        if (this.matchTileColors()) {
            this.setTileBorderColorVariables(colors);
            this.setMatchedTileColor(colors);
        }
        this.cdr.detectChanges();
    }

    // Update Region Name Color
    updateRegionNameColorVariables(colors: ColorEvent) {
        this.setRegionNameColorVariables(colors);
        if (this.matchRegionNameColors()) {
            this.setRegionNameBorderColorVariables(colors);
            this.setMatchedRegionNameColor(colors);
        }
        this.cdr.detectChanges();
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

    // Set Region Name Color Variables
    private setRegionNameColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-region-name-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-region-name-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-region-name-color',
            colors.color.rgb.b.toString());
    }

    // Update Tile Border Color
    updateTileBorderColorVariables(colors: ColorEvent) {
        this.setTileBorderColorVariables(colors);
        if (this.matchTileColors()) {
            this.setTileColorVariables(colors);
            this.setMatchedTileColor(colors);
        }
        this.cdr.detectChanges();
    }

    // Set Tile Border Color Variables
    private setTileBorderColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-tile-border-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-tile-border-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-tile-border-color',
            colors.color.rgb.b.toString());
    }

    // Update Region Name Border Color
    updateRegionNameBorderColorVariables(colors: ColorEvent) {
        this.setRegionNameBorderColorVariables(colors);
        if (this.matchRegionNameColors()) {
            this.setRegionNameColorVariables(colors);
            this.setMatchedRegionNameColor(colors);
        }
        this.cdr.detectChanges();
    }

    // Set Tile Border Color Variables
    private setRegionNameBorderColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-region-name-border-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-region-name-border-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-region-name-border-color',
            colors.color.rgb.b.toString());
    }

    // Set Matched Tile Color
    private setMatchedTileColor(colors: ColorEvent) {
        this.matchedTileColor.set(colors.color.hex);
    }

    // Set Matched Region Name Color
    private setMatchedRegionNameColor(colors: ColorEvent) {
        this.matchedRegionNameColor.set(colors.color.hex);
    }

    // Update Tile Text Font
    updateTileTextFont(font: string) {
        document.documentElement.style.setProperty('--tile-text-font-family', font);
        this.tileTextFontFamily.set(font)
        this.cdr.detectChanges();
    }

    // Update Tile Text Font
    updateRegionNameTextFont(font: string) {
        document.documentElement.style.setProperty('--region-name-text-font-family', font);
        this.regionNameTextFontFamily.set(font)
        this.cdr.detectChanges();
    }

    // Update Tile Text Color
    updateTileTextColorVariables(colors: ColorEvent) {
        this.setTileTextColorVariables(colors);
        this.cdr.detectChanges();
    }

    // Update Region Name Text Color
    updateRegionNameTextColorVariables(colors: ColorEvent) {
        this.setRegionNameTextColorVariables(colors);
        this.cdr.detectChanges();
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

    // Set Region Name Color Variables
    private setRegionNameTextColorVariables(colors: ColorEvent) {
        document.documentElement.style.setProperty('--red-region-name-text-color',
            colors.color.rgb.r.toString());
        document.documentElement.style.setProperty('--green-region-name-text-color',
            colors.color.rgb.g.toString());
        document.documentElement.style.setProperty('--blue-region-name-text-color',
            colors.color.rgb.b.toString());
    }
}

import {ChangeDetectorRef, Component, signal, ViewChild} from '@angular/core';
import {ColorEvent} from 'ngx-color';
import {ColorCompactModule} from "ngx-color/compact";
import {MaterialModule} from "./materialModule";
import {MatSidenav} from "@angular/material/sidenav";
import {Tiles} from "../tiles/tiles";

@Component({
    selector: 'app-root',
    imports: [MaterialModule, Tiles, ColorCompactModule,],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
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
    protected regionColor = signal(Object.values(this.regionsInfoMap)[0][2]);
    protected transparency = signal(0);
    protected blur = signal(0);
    protected outline = signal(1);
    protected matchColors = signal(false);
    protected matchedColor = signal('');
    protected tileTextFontFamily = signal('Roboto, sans-serif');
    // obtain reference to the element #sidenav
    @ViewChild('sidenav') sidenav!: MatSidenav;

    constructor(private cdr: ChangeDetectorRef) {
        this.toggleBackground();
    }

    ngOnInit(): void {
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

    // Update Transparency
    updateTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--glass-transparency',
            value.toString());
        this.transparency.set(value);
        this.cdr.detectChanges();
    }

    // Update Blur
    updateBlur(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--backdrop-filter',
            `blur(${value}px)`);
        document.documentElement.style.setProperty('--webkit-backdrop-filter',
            `blur(${value}px)`);
        this.blur.set(value);
        this.cdr.detectChanges();
    }

    // Update Outline
    updateOutline(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--tile-border',
            value.toString());
        this.outline.set(value);
        this.cdr.detectChanges();
    }

    // Update Tile Color
    updateTileColorVariables(colors: ColorEvent) {
        this.setTileColorVariables(colors);
        if (this.matchColors()) {
            this.setTileBorderColorVariables(colors);
            this.setMatchedColor(colors);
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

    // Update Tile Border Color
    updateTileBorderColorVariables(colors: ColorEvent) {
        this.setTileBorderColorVariables(colors);
        if (this.matchColors()) {
            this.setTileColorVariables(colors);
            this.setMatchedColor(colors);
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

    // Set Matched Color
    private setMatchedColor(colors: ColorEvent) {
        this.matchedColor.set(colors.color.hex);
    }

    // Update Tile Text Font
    updateTileTextFont(font: string) {
        document.documentElement.style.setProperty('--tile-text-font-family', font);
        this.tileTextFontFamily.set(font)
        this.cdr.detectChanges();
    }

    // Update Tile Text Color
    updateTileTextColorVariables(colors: ColorEvent) {
        this.setTileTextColorVariables(colors);
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
}

import {ChangeDetectorRef, Component, signal} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {MaterialModule} from "./materialModule";
import { ColorEvent } from 'ngx-color';
import {ColorSketchModule} from "ngx-color/sketch";
import {Tiles} from "../tiles/tiles";

@Component({
    selector: 'app-root',
    imports: [MaterialModule, ColorSketchModule, Tiles,],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
})
export class App {

    currentRoute: string;
    previousRoute: string;
    transparencySlider: number = 0;
    blurSlider: number = 0;
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

    protected readonly title = signal('PokedexLandingPage');
    protected readonly currentIcon = signal(this.icon_info);
    protected readonly backgroundImage = signal(Object.values(this.regionsInfoMap)[0][0]);
    protected readonly regionName = signal(Object.values(this.regionsInfoMap)[0][1]);
    protected readonly regionColor = signal(Object.values(this.regionsInfoMap)[0][2]);

    constructor(private router: Router, private cdr: ChangeDetectorRef) {
        this.currentRoute = this.router.url;
        this.previousRoute = "";
        this.updateIcon();
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                // Show loading indicator
                this.previousRoute = this.currentRoute;
                //console.log("Route change detected. previousRoute: ", this.previousRoute);
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
                this.currentRoute = event.url;
                this.updateIcon();
                //console.log("currentRoute: ", event.url);
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator

                // Present error to user
                console.log(event.error);
            }
        });
        this.toggleBackground();
    }

    ngOnInit(): void {
    }

    ngOnChanges() {
    }

    toggleRoute(): void {
    }

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

    protected getBackgroundImageUrl(): string {
        return `url('${this.backgroundImage()}')`;
    }

    private updateIcon(): void {
        if (this.currentRoute.includes('/info')) {
            this.currentIcon.set(this.icon_replay);
        } else {
            this.currentIcon.set(this.icon_info);
        }
    }

    handleChange($event: ColorEvent) {
        console.log($event.color);
    }

    updateTransparency(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--glass-transparency',
            value.toString());
        this.cdr.detectChanges();
    }

    updateBlur(value: any) {
        value = (value.target as HTMLInputElement).valueAsNumber;
        document.documentElement.style.setProperty('--backdrop-filter',
            `blur(${value}px)`);
        document.documentElement.style.setProperty('--webkit-backdrop-filter',
            `blur(${value}px)`);
        // --backdrop-filter: blur(0);
        // --webkit-backdrop-filter: blur(0);
        this.cdr.detectChanges();
    }

}

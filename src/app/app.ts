import {Component, signal} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {MaterialModule} from "./materialModule";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MaterialModule],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
})
export class App {

    currentRoute: string;
    previousRoute: string;
    // icons in use
    protected readonly icon_info = 'info';
    protected readonly icon_replay = 'replay';
    protected readonly icon_shuffle = 'shuffle';

    private readonly regionsInfoMap: { [key: string]: string[] } = {
        'Kanto': ['1kantoMap.png', 'Kanto', '#C0C0C0'],
        'Johto': ['2johtoMap.png', 'Johto', '#C0C0C0'],
        'Hoenn': ['3hoennMap.png', 'Hoenn', '#C0C0C0'],
        'Sinnoh': ['41sinnohMap.png', 'Sinnoh', '#C0C0C0'],
        'Ancient Sinnoh': ['42hisuiSinnohMap.png', 'Ancient Sinnoh', 'navajowhite'],
        'Unova': ['5unovaMap.png', 'Unova', '#C0C0C0'],
        'Kalos': ['6kalosMap.png', 'Kalos', '#C0C0C0'],
        'Alola': ['7alolaMap.png', 'Alola', '#C0C0C0'],
        'Galar': ['8galarMap.png', 'Galar', '#C0C0C0'],
        'Paldea': ['9paldeaMap.png', 'Paldea', '#C0C0C0']
    };

    protected readonly title = signal('PokedexLandingPage');
    protected readonly currentIcon = signal(this.icon_info);
    protected readonly backgroundImage = signal(Object.keys(this.regionsInfoMap)[0][0]);
    protected readonly regionName = signal(Object.values(this.regionsInfoMap)[0][1]);
    protected readonly regionColor = signal(Object.values(this.regionsInfoMap)[0][2]);

    constructor(private router: Router) {
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
        if (this.currentRoute.includes('/info')) {
            this.router.navigate(['/tiles']).then(() => {
            });
        } else {
            this.router.navigate(['/info']).then(() => {
            });
        }
    }

    toggleBackground(): void {
        const randomIndex = Math.floor(Math.random() * Object.entries(this.regionsInfoMap).length);
        const entry = Object.entries(this.regionsInfoMap)[randomIndex];
        const regionNameKey = entry[1];
        const image = regionNameKey[0];
        const region = regionNameKey[1];
        const color = regionNameKey[2];
        this.backgroundImage.set(image);
        this.regionName.set(region);
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

}

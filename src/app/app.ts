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

    private readonly regionNameMap: { [key: string]: string } = {
        '1kantoMap.png': 'Kanto',
        '2johtoMap.png': 'Johto',
        '3hoennMap.png': 'Hoenn',
        '41sinnohMap.png': 'Sinnoh',
        '42hisuiSinnohMap.png': 'Ancient Sinnoh',
        '5unovaMap.png': 'Unova',
        '6kalosMap.png': 'Kalos',
        '7alolaMap.png': 'Alola',
        '8galarMap.png': 'Galar',
        '9paldeaMap.png': 'Paldea'
    };

    protected readonly title = signal('PokedexLandingPage');
    protected readonly currentIcon = signal(this.icon_info);
    protected readonly backgroundImage = signal(Object.keys(this.regionNameMap)[0]);
    protected readonly regionName = signal(Object.values(this.regionNameMap)[0]);

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
        const randomIndex = Math.floor(Math.random() * Object.entries(this.regionNameMap).length);
        const entry = Object.entries(this.regionNameMap)[randomIndex];
        const image = entry[0];
        const region = entry[1];
        this.backgroundImage.set(image);
        this.regionName.set(region);
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

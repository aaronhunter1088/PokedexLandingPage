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

    // icons in use
    protected readonly icon_info = 'info';
    protected readonly icon_replay = 'replay';
    protected readonly icon_shuffle = 'shuffle';

    protected readonly title = signal('PokedexLandingPage');
    protected readonly currentIcon = signal(this.icon_info);

    currentRoute: string;
    previousRoute: string;
    backgroundImages = [
        '1kantoMap.png',
        '2johtoMap.png',
        '3hoennMap.png',
        '41sinnohMap.png',
        '42hisuiSinnohMap.png',
        '5unovaMap.png',
        '6kalosMap.png',
        '7alolaMap.png',
        '8galarMap.png',
        '9paldeaMap.png'
    ]
    protected readonly backgroundImage = signal(this.backgroundImages[0]);

    protected getBackgroundImageUrl(): string {
        return `url('${this.backgroundImage()}')`;
    }

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
        this.toggleBackground();
    }

    ngOnChanges() {
    }

    toggleRoute(): void {
        if (this.currentRoute.includes('/info')) {
            this.router.navigate(['/tiles']);
        } else {
            this.router.navigate(['/info']);
        }
    }

    private updateIcon(): void {
        if (this.currentRoute.includes('/info')) {
            this.currentIcon.set(this.icon_replay);
        } else {
            this.currentIcon.set(this.icon_info);
        }
    }

    toggleBackground(): void {
        const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
        this.backgroundImage.set(this.backgroundImages[randomIndex]);
    }
}

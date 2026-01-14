import {Component, signal} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatIcon],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('PokedexLandingPage');
    protected readonly currentIcon = signal('help');

    currentRoute: string;
    previousRoute: string;

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

    }

    ngOnInit(): void {
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
            this.currentIcon.set('replay');
        } else {
            this.currentIcon.set('help');
        }
    }
}

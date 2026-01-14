import {Component, signal} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('PokedexLandingPage');

    currentRoute: string;
    previousRoute: string;

    constructor(private router: Router) {
        this.currentRoute = "";
        this.previousRoute = "";
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                // Show loading indicator
                this.previousRoute = this.currentRoute;
                //console.log("Route change detected. previousRoute: ", this.previousRoute);
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
                this.currentRoute = event.url;
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
}

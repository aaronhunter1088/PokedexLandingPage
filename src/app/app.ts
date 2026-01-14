import {ChangeDetectorRef, Component, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {MaterialModule} from "./materialModule";
import {
    MatCardActions,
    MatCardContent, MatCardFooter,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import { NgZone } from '@angular/core';

@Component({
    selector: 'app-root',
    imports: [NgOptimizedImage, MaterialModule, MatCardContent, MatCardImage, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardFooter, MatSlideToggle, FormsModule],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
    protected readonly title = signal('PokedexLandingPage');

    toggle1Checked = false;
    toggle2Checked = false;
    toggle3Checked = false;
    // Logo and full images separate to alternate independently
    ngLogoImgValue = 'spring-logo-white.png';
    ngFullImgValue = 'angular-full-white.png';
    intervalId: any;

    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        /* Swap logo on tile3 every 2 seconds */
        setInterval(() => {
            this.ngZone.run(() => {
                this.ngLogoImgValue = this.ngLogoImgValue === 'spring-logo-white.png'
                    ? 'angular-logo-white.png'
                    : 'spring-logo-white.png';
                this.cdr.detectChanges();
            });
        }, 2000);
        /* Swap content image on tile3 every 2 seconds */
        setInterval(() => {
            this.ngZone.run(() => {
                this.ngFullImgValue = this.ngFullImgValue === 'angular-full-white.png'
                    ? 'spring-full-white.png'
                    : 'angular-full-white.png';
                this.cdr.detectChanges();
            });
        }, 2000);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    updateMode1(checked: boolean): void {
        this.toggle1Checked = checked;
    }

    updateMode2(checked: boolean): void {
        this.toggle2Checked = checked;
    }

    updateMode3(checked: boolean): void {
        this.toggle3Checked = checked;
    }
}

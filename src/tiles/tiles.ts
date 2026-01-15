import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-tiles',
    imports: [
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardImage,
        MatCardSubtitle,
        MatCardTitle,
        MatIcon,
        MatSlideToggle,
        NgOptimizedImage,
        FormsModule
    ],
    templateUrl: './tiles.html',
    styleUrls: ['./tiles.css'],
})
export class Tiles implements OnInit, OnDestroy {

    toggle1Checked = false;
    toggle2Checked = false;
    toggle3Checked = false;
    // Logo and full images separate to alternate independently
    ngLogoImgValue = 'spring-logo-white.png';
    ngFullImgValue = 'angular-full-white.png';
    intervalId: any;
    // icons in use
    protected readonly icon_sunny = 'sunny';
    protected readonly icon_bedtime = 'bedtime';

    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    }

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

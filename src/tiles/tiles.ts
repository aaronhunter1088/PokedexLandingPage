import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../app/materialModule";
import {environment} from '../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-tiles',
    imports: [
        MaterialModule,
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
    protected readonly environment = environment;

    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {

    }

    ngOnInit() {
        // Read query parameters
        this.route.queryParamMap.subscribe(params => {
            const tileNumber = params.get('tileNumber');
            const darkmode = params.get('darkmode');
            
            // Both parameters must be present
            if (tileNumber && darkmode) {
                const tileNum = parseInt(tileNumber, 10);
                const isDarkMode = darkmode === 'true';
                
                // Validate tileNumber is 1, 2, or 3
                if (tileNum >= 1 && tileNum <= 3) {
                    // Set the appropriate toggle
                    if (tileNum === 1) {
                        this.toggle1Checked = isDarkMode;
                    } else if (tileNum === 2) {
                        this.toggle2Checked = isDarkMode;
                    } else if (tileNum === 3) {
                        this.toggle3Checked = isDarkMode;
                    }
                    this.cdr.detectChanges();
                }
            }
        });
        /* Swap logo on tile3 every 2 seconds */
        setInterval(() => {
            this.ngZone.run(() => {
                // swap to darkmode logo swap based on whether toggle is set or not
                const color = this.toggle3Checked ? 'black' : 'white';
                this.ngLogoImgValue = this.ngLogoImgValue.includes('spring')
                    ? `angular-logo-${color}.png`
                    : `spring-logo-${color}.png`;
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

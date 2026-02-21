import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app/materialModule';
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
        // Load darkmode settings from localStorage first
        this.loadDarkmodeFromLocalStorage();
        
        // Read query parameters (these override localStorage if present)
        this.route.queryParamMap.subscribe(params => {
            const tileNumber = params.get('tileNumber');
            const darkmode = params.get('darkmode');
            
            // Both parameters must be present
            if (tileNumber && darkmode) {
                const tileNum = parseInt(tileNumber, 10);
                const isDarkMode = darkmode === 'true';
                
                // Validate tileNumber is 1, 2, or 3
                if (tileNum >= 1 && tileNum <= 3) {
                    // Set the appropriate toggle and save to localStorage
                    if (tileNum === 1) {
                        this.toggle1Checked = isDarkMode;
                        localStorage.setItem('tile1Darkmode', isDarkMode.toString());
                    } else if (tileNum === 2) {
                        this.toggle2Checked = isDarkMode;
                        localStorage.setItem('tile2Darkmode', isDarkMode.toString());
                    } else if (tileNum === 3) {
                        this.toggle3Checked = isDarkMode;
                        localStorage.setItem('tile3Darkmode', isDarkMode.toString());
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
        // setInterval(() => {
        //     this.ngZone.run(() => {
        //         this.ngFullImgValue = this.ngFullImgValue === 'angular-full-white.png'
        //             ? 'spring-full-white.png'
        //             : 'angular-full-white.png';
        //         this.cdr.detectChanges();
        //     });
        // }, 2000);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    // Update darkmode for tile 1 and save to localStorage
    updateMode1(checked: boolean): void {
        this.toggle1Checked = checked;
        localStorage.setItem('tile1Darkmode', checked.toString());
    }

    // Update darkmode for tile 2 and save to localStorage
    updateMode2(checked: boolean): void {
        this.toggle2Checked = checked;
        localStorage.setItem('tile2Darkmode', checked.toString());
    }

    // Update darkmode for tile 3 and save to localStorage
    updateMode3(checked: boolean): void {
        this.toggle3Checked = checked;
        localStorage.setItem('tile3Darkmode', checked.toString());
    }

    // Load darkmode settings from localStorage
    private loadDarkmodeFromLocalStorage(): void {
        const tile1Darkmode = localStorage.getItem('tile1Darkmode');
        const tile2Darkmode = localStorage.getItem('tile2Darkmode');
        const tile3Darkmode = localStorage.getItem('tile3Darkmode');
        
        // Set default values if not present, otherwise use stored values
        this.toggle1Checked = tile1Darkmode === 'true';
        this.toggle2Checked = tile2Darkmode === 'true';
        this.toggle3Checked = tile3Darkmode === 'true';
    }
}

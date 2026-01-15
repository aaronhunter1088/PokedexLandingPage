import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";

@Component({
    selector: 'app-info',
    imports: [
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
    ],
    templateUrl: './info.html',
    styleUrl: './info.css',
})
export class Info implements OnInit, OnDestroy {

    intervalId: any;

    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

}

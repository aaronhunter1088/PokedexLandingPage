import {Component, signal} from '@angular/core';
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

@Component({
    selector: 'app-root',
    imports: [NgOptimizedImage, MaterialModule, MatCardContent, MatCardImage, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardFooter, MatSlideToggle],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('PokedexLandingPage');
}

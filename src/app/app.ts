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
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-root',
    imports: [NgOptimizedImage, MaterialModule, MatCardContent, MatCardImage, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardFooter, MatSlideToggle, FormsModule],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('PokedexLandingPage');

    toggle1Checked = false;
    toggle2Checked = false;
    toggle3Checked = false;

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

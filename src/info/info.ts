import { Component } from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardImage, MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-info',
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
        NgOptimizedImage
    ],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class Info {

}

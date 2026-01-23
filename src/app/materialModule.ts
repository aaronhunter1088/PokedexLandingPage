import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {NgModule} from "@angular/core";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
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
import {MatMenu} from "@angular/material/menu";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatOption, MatSelect} from "@angular/material/select";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    //“What other modules can use through me”
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatTabsModule,
        MatIconModule,

        MatButton,
        MatToolbar,
        MatIcon,
        MatFormField,
        MatInput,
        //MatDialog,
        //MatSnackBar,
        MatCard,
        MatMenu,
        MatSlider,
        MatSliderThumb,

        MatCardContent,
        MatCardImage,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardActions,
        MatCardFooter,
        MatSlideToggle,
        MatCheckbox,
        MatSelect,
        MatOption
    ],
    //“What this module is allowed to use internally”
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatTabsModule,
        MatIconModule,

        MatButton,
        MatToolbar,
        MatIcon,
        MatFormField,
        MatInput,
        MatCard,
        MatMenu,
        MatSlider,
        MatSliderThumb,

        MatCardContent,
        MatCardImage,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardActions,
        MatCardFooter,
        MatSlideToggle,
        MatCheckbox,
        MatSelect,
        MatOption
    ]
})
export class MaterialModule {
}

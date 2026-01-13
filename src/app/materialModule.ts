import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {NgModule} from "@angular/core";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCard} from "@angular/material/card";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatMenu} from "@angular/material/menu";

@NgModule({
    //“What other modules can use through me”
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,

        MatButton,
        MatToolbar,
        MatIcon,
        MatFormField,
        MatInput,
        //MatDialog,
        //MatSnackBar,
        MatCard,
        MatMenu
    ],
    //“What this module is allowed to use internally”
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,

        MatButton,
        MatToolbar,
        MatIcon,
        MatFormField,
        MatInput,
        MatCard,
        MatMenu
    ]
})
export class MaterialModule {}

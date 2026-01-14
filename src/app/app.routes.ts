import {RouterModule, Routes} from '@angular/router';
import {App} from "./app";
import {Tiles} from "../tiles/tiles";
import {Info} from "../info/info";
import {NgModule} from "@angular/core";

export const routes: Routes = [
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'tiles'
    },
    {
        path: 'tiles',
        title: 'PokedexTiles',
        component: Tiles
    },
    {
        path: 'info',
        title: 'PokedexInfo',
        component: Info
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
    Tiles, Info]
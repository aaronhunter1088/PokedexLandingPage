import {Routes} from '@angular/router';
import {App} from "./app";
import {Tiles} from "../tiles/tiles";
import {Info} from "../info/info";

export const routes: Routes = [
    {
        path: '',
        title: 'PokedexLandingPage',
        component: App
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

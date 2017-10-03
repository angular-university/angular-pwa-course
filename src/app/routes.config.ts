import {Routes} from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";


export const routesConfig: Routes = [
    {
        path: '',
        component: LessonsComponent
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
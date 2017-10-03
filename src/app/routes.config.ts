import {Routes} from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";


export const routesConfig: Routes = [
    {
        path: 'lessons',
        component: LessonsComponent
    },
    {
        path: '',
        redirectTo:'/lessons',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/lessons',
        pathMatch: 'full'
    }
];
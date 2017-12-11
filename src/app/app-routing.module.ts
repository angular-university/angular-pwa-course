import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";


 const routes: Routes = [
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


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

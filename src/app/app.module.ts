import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LessonsComponent} from './lessons/lessons.component';

import {routesConfig} from "./routes.config";
import {LessonsService} from "./services/lessons.service";
import {ReactiveFormsModule} from "@angular/forms";

import {Router, RouterModule} from "@angular/router";


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';




@NgModule({
    declarations: [
        AppComponent,
        LessonsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routesConfig),
        ReactiveFormsModule
    ],
    providers: [
        LessonsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}

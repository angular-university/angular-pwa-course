import {Routes} from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AdminComponent} from "./admin/admin.component";

export const routesConfig: Routes = [
    {
        path: 'lessons',
        component: LessonsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: ["adminsOnlyGuard"]
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
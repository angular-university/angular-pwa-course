
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import * as _ from 'lodash';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthorizationGuard implements  CanActivate {


    constructor(private allowedRoles:string[],
                private authService:AuthService, private router:Router) {

    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean>  {

        return this.authService.user$
            .map(user => _.intersection(this.allowedRoles, user.roles).length > 0 )
            .first()
            .do(allowed => {
                if (!allowed) {
                    this.router.navigateByUrl('/');
                }
            });


    }

}
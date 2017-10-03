


import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {User} from "../model/user";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';

@Directive({
    selector:"[rbacAllow]"
})
export class RbacAllowDirective implements OnDestroy {

    allowedRoles:string[];
    user:User;

    sub:Subscription;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService) {

        this.sub = authService.user$.subscribe(
            user => {
                this.user = user;
                this.showIfUserAllowed();
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }

    showIfUserAllowed() {

        if (!this.allowedRoles || this.allowedRoles.length === 0 ||
            !this.user) {
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed =
            _.intersection(this.allowedRoles, this.user.roles).length > 0;


        if (isUserAllowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }

    }

}












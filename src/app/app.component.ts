import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs/Observable";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    user$: Observable<User>;

    constructor(private authService:AuthService) {

    }

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn$;
        this.isLoggedOut$ = this.authService.isLoggedOut$;
        this.user$ = this.authService.user$;
    }

    logout() {

        this.authService.logout().subscribe();

    }

}


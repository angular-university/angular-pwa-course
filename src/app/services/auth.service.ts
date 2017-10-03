import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: undefined,
    roles: []
}


@Injectable()
export class AuthService {

    private subject = new BehaviorSubject<User>(undefined);

    user$: Observable<User> = this.subject.asObservable().filter(user => !!user);

    isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);

    isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);

    constructor(private http: HttpClient) {
        http.get<User>('/api/user')
            .do(console.log)
            .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
    }

    signUp(email:string, password:string ) {

        return this.http.post<User>('/api/signup', {email, password})
            .shareReplay()
            .do(user => this.subject.next(user));
    }

    login(email:string, password:string ) {
        return this.http.post<User>('/api/login', {email, password})
            .shareReplay()
            .do(user => this.subject.next(user));
    }

    loginAsUser(email:string) {
        return this.http.post<User>('/api/admin', {email})
            .shareReplay()
            .do(user => this.subject.next(user));
    }

    logout() : Observable<any> {
        return this.http.post('/api/logout', null)
            .shareReplay()
            .do(user => this.subject.next(ANONYMOUS_USER));
    }
}









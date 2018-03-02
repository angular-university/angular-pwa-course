

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub:any) {
        return this.http.post('/api/notifications', sub);
    }

    send() {
        return this.http.post('/api/newsletter', null);
    }

}



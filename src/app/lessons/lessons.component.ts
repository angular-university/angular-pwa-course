import {Component, OnInit} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Observable} from "rxjs/Observable";
import {Lesson} from "../model/lesson";
import {SwPush} from "@angular/service-worker";
import {NewsletterService} from "../services/newsletter.service";

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;

    readonly VAPID_PUBLIC_KEY = "BIvC8I6yoFc-DZNgFTANsy9cae80mjWzTym7aB5zY45vBVZQK9VureFHvoh5ijW8EKG2I-g1YaN5rcKe_5AYrvM";

    constructor(
        private lessonsService: LessonsService,
        private swPush: SwPush,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {
        this.loadLessons();


        this.swPush.messages.subscribe(message => {

            console.log("Received Web Push Message: " + message);

        });
    }


    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons().catch(err => Observable.of([]));
    }

    subscribeToNotifications() {

        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(sub => {

            console.log("Notification Subscription: ", sub);

            // Passing subscription object to our backend
            this.newsletterService.addPushSubscriber(sub)
                .subscribe(
                    () => console.log('Sent push subscription object to server.'),
                    err =>  console.log('Could not send subscription object to server, reason: ', err)
                );
        })
        .catch(err => console.error("Could not subscribe to notifications", err));

    }


    sendNewsletter() {

        console.log("Sending Newsletter to all Subscribers ...");

        this.newsletterService.send().subscribe();

    }





}

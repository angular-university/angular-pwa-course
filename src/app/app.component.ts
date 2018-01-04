import {Component, OnInit} from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {


    constructor(private swUpdate: SwUpdate) {

    }

    ngOnInit() {

        if (this.swUpdate.isEnabled) {

            this.swUpdate.available.subscribe(() => {

                if (confirm("New version available. Load New Version?")) {
                    window.location.reload();
                }

            });

        }



    }

}


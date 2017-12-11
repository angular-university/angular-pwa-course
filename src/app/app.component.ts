import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {SwPush, SwUpdate} from "@angular/service-worker";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {


    constructor(private swUpdate:SwUpdate, private snackBar: MatSnackBar) {

    }

    ngOnInit() {

        this.swUpdate.checkForUpdate();

        this.swUpdate.available.subscribe(() => {

            console.log("New Version available...");

            const snackRef = this.snackBar.open("New Version Available!", "Click To Use New Version");

            snackRef.onAction().subscribe(() => window.location.reload());

        });

    }


}


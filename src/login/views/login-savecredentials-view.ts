import {Component} from "@angular/core";
import {LoginEvent} from "../login-screenlet";
import {ScreensService} from "../../screens/screens-service";
import {LoginDefaultView} from "./login-default-view";
import {NavController, Loading} from "ionic-angular/index";

@Component({
    template: `

  <div *ngIf="isLoggedIn()">
    <ion-item>
        <ion-label>Logged in with the user {{getUser()}}</ion-label>
    </ion-item>
    
     <button full (click)="logout()">LOGOUT</button>
  </div>
  <div *ngIf="!isLoggedIn()">
                <ion-item>
                    <ion-label floating>Username</ion-label>
                    <ion-input type="text" [(ngModel)]="username"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ion-label floating>Password</ion-label>
                    <ion-input type="password" [(ngModel)]="password"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ion-label>Save credentials</ion-label>
                     <ion-checkbox checked="false" [(ngModel)]="savecredentials"></ion-checkbox>
                </ion-item>
                
              
                <button full (click)="loginSavingCredentials($event)">Login</button>
    </div>
    `
})
export class LoginSaveCredentialsView extends LoginDefaultView {

    savecredentials;

    getUser() {
        return this.screensService.username;
    }

    logout() {
        this.screensService.logout();
        window.location.reload();
    }

    isLoggedIn() {
        return this.screensService.isLoggedIn();
    }

    constructor(public _navControler:NavController,
                public screensService:ScreensService) {
        super(_navControler);
        this.username = screensService.isLoggedIn() ? screensService.username : "";
        this.password = screensService.isLoggedIn() ? screensService.password : "";
    }

    loginSavingCredentials($event) {
        this.loading = Loading.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this._navControler.present(this.loading);
        this.onUserAction.emit(new LoginEvent(this.username, this.password));
    }

    postAction(data) {
        this.loading.dismiss().then(() => console.log(data));
        if (this.savecredentials && !data.exception) {
            this.screensService.storeCredentials(this.username, this.password);
        }
    }
}
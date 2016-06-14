import {Component, Type, Output, EventEmitter} from "@angular/core";
import {LoginEvent, LoginViewModel} from "../login-screenlet";
import {Loading, NavController} from "ionic-angular/index";

@Component({
    template: `
                <ion-item>
                    <ion-label>Username</ion-label>
                    <ion-input type="text" [(ngModel)]="username"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ion-label>Password</ion-label>
                    <ion-input type="password" [(ngModel)]="password"></ion-input>
                </ion-item>
                
                <button full (click)="login($event)">Login</button>
    `
})
export class LoginDefaultView extends Type implements LoginViewModel {

    username;
    password;

    constructor(private _navController:NavController) {
        super();
    }

    loading;

    login($event) {
        this.loading = Loading.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this._navController.present(this.loading);
        this.onUserAction.emit(new LoginEvent(this.username, this.password));
    }

    postAction(data) {
        this.loading.dismiss().then(() => console.log(data));
    }

    @Output()
    onUserAction:EventEmitter<LoginEvent> = new EventEmitter<LoginEvent>();
}
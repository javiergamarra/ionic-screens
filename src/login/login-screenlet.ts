import {
    Component, Output, EventEmitter, DynamicComponentLoader, ElementRef, OnInit,
    ViewContainerRef, ViewChild, ComponentResolver, ComponentFactory
} from "@angular/core";
import "rxjs/Rx";

import {LoginService} from "./service/login-service";
import {LoginDefaultView} from "./views/login-default-view";
import {BaseScreenlet} from "../screens/basescreenlet";

export class LoginEvent {

    constructor(public id:string, public password:string) {
    }
}

export interface LoginViewModel {

    username:string;
    password:string;

    login(id:string, password:string);

    onUserAction:EventEmitter<LoginEvent>;
}

@Component({
    selector: 'login-screenlet',
    template: '<div #target (onUserAction)="onUserAction($event)"></div>',
    providers: [LoginService]
})
export class LoginScreenlet extends BaseScreenlet implements OnInit {

    @Output()
    onLoginSuccess:EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('target', {read: ViewContainerRef}) target:ViewContainerRef;

    ngOnInit() {

        var loginView:LoginDefaultView = this.getLayout(LoginDefaultView);

        var self = this;

        this.componentResolver.resolveComponent(loginView).then((factory:ComponentFactory<any>) => {
            var component = this.target.createComponent(factory);
            component.instance.onUserAction.subscribe($event => {
                this.loginService.login($event.id, $event.password)
                    .subscribe(
                        data => {
                            component.instance.postAction(data);
                            self.onLoginSuccess.emit(data)
                        },
                        err => {
                            component.instance.postAction(err);
                            self.onLoginSuccess.emit(err);
                        },
                        () => console.log('Authentication Complete')
                    )
            });
        });
    }

    constructor(public componentResolver:ComponentResolver,
                public loginService:LoginService) {
        super();
    }
}
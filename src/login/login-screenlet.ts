import {
    Component, Output, EventEmitter, OnInit,
    ViewContainerRef, ViewChild, ComponentResolver, ComponentFactory, Input
} from "@angular/core";
import "rxjs/Rx";

import {LoginService} from "./service/login-service";
import {LoginDefaultView} from "./views/login-default-view";
import {BaseScreenlet} from "../screens/basescreenlet";
import {ScreensService} from "../screens/screens-service";

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

    @Input()
    layout;

    @ViewChild('target', {read: ViewContainerRef}) target:ViewContainerRef;

    ngOnInit() {

        let loginView:LoginDefaultView = this.getLayout(LoginDefaultView);

        let self = this;

        this.componentResolver.resolveComponent(loginView).then((factory:ComponentFactory<any>) => {
            let component = this.target.createComponent(factory);
            component.instance.onUserAction.subscribe($event => {
                        this.loginService.login($event.id, $event.password)
                            .subscribe(
                                data => {
                                    this.screensService.storeUser(data);
                                    component.instance.postAction(data);
                                    self.onLoginSuccess.emit(data)
                                },
                                err => {
                                    err.exception = 'Failed!';
                                    component.instance.postAction(err);
                                    self.onLoginSuccess.emit(err);
                                },
                                () => console.log('Authentication Complete')
                            )
            });
        });
    }

    constructor(public componentResolver:ComponentResolver,
                public loginService:LoginService,
                public screensService:ScreensService) {
        super();
    }
}
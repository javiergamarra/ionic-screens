import {
    Component,
    Input,
    SimpleChange, ComponentResolver, ViewContainerRef, ViewChild, ComponentFactory, Output, EventEmitter
} from "@angular/core";

import {UserPortraitService} from "./service/userportrait-service";
import {BaseScreenlet} from "../screens/basescreenlet"
import {UserPortraitDefaultView} from "./views/userportrait-default-view";
import {ScreensService} from "../screens/screens-service";

export interface UserViewModel {

    url:string;
}

@Component({
    selector: 'userportrait-screenlet',
    template: '<div #target (onUserAction)="onUserAction($event)"></div>',
    providers: [UserPortraitService]
})
export class UserPortraitScreenlet extends BaseScreenlet {

    @Input()
    private male;
    @Input()
    private portraitId;
    @Input()
    private uuid;

    @Input()
    layout;

    @Output()
    onClicked:EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('target', {read: ViewContainerRef}) target:ViewContainerRef;

    private load() {

        var userPortraitView:UserPortraitDefaultView = this.getLayout(UserPortraitDefaultView);

        this.userPortraitService.getUserPortraitUrl(this.male, this.portraitId, this.uuid)
            .subscribe(url => {
                this.componentResolver.resolveComponent(userPortraitView).then((factory:ComponentFactory<any>) => {
                    var component = this.target.createComponent(factory);
                    component.instance.url = url;
                    component.instance.imageClicked.subscribe($event => {
                        component.instance.postAction($event);
                        this.onClicked.emit($event)
                    });
                });
            }, err => {
                console.log(err)
            });
    }

    ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
        if (changes['portraitId'] || changes['uuid'] || changes['male']) {
            if (this.uuid == null && this.screensService.getUser()) {
                this.uuid = this.screensService.getUser()['uuid'];
                this.male = this.screensService.getUser()['male'];
                this.portraitId = this.screensService.getUser()['portraitId'];
            }

            this.load();
        }
    }

    constructor(public componentResolver:ComponentResolver,
                public userPortraitService:UserPortraitService,
                public screensService:ScreensService) {
        super();
    }

}




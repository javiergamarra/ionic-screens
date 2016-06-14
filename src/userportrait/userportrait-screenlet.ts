import {
    Component,
    DynamicComponentLoader,
    Input,
    ElementRef,
    SimpleChange
} from "@angular/core";

import {UserPortraitService} from "./service/userportrait-service";
import {BaseScreenlet} from "../screens/basescreenlet"
import {UserPortraitDefaultView} from "./views/userportrait-default-view";

export interface UserViewModel {

    url:string;
}

@Component({
    selector: 'userportrait-screenlet',
    template: '<div #placeholder></div>',
    providers: [UserPortraitService]
})
export class UserPortraitScreenlet extends BaseScreenlet {

    @Input()
    private male;
    @Input()
    private portraitId;
    @Input()
    private uuid;

    private load() {

        var userPortraitView:UserPortraitDefaultView = this.getLayout(UserPortraitDefaultView);

        // this.userPortraitService.getUserPortraitUrl(this.male, this.portraitId, this.uuid)
        //     .subscribe(url => {
        //         this.dcl.loadNextToLocation(userPortraitView, this.elementRef, 'placeholder')
        //             .then(componentRef => componentRef.instance.url = url);
        //     }, err => {
        //         console.log(err)
        //     });
    }

    ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
        if (changes['portraitId'] || changes['uuid'] || changes['male']) {
            this.load();
        }
    }

    constructor(public dcl:DynamicComponentLoader,
                public elementRef:ElementRef,
                public userPortraitService:UserPortraitService) {
        super();
    }

}




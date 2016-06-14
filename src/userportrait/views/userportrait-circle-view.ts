import {Component} from "@angular/core";
import {UserPortraitDefaultView} from "./userportrait-default-view";

@Component({
    template: '<img style="border-radius: 20%;" src="{{url}}" (click)="onClick">'
})
export class UserPortraitCircleView extends UserPortraitDefaultView {

}
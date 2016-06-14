import {Component} from "@angular/core";
import {UserPortraitDefaultView} from "./userportrait-default-view";

@Component({
    template: '<img style="border-radius: 20%;" src="{{url}}" (click)="onClick($event)">'
})
export class UserPortraitCircleView extends UserPortraitDefaultView {

}
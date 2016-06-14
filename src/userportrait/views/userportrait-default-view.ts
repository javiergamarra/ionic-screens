import {Component, Type} from "@angular/core";
import {UserViewModel} from "../userportrait-screenlet";

@Component({
    template: '<img src="{{url}}">'
})
export class UserPortraitDefaultView extends Type implements UserViewModel {

    url:string;
}
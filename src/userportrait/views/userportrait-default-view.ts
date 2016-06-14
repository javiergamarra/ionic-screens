import {Component, Type, Output, EventEmitter} from "@angular/core";
import {UserViewModel} from "../userportrait-screenlet";

@Component({
    template: '<img src="{{url}}" (click)="onClick">'
})
export class UserPortraitDefaultView extends Type implements UserViewModel {

    url:string;

    @Output()
    imageClicked:EventEmitter<any> = new EventEmitter<any>();

    onClick() {
        this.imageClicked.emit('click');
    }

    postAction(data) {
    }
}
import {Component, Input, ReflectiveInjector} from "@angular/core";

@Component({
    selector: 'screenlet',
    template: '<div #placeholder></div>'
})
export class BaseScreenlet {

    @Input()
    layout;

    getLayout(type) {

        if (this.layout) {
            let injector = ReflectiveInjector.resolveAndCreate(
                [type, {provide: type, useValue: this.layout}]);
            return injector.get(type);
        }
        return type;
    }

}
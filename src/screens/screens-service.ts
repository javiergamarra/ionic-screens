import {Injectable, Inject} from "@angular/core";
import "rxjs/Rx";

@Injectable()
export class ScreensService {

    constructor(@Inject('serverUrl') public serverUrl:string,
                @Inject('companyId') public companyId:number,
                @Inject('groupId') public groupId:number) {
    }

    getServerUrl() {
        return this.serverUrl;
    }

    getApiUrl() {
        return this.getServerUrl() + "/api/jsonws/"
    }

    isLoggedIn() {
        return this.username != null && this.password != null;
    }

    storeCredentials(username:string, password:string) {
        this.username = username;
        this.password = password;
    }

    logout() {
        this.storeCredentials('', '');
    }

    username;
    password;


}
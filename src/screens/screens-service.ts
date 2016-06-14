import {Injectable, Inject} from "@angular/core";
import "rxjs/Rx";

@Injectable()
export class ScreensService {

    constructor(@Inject('serverUrl') public serverUrl:string,
                @Inject('companyId') public companyId:number,
                @Inject('groupId') public groupId:number) {
        console.log(this.serverUrl);
    }

    getServerUrl() {
        return this.serverUrl;
    }

    getApiUrl() {
        return this.getServerUrl() + "/api/jsonws/"
    }

    isLoggedIn() {
        return this.username != null && this.password != null && this.data != null;
    }

    storeCredentials(username:string, password:string) {
        this.username = username;
        this.password = password;
    }

    storeUser(data) {
        this.data = data;
    }

    getUser() {
        return this.data;
    }

    logout() {
        this.data = null;
        this.storeCredentials('', '');
    }

    username;
    password;
    data;

}
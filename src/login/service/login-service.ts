import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {ScreensService} from "../../screens/screens-service";
import {Observable} from "rxjs/Rx";
import * as Rx from "rxjs/Rx";

@Injectable()
export class LoginService {

    constructor(private http:Http, private screensService:ScreensService) {

    }

    login(username, password) {

        var body = "companyId=" + this.screensService.companyId + "&emailAddress=" + username;

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        return this.http.post(`${this.screensService.getApiUrl()}user/get-user-by-email-address`, body, {headers: headers})
            .map(res => res.json());
    }

}
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
//noinspection TypeScriptCheckImport
import * as jssha from "jssha";
import {ScreensService} from "../../screens/screens-service";

@Injectable()
export class UserPortraitService {

    constructor(private screensService:ScreensService) {
    }

    getUserPortraitUrl(male:boolean = true, portraitId:number, uuid:string):Observable<any> {

        if (!portraitId || !uuid) {
            return Observable.throw(new Error("Validation Error!"));
        }

        return Observable.of([this.createUserPortraitImage(male, portraitId, uuid)]);
    }

    private createUserPortraitImage(male:boolean, portraitId:number, uuid:string) {
        return `${this.screensService.getServerUrl()}/image/user_${male ? 'male' : 'female'}_portrait?img_id=${portraitId}&img_id_token=${encodeURIComponent(this.getSha1(uuid))}`;
    }

    private getSha1(text:string) {
        var shaObj = new jssha('SHA-1', 'TEXT');
        shaObj.update(text);
        return shaObj.getHash('B64');
    }

}
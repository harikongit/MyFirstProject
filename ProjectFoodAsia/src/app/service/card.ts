import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/Rx';
import { Response } from "@angular/http/src/static_response";
import { AuthService } from "./auth";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";


@Injectable()

export class CardService {


    constructor(private errorservice: ErrhandlerService, private http: Http, private authservice: AuthService ) {}


    FetchCard(token: string) {
    let uid = this.authservice.ActiveUser().uid;
    
    return this.http.get('https://my-hasha-app.firebaseio.com/test/stripe_sources/'+ uid +'/.json?auth='+ token)
    .map((res: Response) => { return res.json(); }).pipe(catchError(this.errorservice.handleError<any>('Fetching Cards', "S"))) ;
    }
}
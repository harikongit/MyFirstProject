import { Injectable } from "@angular/core";
import { LastId } from "../models/lastId";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";

@Injectable() 
export class LastIdService {

li: number;
last: number;

constructor(private errorservice: ErrhandlerService, private aservice: AuthService, private http: HttpClient) {}

AddId(lastId: number) {
         
    this.li = lastId;
}

getId(token:string) {
       
  
    return this.http.get('https://my-hasha-app.firebaseio.com/test/lastId/ActId.json?auth=' +token).pipe(catchError(this.errorservice.handleError<any>('Get last Id', "S"))) ;;
       
    }
    
AddOn(token: string) {

    return this.http.put('https://my-hasha-app.firebaseio.com/test/lastId/ActId.json?auth=' +token , this.li).pipe(catchError(this.errorservice.handleError<any>('Store last Id', "S"))) ;
    
}



}
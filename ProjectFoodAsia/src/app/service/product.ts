import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { AuthService } from "./auth";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { catchError, map, tap } from 'rxjs/operators';

import { ErrhandlerService } from "./errhandler";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()


export class ProductService {

    products: Product[];

constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private errorservice: ErrhandlerService, private authservice: AuthService, private http: HttpClient) {}


FetchList(token: string) {
    const userid = this.authservice.ActiveUser().uid;
    return this.http.get('https://my-hasha-app.firebaseio.com/test/product1.json?auth=' + token).pipe(catchError(this.errorservice.handleError<any>('Products', "S")));   
}

getData(token: string ,index: number, type: string){

    if(type == 'Jewellery'){
        return this.http.get('https://my-hasha-app.firebaseio.com/test/product1/'+ index +'.json?auth=' + token).pipe(catchError(this.errorservice.handleError<any>('Products', "S")));
    }else if(type == 'Groceries'){
        return this.http.get('https://my-hasha-app.firebaseio.com/test/product2/'+ index +'.json?auth=' + token).pipe(catchError(this.errorservice.handleError<any>('Products', "S")));
    }
      
}

Getpro(){
    const data = this.db.list(`/test/product1/`).valueChanges();
    return data;
}

Getgro(){
    const data = this.db.list(`/test/product2/`).valueChanges();
    return data;
}

// search on merchant name
srchMerchant(term: string) {
    // console.log("in merchant service", term);
    const data =  this.db.list('/test/product1', ref => ref.orderByChild('merchantName').startAt(term).endAt(term+"\uf8ff")).valueChanges();  
  return data;
  }


//   Groceries
FetchGro(token: string) {
    const userid = this.authservice.ActiveUser().uid;
    return this.http.get('https://my-hasha-app.firebaseio.com/test/product2.json?auth=' + token).pipe(catchError(this.errorservice.handleError<any>('Products', "S")));   
}


}
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import { Http } from "@angular/http";
import { Order } from "../models/order";
import { Response } from "@angular/http/src/static_response";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";

@Injectable() 



export class OrderService {


order: Order;
SubStatus: string;

constructor(private errorservice: ErrhandlerService, private authservice: AuthService, private http: Http) {}

AddOrder( CustId: string, ActNo: number, merchantName: string, productName: string, savings: number, additionalOffers: string, name: string, strtdate: any, enddate: string, pay: number, bengname : string, benrelation: string, cardBrand: string, cardlast4: number, cardId: any, imageURL: any) {

    this.SubStatus = 'In Progress';
    this.order = new Order(CustId, ActNo, merchantName, productName, savings, additionalOffers, name, strtdate, enddate, pay, bengname, benrelation, cardBrand, cardlast4, cardId, imageURL, this.SubStatus);
    
    }

getOrder(){
    return this.order;
}

DelOrder(){
this.order = undefined;
} 

StrOrder(token:string) {
    let A = this.order.ActNo;
    // console.log(this.plan);
    const uid = this.authservice.ActiveUser().uid; 
    return this.http.put('https://my-hasha-app.firebaseio.com/test/order_history/'+ uid +'/'+ A + '.json/?auth='+ token, this.order).pipe(catchError(this.errorservice.handleError<any>('Store Order History', "S"))) ;
}

FetchOrder(token: string) {
    
    const uid = this.authservice.ActiveUser().uid; 
    return this.http.get('https://my-hasha-app.firebaseio.com/test/order_history/'+ uid +'.json?auth='+ token)
    .map((res : Response) => {
      return res.json();
    }).pipe(catchError(this.errorservice.handleError<any>('Fetch Order History', "S"))) ;
}



UpdateOrder(token: string, status: string, date: string, ActNo: number){

    const uid = this.authservice.ActiveUser().uid;
    return this.http.patch('https://my-hasha-app.firebaseio.com/test/order_history/'+ uid +'/'+ ActNo + '/.json?auth='+ token, { SubStatus: status, enddate: date }).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S")));
    }
}
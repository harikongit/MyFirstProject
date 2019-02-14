import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";
import { DateService } from "./date";
import { Plan } from "../models/plans";

@Injectable()


export class MerchantPlansService {

Mplan: Plan;
RefStatus: string;
SubStatus: string;
    payStatus: string;
    instaPaid: number;
    instaAmt: number;
    balAmount: number;
    balVouchers: number;
    redeemedAmt: number;

constructor(private dateservice: DateService, private errorservice: ErrhandlerService, private authservice: AuthService,  private http: HttpClient) {
    // console.log('planservice constructor');
}


   

AddMPlan(CustId: string, ActNo: number, merchantId: number, merchantName: string, productName: string, savings: number, additionalOffers: string,
    name: string, strtdate: any, enddate: string, monthlyPay: number, merchantPay: number, totAmnt: number, redemAmt: number, term:number, freq: string, per: number,
    goalStatus: string, reasonCancel: string, nxtDueDate: string, bengname: string, benrelation: string,
    cardBrand: string, cardlast4: number, cardId: any,  imageURL: any,  merchantLogo: any, termsAndconditions: string,
    benefitsAndcancellation: string, productType: string, taxes: number, appFee: number, promoDis: number, promoExpire: any) {
       
       let d = new Date();
       let dc = this.dateservice.DateChange(d);
       strtdate = this.dateservice.DateChange(strtdate);
       // this.RefStatus = 'Not Refunded';
       if(strtdate != dc){
           this.SubStatus = 'Upcoming';
           this.payStatus = 'due';
           this.instaPaid = 0;
           this.instaAmt = 0;
           this.balAmount = 0;
           this.balVouchers = 0;
           this.redeemedAmt = 0;
           per = 0;
           let d = new Date(strtdate);
           nxtDueDate = d.toDateString();
           // console.log(nxtDueDate);
       }else{

           if(term == 1 ){
               
           this.SubStatus = 'Completed';
           this.payStatus = 'paid';
           this.instaPaid = 1;
           this.instaAmt = monthlyPay;
           this.balAmount = monthlyPay;
           this.balVouchers = 1;
           this.redeemedAmt = 0; 
           per = per;
           nxtDueDate = ' ';
           goalStatus = 'Ready to Redeem';

           } else {
           this.SubStatus = 'In Progress';
           this.payStatus = 'paid';
           this.instaPaid = 1;
           this.instaAmt = monthlyPay;
           this.balAmount = monthlyPay;
           this.balVouchers = 1;
           this.redeemedAmt = 0;  
           per = per;
           nxtDueDate = nxtDueDate;
           }
       }
       
const uid = this.authservice.ActiveUser().uid;

this.Mplan = new Plan( CustId, ActNo, merchantId, merchantName, productName, savings, additionalOffers, name, strtdate, enddate, monthlyPay,
                     merchantPay, totAmnt, redemAmt, term, freq, per, this.SubStatus, goalStatus, reasonCancel, nxtDueDate, bengname, benrelation, cardBrand,
                     cardlast4, cardId, imageURL, merchantLogo, termsAndconditions, benefitsAndcancellation, productType, taxes, appFee, this.payStatus, this.instaPaid, 
                     this.instaAmt, promoDis, promoExpire, this.balAmount, this.balVouchers, this.redeemedAmt, uid);
// console.log(this.plan);
}
    
getMPlan(){
    return this.Mplan;
}

DelMPlan(){
    this.Mplan = undefined;
}


StrMPln(token:string) {
    
    let M = this.Mplan.merchantId;
    let A = this.Mplan.ActNo;
    return this.http.put('https://my-hasha-app.firebaseio.com/test/merchant/plans/'+ M + '/' + A + '/.json/?auth='+ token, this.Mplan).pipe(catchError(this.errorservice.handleError<any>('Store Merchant Plan', "S"))) ;
}

FetchMPln(token: string, M: number) {
    
   
    return this.http.get('https://my-hasha-app.firebaseio.com/test/merchant/plans/'+ M +'.json?auth='+ token).pipe(catchError(this.errorservice.handleError<any>('Fetch Merchant Plan', "S"))) ;
}


UpdateMPlan(token: string, status: string, statusg: string, ActNo: number, reason: string, M: number){

    
    return this.http.patch('https://my-hasha-app.firebaseio.com/test/merchant/plans/'+ M + '/'+ ActNo + '/.json?auth='+ token, { SubStatus: status, goalStatus: statusg, reasonCancel: reason }).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S")));
}
}
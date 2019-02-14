import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Plan } from "../models/plans";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";
import 'rxjs/Rx';
import { Response } from "@angular/http/src/static_response";
import { DateService } from "./date";

@Injectable()


export class PlanService {

plan: Plan ;
pln: Plan;

userId: string;
ActNo: number;
red: string;
instaPaid: number;
payStatus : string;
SubStatus: string;
instaAmt: number;
balAmount: number;
balVouchers: number;
redeemedAmt:number;


constructor(private dateservice: DateService, private errorservice: ErrhandlerService, private af:AngularFireAuth, private db: AngularFireDatabase, private authservice: AuthService,  private http: HttpClient) {
    // console.log('planservice constructor');
}

   

AddPlan(CustId: string, ActNo: number, merchantId: number, merchantName: string, productName: string, savings: number, additionalOffers: string,
         name: string, strtdate: any, enddate: string, monthlyPay: number, merchantPay: number, totAmnt: number, redemAmt: number, term:number, freq: string, per: number,
         goalStatus: string, reasonCancel: string, nxtDueDate: string, bengname: string, benrelation: string,
         cardBrand: string, cardlast4: number, cardId: any,  imageURL: any,  merchantLogo: any, termsAndconditions: string,
         benefitsAndcancellation: string, productType: string, taxes: number, appFee: number, promoDis: number, promoExpire: any) {
            
            let d = new Date();
            let dc = this.dateservice.DateChange(d);
            strtdate = this.dateservice.DateChange(strtdate);
            console.log("start Date in plan service "+ strtdate, 'CurrentDate '+ dc);
     
                    
                this.SubStatus = 'In Progress';
                this.payStatus = 'paid';
                this.instaPaid = 1;
                this.instaAmt = monthlyPay;
                this.balAmount = monthlyPay;
                this.balVouchers = 1;
                this.redeemedAmt = 0; 
                per = per;
                nxtDueDate = nxtDueDate;
                goalStatus = 'Ready to Redeem';

           
            
            
const uid = this.authservice.ActiveUser().uid;

    this.plan = new Plan( CustId, ActNo, merchantId, merchantName, productName, savings, additionalOffers, name, strtdate, enddate, monthlyPay,
                          merchantPay, totAmnt, redemAmt, term, freq, per, this.SubStatus, goalStatus, reasonCancel, nxtDueDate, bengname, benrelation, cardBrand,
                          cardlast4, cardId, imageURL, merchantLogo, termsAndconditions, benefitsAndcancellation, productType, taxes, appFee, this.payStatus, this.instaPaid, 
                          this.instaAmt, promoDis, promoExpire, this.balAmount, this.balVouchers, this.redeemedAmt, uid);
    // console.log(this.plan);
}
    

GetPlan(){
    
    return this.plan;
}

AdPlan(CustId: string, ActNo: number, merchantId: number, merchantName: string, productName: string, savings: number, additionalOffers: string,
       name: string, strtdate: any, enddate: string, monthlyPay: number, merchantPay: number, totAmnt: number, redemAmt: number, term:number, freq: string, per: number,
       goalStatus: string, reasonCancel: string, nxtDueDate: string, bengname: string, benrelation: string,
         cardBrand: string, cardlast4: number, cardId: any, imageURL: any, merchantLogo: any, termsAndconditions: string, benefitsAndcancellation: string,
         productType: string, taxes: number, appFee: number, promoDis: number, promoExpire: any){
             
            let d = new Date();
            let dc = this.dateservice.DateChange(d);
            strtdate = this.dateservice.DateChange(strtdate);
            console.log("start Date in review "+ strtdate, 'CurrentDate '+ dc);
            
            this.SubStatus = 'In Progress';
            this.payStatus = 'paid';
            this.instaPaid = 1;
            this.instaAmt = monthlyPay;
            this.balAmount = monthlyPay;
            this.balVouchers = 1;
            this.redeemedAmt = 0; 
            per = per;
            nxtDueDate = nxtDueDate;
            goalStatus = 'Ready to Redeem';

            const uid = this.authservice.ActiveUser().uid;

    this.plan = new Plan( CustId, ActNo, merchantId, merchantName, productName, savings, additionalOffers, name, strtdate, enddate, monthlyPay,
                          merchantPay, totAmnt, redemAmt, term, freq, per, this.SubStatus, goalStatus, reasonCancel, nxtDueDate, bengname, benrelation, cardBrand,
                           cardlast4, cardId, imageURL, merchantLogo,  termsAndconditions, benefitsAndcancellation, productType, taxes, appFee, this.payStatus, this.instaPaid,
                            this.instaAmt, promoDis, promoExpire, this.balAmount, this.balVouchers, this.redeemedAmt, uid);
    
}

DelPlan() {
    
    this.plan = undefined;
}

StrPln(token:string) {
    let A = this.plan.ActNo;
    // console.log(this.plan);
    const uid = this.authservice.ActiveUser().uid; 
    return this.http.put('https://my-hasha-app.firebaseio.com/test/plans/'+ uid +'/'+ A + '.json/?auth='+ token, this.plan).pipe(catchError(this.errorservice.handleError<any>('Store Plan', "S"))) ;
}

FetchPln(token: string) {
    
    const uid = this.authservice.ActiveUser().uid; 
    return this.http.get('https://my-hasha-app.firebaseio.com/test/plans/'+ uid +'.json?auth='+ token).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan', "S"))) ;
}

FetchPlnwithActNo(token: string, ActNo: number) {

    const uid = this.authservice.ActiveUser().uid; 
    return this.http.get('https://my-hasha-app.firebaseio.com/test/plans/'+ uid + '/'+ ActNo + '.json?auth='+ token).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S"))) ;
}


fetchPlan(plan: Plan){

    this.userId = this.authservice.ActiveUser().uid;
    this.ActNo = plan.ActNo;

const pla = this.db.list(`/test/plans/${this.userId}/${this.ActNo}`).snapshotChanges();
// return pla;
}


// AngularFire
GetData(): Observable<any>{
    this.userId = this.authservice.ActiveUser().uid;
const p = this.db.list(`/test/plans/${this.userId}`).valueChanges();
// console.log(p);
return p;
}



// Update(token: string, red: string){
//     this.ActNo = 1046;
//     this.userId = this.authservice.ActiveUser().uid;
//     return this.http.patch('https://my-hasha-app.firebaseio.com/test/plans/'+ this.userId + '/'+ this.ActNo + '/.json?auth='+ token, {redemStatus: red }).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S")));

// }


UpdatePlan(token: string, status: string, statusg: string, ActNo: number, reason: string, date: string){

    this.userId = this.authservice.ActiveUser().uid;
    return this.http.patch('https://my-hasha-app.firebaseio.com/test/plans/'+ this.userId + '/'+ ActNo + '/.json?auth='+ token, { SubStatus: status, goalStatus: statusg, reasonCancel: reason, enddate: date }).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S")));
    }



UpdatePlanCard(token: string, ActNo: number, brand: string, last4: number, cardId: string){
    this.userId = this.authservice.ActiveUser().uid;
    return this.http.patch('https://my-hasha-app.firebaseio.com/test/plans/'+ this.userId + '/'+ ActNo + '/.json?auth='+ token, { cardBrand: brand, cardlast4: last4, cardId: cardId }).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S")));
}
}
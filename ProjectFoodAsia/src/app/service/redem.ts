import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Redem, Red } from "../models/redem";
import { DateService } from "./date";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";
import { Voucher } from "../models/voucher";
import { cardLink } from "../models/cardlink";
// import { FuturePayment } from "../models/futurePayment";

@Injectable()


export class RedemService {

userId: string;
red: Redem[];
date: Date;
Red: Red;
txnId: string;
SubStatus: string;
payStatus: string;
RedStatus: string;
redFlag: string = 'No';
refFlag: string = 'No';
voucher: Voucher[];
voucherId: string;
merchantVoucherId: string;

link: cardLink;

constructor(private errorservice: ErrhandlerService, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private authservice: AuthService,  private http: HttpClient, private dateservice: DateService) {
    this.afAuth.authState.subscribe((auth) => {
        if (auth) this.userId = auth.uid;
        // console.log(auth, 'redem');
      });
    
}

   

AddRed(CustId: string, ActNo: number, merchantName: string, productName: string, name: string, savings: number,
        additionalOffers: string, RedDate: any, maturedDate: string, Amount: number, term: number, freq: string,
        imageURL: any, goalStatus: string, termsAndconditions: string, txn: string, 
        inTxn: string, totAmt: number, promoDis: number, promoExpire: any, merchantId: number, cardBrand: string,
        cardlast4: number, cardId: string, custUid: string, promoValue: number, merchantVoucherId: any, benefitsAndcancellation: string, ) {
    
    this.red = []; 
    this.RedStatus = 'null';
    this.date = this.dateservice.DateChange(RedDate);  
    
    let d = new Date();
    let dc = this.dateservice.DateChange(d);
    
    promoValue = (Amount + promoValue);

    console.log("start Date in redem service "+ RedDate, 'CurrentDate '+ dc);
   
                    
            
            this.payStatus = 'paid';
            
            this.RedStatus = 'Ready to Redeem';
            this.SubStatus = 'In Progress';
             
            
            this.merchantVoucherId = merchantVoucherId;
    
    for(let i=1; i<=term; i++ ) {

        let A = ActNo.toString();
        let D = this.date.toString();

        this.red.push(new Redem( CustId, ActNo, merchantName, productName, name, savings, additionalOffers, this.date, 
                                Amount, this.RedStatus, this.payStatus, i, freq, (A + D), txn, inTxn, merchantId, cardBrand,
                                 cardlast4, cardId, custUid, imageURL, promoValue, this.merchantVoucherId, promoValue, termsAndconditions, benefitsAndcancellation ));
        this.date = this.dateservice.dateformat(RedDate, i, freq);
        this.date =  this.dateservice.DateChange(this.date);
        this.payStatus = 'due';
        txn ='null';
        inTxn = 'null';
        this.merchantVoucherId = 'null';
        goalStatus = null;
        
               
            }
    this.Red = new Red (ActNo, name, this.SubStatus, merchantName, freq, imageURL, goalStatus, termsAndconditions, RedDate, maturedDate, this.redFlag, this.refFlag, totAmt, promoDis, promoExpire, this.red);
// console.log(this.Red);
}


getRed(){
    return this.Red;
}

StrRed(token:string) {
    let A = this.red[0].ActNo;
    const uid = this.authservice.ActiveUser().uid; 

    return this.http.put('https://my-hasha-app.firebaseio.com/test/redemptions/'+ uid +'/'+ A + '.json/?auth='+ token, this.Red).pipe(catchError(this.errorservice.handleError<any>('Store Red', "S"))) ;
}

FetchRed(token:string) {
    
    const uid = this.authservice.ActiveUser().uid; 
    return this.http.get('https://my-hasha-app.firebaseio.com/test/redemptions/'+ uid +'.json/?auth='+ token).pipe(catchError(this.errorservice.handleError<any>('Fetch Red', "S"))) ;
}

FetchRedwithAct(token:string, Act: number) {
    
    const uid = this.authservice.ActiveUser().uid; 
    return this.http.get('https://my-hasha-app.firebaseio.com/test/redemptions/'+ uid + '/'+  Act +'.json/?auth='+ token).pipe(catchError(this.errorservice.handleError<any>('FetchRedwitAct', "S"))) ;
}


getVouchers(): Observable<any[]>  {

    const redVouchers = this.db.list(`/test/vouchers/${this.userId}`).valueChanges();
   
    return redVouchers;
}


UpdateRed(token: string, status: string, statusg: string, ActNo: number, Fpay: Redem[] ){
    // console.log('red');
    this.userId = this.authservice.ActiveUser().uid;
    
    for(let i=0; i<Fpay.length; i++){

        if(Fpay[i].payStatus == 'due'){
            this.UpdateRedVou(token, status, ActNo, i).subscribe(()=> {});
        }
    }

    return this.http.patch('https://my-hasha-app.firebaseio.com/test/redemptions/'+ this.userId + '/'+ ActNo + '/.json?auth='+ token, { SubStatus: status, goalStatus: statusg }).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S")));
}


UpdateRedVou(token: string, status: string, ActNo: number, i: number){

    return this.http.patch('https://my-hasha-app.firebaseio.com/test/redemptions/'+ this.userId + '/'+ ActNo + '/Red/'+ i +'/.json?auth='+ token, { payStatus: status }).pipe(catchError(this.errorservice.handleError<any>('Fetch Plan with ActNo', "S")));
}


GetFuturPay(){
    // const userid = this.authservice.ActiveUser().uid;
    return this.red;
}

FetchFuturPay(token:string, ActNo: number){
     const userid = this.authservice.ActiveUser().uid;
        return this.http.get('https://my-hasha-app.firebaseio.com/test/redemptions/'+ userid + '/' + ActNo + '/Red.json?auth='+ token).pipe(catchError(this.errorservice.handleError<any>('Fetch Future Payments', "S"))) ;
    }


// Update Card
UpdatePayCard(token: string, ActNo: number, brand: string, last4: number, cardId: string, pay: Redem[] ){
    let userId = this.authservice.ActiveUser().uid;

    for(let i=0; i< pay.length; i++){
        // console.log(pay[i].InstStatus, pay.length);
         if(pay[i].payStatus == 'due'){

             this.UpdateCard(token, userId, ActNo, brand, last4, cardId, i).subscribe(() => {
                  
             });
         }
     }

    
}

UpdateCard(token: string, uid: any, ActNo: number, brand: string, last4: number, cardId: string, i: number){
    
        return this.http.patch('https://my-hasha-app.firebaseio.com/test/redemptions/'+ uid +'/'+ ActNo +'/Red/'+ i +'/.json?auth='+ token, { cardBrand: brand, cardlast4: last4, cardId: cardId });
     }



AddVoucher( CustId: string, ActNo: number, merchantName: string, productName: string, name: string, savings: number,
           additionalOffers: string, InstDate:any, InstAmount: number, RedStatus: string, freq: string, imageURL: any, txnId: string,
            inTxnId: string, merchantId: number, cardBrand: string, cardlast4: number, cardId: string, custUid: string, promoValue: number, 
            merchantVoucherId1: any, merchantVoucherId2: any, termsAndconditions: string, benefitsAndcancellation: string, issue: string, promoExpire: any){

            this.voucher = [];
            RedStatus = 'Ready to Redeem';
            this.payStatus = 'paid';
            this.date = this.dateservice.DateChange(InstDate);
            
            promoValue = (InstAmount + promoValue);
            
            let A = ActNo.toString();
            let D = this.date.toString();
            this.voucherId = (A + D);
        
            if(issue == 'No'){

                for(let i=0; i<=1 ; i++ ){

                    this.voucher.push(new Voucher(CustId, ActNo, merchantName, productName, name, savings, additionalOffers,
                                      InstDate, InstAmount, RedStatus, this.payStatus, i, freq, imageURL, this.voucherId, txnId, inTxnId, merchantId,
                                       cardBrand, cardlast4, cardId, custUid, promoValue, merchantVoucherId2, promoValue, termsAndconditions, benefitsAndcancellation, promoExpire));
    
                    merchantVoucherId2 = merchantVoucherId1;  
                    InstAmount = 10;    
                    promoValue = 10;           
                    this.voucherId = this.voucherId + 'g_000';
                }


            } else if(issue == 'Yes'){

                let i = 0;
                this.voucher.push(new Voucher(CustId, ActNo, merchantName, productName, name, savings, additionalOffers,
                    InstDate, InstAmount, RedStatus, this.payStatus, i, freq, imageURL, this.voucherId, txnId, inTxnId, merchantId,
                     cardBrand, cardlast4, cardId, custUid, promoValue, merchantVoucherId2, promoValue, termsAndconditions, benefitsAndcancellation, promoExpire));

            }

            

    console.log(this.voucher);
}

getData(){
    return this.voucher;
}


strVoucher(token: string){
        
   let uid = this.authservice.ActiveUser().uid;

    for(let i=0; i < this.voucher.length ; i++) {
        this.StrVou(token, uid, i).subscribe(() => {

        });
    }
    
}

StrVou(token: string, uid: string, i: number){

    let voucherId = this.voucher[i].voucherId;
    // console.log(voucherId);

    return this.http.put('https://my-hasha-app.firebaseio.com/test/vouchers/'+ uid +'/'+ voucherId +'.json?auth='+ token, this.voucher[i]);
}
// getVoucher(){

//     const redVouchers = this.db.list(`/test/merchant/voucherIDs`).valueChanges();
   
//     return redVouchers;
// }

getVoucherIDs(merID): Observable<any[]>  {

    const redVouchers = this.db.list(`/test/merchant/voucherIDs/${merID}`).valueChanges();
   
    return redVouchers;
}



filterIDforGift(merID): Observable<any[]>{

    return this.db.list(`/test/merchant/voucherIDs/${merID}/g10`, ref => ref.orderByChild('usedStatus').equalTo('No')).snapshotChanges();      
}

filterIDforPay(merID, pay: number): Observable<any[]>{

    return this.db.list(`/test/merchant/voucherIDs/${merID}/p${pay}`, ref => ref.orderByChild('usedStatus').equalTo('No')).snapshotChanges();      
}

updateVoucherID(merID: number, token: string, key1: any, key2: any, pay: number, flag: string){

    // console.log(key1, key2);
    if(flag == 'No'){

        this.updateGiftVoucherID(merID, token, key1).subscribe(() => {

        });
    
        return this.http.patch('https://my-hasha-app.firebaseio.com/test/merchant/voucherIDs/'+ merID + '/p'+ pay +'/' + key2 +'/.json?auth='+ token, { usedStatus: 'Yes'});

    } else if(flag == 'Yes'){

        return this.http.patch('https://my-hasha-app.firebaseio.com/test/merchant/voucherIDs/'+ merID + '/p'+ pay +'/' + key2 +'/.json?auth='+ token, { usedStatus: 'Yes'});
    
    }
    
}


updateGiftVoucherID(merID: number, token: string, key1: any){

    return this.http.patch('https://my-hasha-app.firebaseio.com/test/merchant/voucherIDs/'+ merID + '/g10/'+ key1 +'/.json?auth='+ token, { usedStatus: 'Yes'});

}

getVoucherData(vou: Voucher) : Observable<any[]>{

    let uid = vou.custUid;
    let A = vou.ActNo;

    const redVouchers = this.db.list(`/test/vouchersData/${uid}/${A}`).valueChanges();
   
    return redVouchers;
}


// Linking card

addCardLink( CustId: string, merchantName: string, InstDate:any, txnId: string, merchantId: number, cardBrand: string,
             cardlast4: number, cardId: string, custUid: string, merchantVoucherId: any,){

        this.link = new cardLink(CustId, merchantName, InstDate, txnId, merchantId, cardBrand,
                                 cardlast4, cardId, custUid, merchantVoucherId)        
}

StrCardLink(token: string){
 
    return this.http.post('https://my-hasha-app.firebaseio.com/test/giftVouchers_issued.json?auth='+ token, this.link);


}

FetchCardLink(token: string){
 
    return this.http.get('https://my-hasha-app.firebaseio.com/test/giftVouchers_issued.json?auth='+ token);


}
}
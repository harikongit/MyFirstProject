import { Injectable } from "@angular/core";
import { AutoPayment } from "../models/autoPayment";
import { AuthService } from "./auth";
import { Http } from "@angular/http";
import { DateService } from "./date";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";
import 'rxjs/Rx';
import { Response } from "@angular/http/src/static_response";
// import { FuturePayment } from "../models/futurePayment";


import * as JsBarcode from 'jsbarcode';


@Injectable() 

export class AutoPayService{

auto: AutoPayment;
date: any;
desc: string;
payStatus: string;
baseCode: any;
// pay: FuturePayment[];
    
    constructor(private errorservice: ErrhandlerService, private dateservice: DateService, private authservice: AuthService, private http: Http) {}

AddAuto( CustId: string, ActNo: number, Custuid: string, InstDate: any, InstAmount: number, InstStatus: string, voucherId: any, term: number, freq: string,
     cardId: string, taxes: number, appFee: number, merchantId: number, desc: string,  merchantVoucherId: any, voucherType: any){
    
    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {
        
        Custuid = this.authservice.ActiveUser().uid;
        this.date = this.dateservice.DateChange(InstDate);
        
        let d = new Date();
        let dc = this.dateservice.DateChange(d);
        if(InstDate != dc){
            this.payStatus = 'due';
        }else{
            this.payStatus = 'paid'; 
        }
        

        for( let i=1; i<=term; i++){

            let A = ActNo.toString();
            let D = this.date.toString();
            
            if(merchantVoucherId != 'null'){
                this.baseCode = this.textToBase64Barcode(merchantVoucherId);
            } else {
                this.baseCode = 'null';
            }
            
            // console.log(this.baseCode, A);
            this.desc = 'Charge for ' + (A + D);
            this.auto = new AutoPayment( CustId, ActNo, Custuid, this.date, InstAmount, this.payStatus, (A + D), cardId, taxes, appFee, merchantId, this.desc, this.baseCode, merchantVoucherId, voucherType);
            this.date = this.dateservice.dateformat(InstDate, i, freq);
            this.date =  this.dateservice.DateChange(this.date);
            this.payStatus = 'due'; 
            merchantVoucherId = 'null';
               
            this.StrAuto(token, (A + D)).subscribe(() => {
                    
            });
        }

    });

    
}

textToBase64Barcode(text){
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128"});
    return canvas.toDataURL("image/png");
  }



StrAuto(token: string, voucherId: any){
  return  this.http.put('https://my-hasha-app.firebaseio.com/test/auto_pay/'+ voucherId +'/.json?auth='+ token, this.auto).pipe(catchError(this.errorservice.handleError<any>('Store AutoPay', "S"))) ;;
}

FetchAuto(token: string, voucherId: any) {
   return this.http.get('https://my-hasha-app.firebaseio.com/test/auto_pay/'+ voucherId +'/.json?auth='+ token)
   .map((res: Response) => { return res.json(); } ).pipe(catchError(this.errorservice.handleError<any>('Fetch AutoPay', "S"))) ;;
}



UpdateAutoPay(token: string, ActNo: number, voucherId: string, brand: string, last4: number, cardId: string, date: Date){
    return  this.http.patch('https://my-hasha-app.firebaseio.com/test/source_changed/'+ voucherId +'/.json?auth='+ token, { ActNo: ActNo, cardBrand: brand, cardLast4: last4, cardId: cardId, InstDate: date  });
}

UpdateAutoPayCancel(token: string, ActNo: number, voucherId: string, status: string, date: Date){
    return  this.http.patch('https://my-hasha-app.firebaseio.com/test/futurePayment_cancelled/'+ voucherId +'/.json?auth='+ token, { ActNo: ActNo, SubStatus: status, InstDate: date  });
}

}
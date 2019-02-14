import { Component, OnInit, Directive } from '@angular/core';

// service
import { AuthService } from '../service/auth';
import { PlanService } from '../service/plans';
import { BeneficiaryService } from '../service/beneficiary';
import { LastIdService } from '../service/lastId';
import { RedemService } from '../service/redem';


// models
import { Plan } from '../models/plans';



// Loaction
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Ben } from '../models/beneficiary';
// import { FuturePayment } from '../models/futurePayment';

import { StripepaymentService } from '../service/stripe/service/payment/stripepayment.service';
import { OrderService } from '../service/order';
import { MerchantPlansService } from '../service/merchantplans';
import { AutoPayService } from '../service/autoPay';
import { Redem, Red } from '../models/redem';
import { Order } from '../models/order';
// import { MerchantPlans } from '../models/merchantplans';
import { DateService } from '../service/date';
import * as firebase from 'firebase';
import { Voucher } from '../models/voucher';
import { UserService } from '../service/user';
import { KeyService } from '../service/key';
import { cardLink } from '../models/cardlink';





@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
   
 
  red: Red;
  order: Order;
  plan: Plan;
  newplan: Plan;
  MPlan: Plan;
  ben: Ben;
  freq: string;
  fre: string;
//   pay: FuturePayment[];
  fpay: Redem[]; 


bene: boolean = false;
main: boolean = true;
card: boolean = false;
date: any;
desc: string;

// beneficiary
gname: string;
relation: string;
bensta: boolean = true;
cardDet: any;
  
cardsta: boolean = true;
cardBrand: string;
cardlast4: number;
cardId: any;
loading: boolean = false;

tnc: string;
bnc: string;

tax: number;
fee: number;
tot: number;

ActStatus: string;
payStatus: string;
redStatus: string;
inTxn: string;
nxtDueDate: any;
vou: Voucher[];
merchantVoucherId1: number;
merchantVoucherId2: number;
    key1: any;
    key2: any;
    l: number;
    ActNo: number;
    issue: any;
    giftkey: any;
    do: string;
    cardcount: number;

    

  constructor( private userservice: UserService, private keyservice: KeyService, private lastIdservice: LastIdService, private stripepaymentservice: StripepaymentService, private beneficiaryservice: BeneficiaryService, private lastidservice: LastIdService, 
              private router: Router,  private location: Location, 
              private authservice: AuthService, private planservice: PlanService, private dateservice: DateService,
              private redemservice: RedemService, private orderservice: OrderService,
              private merchantservice: MerchantPlansService, private autopayservice: AutoPayService) { 
    // console.log('review in constructor');

    // firebase.auth().onAuthStateChanged( user => {
    //     if(user) {

        
    //       this.router.navigate(['/scheme/addproducts']); 
    //     } 
    //   }); 
  }

  ngOnInit() {
    // console.log('review in NgOninit');
    firebase.auth().onAuthStateChanged( user => {
        if(user) {

            this.OnDo();
          this.router.navigate(['/review']); 
        } 
      }); 
    
   
  }

OnDo(){
   
this.plan = this.planservice.GetPlan();
console.log(this.plan);
this.red = this.redemservice.getRed();
this.tnc = this.plan.termsAndconditions;
this.bnc = this.plan.benefitsAndcancellation;
    

this.tax = ((this.plan.taxes  * this.plan.monthlyPay) / 100);
this.tax = Math.round(this.tax*100) / 100;
// this.tax = 0;
this.fee = ((this.plan.appFee  * this.plan.monthlyPay) / 100);
this.fee = Math.round(this.fee*100) / 100;
    
let A = this.plan.ActNo.toString();
this.date =  this.dateservice.DateChange(this.plan.strtdate);
let D = this.date.toString();
let T = (A + D); 
this.desc = T;

this.ben = this.beneficiaryservice.GetBen();
this.cardBrand = this.plan.cardBrand;
this.cardlast4 = this.plan.cardlast4;
this.cardId = this.plan.cardId;

    if(this.plan.freq == 'Monthly') {
        this.freq = 'Monthly';
        this.fre = 'Monthly';
    } else if(this.plan.freq == 'Weekly') {
        this.freq = 'Weekly';
        this.fre = 'Weekly';

    } else if(this.plan.freq == 'Bi Weekly') {
        this.freq = 'Bi Weekly';
        this.fre = 'Bi Weekly';

    } else if(this.plan.freq == 'Daily') {
        this.freq = 'Daily';
        this.fre = 'Daily';
    }
    
    this.fpay = this.redemservice.GetFuturPay();
    
    if(this.fpay.length == 1){
        this.nxtDueDate  = null;

    } else {

    if(this.plan.instaPaid == 0){
        this.nxtDueDate  = this.fpay[0].InstDate;
    } else if(this.plan.instaPaid == 1){
        this.nxtDueDate  = this.fpay[1].InstDate;
    }
   }
    // console.log(this.nxtDueDate);
    // this.nxtDueDate = this.nxtDueDate.toDateString();
    // console.log(this.nxtDueDate);
// this.getIDs();



}

getIDs(){

    this.redemservice.filterIDforGift(this.plan.merchantId).subscribe((data) => {
        this.merchantVoucherId1 = data[0].payload.val().voucherId;
        this.key1 = data[0].key;
       console.log(this.merchantVoucherId1, this.key1);
    });

    this.redemservice.filterIDforPay(this.plan.merchantId, this.plan.monthlyPay).subscribe((data1) => {
       this.merchantVoucherId2 = data1[0].payload.val().voucherId;
       this.key2 = data1[0].key;
      console.log(this.merchantVoucherId2, this.key2);
   });

}

OnCnfrm(){

    this.authservice.ActiveUser().getIdToken()
      .then((token: string) => {
         this.lastIdservice.getId(token).subscribe((last: number)=> { 
          this.l = last;
          this.Con();
          this.getIDs();
          this.postConfirm();
        });
    });

}

Con() {

    if(this.l != null) 
    {
        this.ActNo = (this.l + 1);  
        this.lastIdservice.AddId(this.ActNo);
        console.log(this.ActNo);   
    }
    else 
    {
        this.ActNo = 1001;
        this.lastIdservice.AddId(this.ActNo); 
        console.log(this.ActNo);
    }
}


 postConfirm() {


this.newplan = this.planservice.GetPlan(); 
// console.log(this.tax, this.fee, this.newplan.grossPay);
this.planservice.AddPlan(this.newplan.CustId, this.ActNo, this.newplan.merchantId, this.newplan.merchantName, this.newplan.productName, this.newplan.savings, this.newplan.additionalOffers, this.newplan.name,  this.newplan.strtdate, this.newplan.enddate, this.newplan.monthlyPay, this.newplan.merchantPay, this.newplan.totAmnt, this.newplan.redemAmt, this.newplan.term, this.newplan.freq, this.newplan.per, this.newplan.goalStatus, this.newplan.reasonCancel, this.nxtDueDate, this.newplan.bengname, this.newplan.benrelation, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.imageURL, this.newplan.merchantLogo, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.newplan.productType, this.tax, this.fee , this.newplan.promoDis, this.newplan.promoExpire);  
this.merchantservice.AddMPlan(this.newplan.CustId, this.newplan.ActNo, this.newplan.merchantId, this.newplan.merchantName, this.newplan.productName, this.newplan.savings, this.newplan.additionalOffers, this.newplan.name,  this.newplan.strtdate, this.newplan.enddate, this.newplan.monthlyPay, this.newplan.merchantPay, this.newplan.totAmnt, this.newplan.redemAmt, this.newplan.term, this.newplan.freq, this.newplan.per, this.newplan.goalStatus, this.newplan.reasonCancel, this.nxtDueDate, this.newplan.bengname, this.newplan.benrelation, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.imageURL, this.newplan.merchantLogo, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.newplan.productType, this.tax, this.fee , this.newplan.promoDis, this.newplan.promoExpire);
this.newplan = this.planservice.GetPlan(); 



// console.log(this.newplan.ActNo, this.newplan.grossPay,  this.newplan.cardId, this.newplan.appFee, this.newplan.merchantId, this.desc);
let d = new Date();
let dc = this.dateservice.DateChange(d);
console.log("start Date in review "+ this.newplan.strtdate, 'CurrentDate '+ dc);

if(this.newplan.strtdate == dc){

    this.loading = true;
    this.main = false;
    
    // console.log(this.newplan.ActNo, this.newplan.merchantPay,  this.newplan.cardId, this.newplan.appFee);
    const payconnect = this.stripepaymentservice.payConnectCharge(this.newplan.ActNo, this.newplan.monthlyPay,  this.newplan.cardId, this.newplan.appFee, this.newplan.merchantId, this.desc)
    .subscribe(data=> {  
                        this.inTxn = this.generateTxn(this.newplan.ActNo);
                         this.StoreData(data.id, this.inTxn);  },
               err => {   this.loading = false; 
                        console.log("error:",err); alert(err.error.message);
                        this.OnMain();

                     });
 }else{
     this.StoreData(null, null);
 }
}


generateTxn(ActNo: number){
      
    let n = Math.round(Math.random()*100000000); 
    // console.log(n);
    let ns = n.toString();

    // console.log(ns.length);
      if(ns.length > 6){
          ns = ns.substr(0,6);
        //   console.log(ns);
      }

    let A = ActNo.toString();
    let txn = A + ns;

return txn
}


 StoreData(txn: string, inTxn: string) {
    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => { 

    this.Redem(txn, inTxn, token);
    this.autopayservice.AddAuto(this.newplan.CustId, this.newplan.ActNo, this.newplan.CustId, this.newplan.strtdate, this.newplan.monthlyPay, this.newplan.SubStatus, (this.newplan.ActNo + this.newplan.enddate), this.newplan.term, this.newplan.freq, this.newplan.cardId, this.newplan.taxes, this.newplan.appFee, this.newplan.merchantId, this.desc, this.merchantVoucherId2, ('p' + this.newplan.monthlyPay) );
    
        
       this.planservice.StrPln(token).subscribe(() => { 
         this.planservice.DelPlan();
        //    this.paymentservice.StrPay(token).subscribe(() => { 
               this.lastidservice.AddOn(token).subscribe(() => {
                //    this.paymentservice.StrFuturPay(token, this.newplan.ActNo).subscribe(() => {
                       this.redemservice.StrRed(token).subscribe(() => {  
                           this.orderservice.StrOrder(token).subscribe(() => {
                               this.merchantservice.StrMPln(token).subscribe(() => {
                                   this.redemservice.updateVoucherID(this.newplan.merchantId, token, this.key1, this.key2, this.newplan.monthlyPay, this.issue).subscribe(() => {
                                    this.userservice.UpdateGiftVoucher(token, this.giftkey).subscribe(() => {
                                       this.redemservice.strVoucher(token)
                                        this.planservice.DelPlan();
                                        if(this.do == 'Yes'){
                                            this.redemservice.StrCardLink(token).subscribe(() => {

                                            });
                                        }
                                   
  
                                    });   
                                   });  
                               });
                           });  
                       });
                //    }); 
            //    });
           });
           this.router.navigate(['scheme/subscriptions']);
           this.loading = false;
       });
    });
 }

//  handlePayment(ActNo: number, Amount: number, sourceId: any) {
//     const payconnect = this.stripepaymentservice.payConnectCharge(ActNo, Amount, sourceId)
//     .subscribe(data=> {  console.log(data); },
//     err => { console.log(err);
//     });
//     }




Redem(txn: string, inTxn: string, token: string){

    this.redemservice.FetchCardLink(token).subscribe((datal: any) => {

        console.log(datal);

        if(datal == null || datal == undefined){

            this.do = 'Yes';

    this.userservice.FetchDet(token).subscribe((data) => {

        let key = this.keyservice.getkey(data);
        data = this.keyservice.conData(data);

        console.log(data, data[0].custGiftVoucherIssued);
        this.giftkey = key[0];

        this.issue = data[0].custGiftVoucherIssued;

        this.vou = this.redemservice.getData();
        console.log(this.vou);

        const uid = this.authservice.ActiveUser().uid;
        this.redemservice.AddRed(this.newplan.CustId, this.newplan.ActNo,this.newplan.merchantName, this.newplan.productName, this.newplan.name, this.newplan.savings, this.newplan.additionalOffers, this.newplan.strtdate, this.newplan.enddate,  this.newplan.monthlyPay,  this.newplan.term, this.newplan.freq, this.newplan.imageURL, this.newplan.goalStatus, this.newplan.termsAndconditions, txn , inTxn , this.newplan.totAmnt, this.newplan.promoDis, this.newplan.promoExpire, this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, uid, this.newplan.promoDis, this.merchantVoucherId2, this.newplan.benefitsAndcancellation);
        this.redemservice.AddVoucher(this.newplan.CustId, this.newplan.ActNo,this.newplan.merchantName, this.newplan.productName, this.newplan.name, this.newplan.savings, this.newplan.additionalOffers, this.newplan.strtdate, this.newplan.monthlyPay, this.newplan.goalStatus,  this.newplan.freq, this.newplan.imageURL, txn , inTxn , this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, uid, this.newplan.promoDis, this.merchantVoucherId1, this.merchantVoucherId2, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.issue, this.newplan.promoExpire ); 

    });

    this.redemservice.addCardLink(this.newplan.CustId, this.newplan.merchantName, this.newplan.strtdate, txn, this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.custUid, this.merchantVoucherId1);

} else {

    datal = this.keyservice.conCardLink(datal);
    console.log(datal, datal[0]);

    this.vou = this.redemservice.getData();
    console.log(this.vou);
    const uid = this.authservice.ActiveUser().uid;



    for(let i=0; i < datal.length; i++){
        if(datal[i].cardlast4 == this.cardlast4 && datal[i].cardBrand == this.cardBrand){
             this.cardcount = 1;
             break;
        } else {
            this.cardcount = 0;
        }

    }

    if(this.cardcount == 1){

    
        this.do = 'No';

        this.issue = 'Yes';
        this.redemservice.AddRed(this.newplan.CustId, this.newplan.ActNo,this.newplan.merchantName, this.newplan.productName, this.newplan.name, this.newplan.savings, this.newplan.additionalOffers, this.newplan.strtdate, this.newplan.enddate,  this.newplan.monthlyPay,  this.newplan.term, this.newplan.freq, this.newplan.imageURL, this.newplan.goalStatus, this.newplan.termsAndconditions, txn , inTxn , this.newplan.totAmnt, this.newplan.promoDis, this.newplan.promoExpire, this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, uid, this.newplan.promoDis, this.merchantVoucherId2, this.newplan.benefitsAndcancellation);
        this.redemservice.AddVoucher(this.newplan.CustId, this.newplan.ActNo,this.newplan.merchantName, this.newplan.productName, this.newplan.name, this.newplan.savings, this.newplan.additionalOffers, this.newplan.strtdate, this.newplan.monthlyPay, this.newplan.goalStatus,  this.newplan.freq, this.newplan.imageURL, txn , inTxn , this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, uid, this.newplan.promoDis, this.merchantVoucherId1, this.merchantVoucherId2, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation,this.issue, this.newplan.promoExpire ); 

    } else {

        this.do = 'Yes';

        this.userservice.FetchDet(token).subscribe((data) => {

            let key = this.keyservice.getkey(data);
            data = this.keyservice.conData(data);
    
            console.log(data, data[0].custGiftVoucherIssued);
            this.giftkey = key[0];
    
            this.issue = data[0].custGiftVoucherIssued;
    
            this.vou = this.redemservice.getData();
            console.log(this.vou);
    
            const uid = this.authservice.ActiveUser().uid;
            this.redemservice.AddRed(this.newplan.CustId, this.newplan.ActNo,this.newplan.merchantName, this.newplan.productName, this.newplan.name, this.newplan.savings, this.newplan.additionalOffers, this.newplan.strtdate, this.newplan.enddate,  this.newplan.monthlyPay,  this.newplan.term, this.newplan.freq, this.newplan.imageURL, this.newplan.goalStatus, this.newplan.termsAndconditions, txn , inTxn , this.newplan.totAmnt, this.newplan.promoDis, this.newplan.promoExpire, this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, uid, this.newplan.promoDis, this.merchantVoucherId2, this.newplan.benefitsAndcancellation);
            this.redemservice.AddVoucher(this.newplan.CustId, this.newplan.ActNo,this.newplan.merchantName, this.newplan.productName, this.newplan.name, this.newplan.savings, this.newplan.additionalOffers, this.newplan.strtdate, this.newplan.monthlyPay, this.newplan.goalStatus,  this.newplan.freq, this.newplan.imageURL, txn , inTxn , this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, uid, this.newplan.promoDis, this.merchantVoucherId1, this.merchantVoucherId2, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.issue, this.newplan.promoExpire ); 
    
        });
    
        this.redemservice.addCardLink(this.newplan.CustId, this.newplan.merchantName, this.newplan.strtdate, txn, this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.custUid, this.merchantVoucherId1);
    }
}

});
    
    // this.paymentservice.AddFuturePay(this.newplan.CustId, this.newplan.ActNo, this.newplan.strtdate, this.newplan.monthlyPay, this.newplan.term, this.newplan.freq, this.newplan.merchantName, this.newplan.productName, this.newplan.name, uid, this.newplan.merchantId, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, txn , inTxn);
}



 OnBack() {
  this.location.back();
 }

 


OnBen() {
   
    this.bene = true;
    this.main = false;
    this.card = false;
    // console.log(this.bene, this.main, this.card);
}
OnMain() {
    this.bene = false;
    this.main = true;
    this.card = false;
}

OnBenSta(ben: Ben) {


    if(ben == null){
        this.bensta = false;
    } else {

    
    this.ben = ben;
    this.gname = this.ben.gname;
    this.relation = this.ben.relation;
    
    this.GetData();


    this.planservice.AddPlan(this.newplan.CustId, this.newplan.ActNo, this.newplan.merchantId, this.newplan.merchantName, this.newplan.productName, this.newplan.savings, this.newplan.additionalOffers, this.newplan.name,  this.newplan.strtdate, this.newplan.enddate, this.newplan.monthlyPay, this.newplan.merchantPay, this.newplan.totAmnt, this.newplan.redemAmt, this.newplan.term, this.newplan.freq, this.newplan.per, this.newplan.goalStatus, this.newplan.reasonCancel, this.newplan.nxtDueDate, this.gname, this.relation, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.imageURL, this.newplan.merchantLogo, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.newplan.productType, this.newplan.taxes, this.newplan.appFee, this.newplan.promoDis, this.newplan.promoExpire);
    this.merchantservice.AddMPlan(this.newplan.CustId, this.newplan.ActNo, this.newplan.merchantId, this.newplan.merchantName, this.newplan.productName, this.newplan.savings, this.newplan.additionalOffers, this.newplan.name,  this.newplan.strtdate, this.newplan.enddate, this.newplan.monthlyPay, this.newplan.merchantPay, this.newplan.totAmnt, this.newplan.redemAmt, this.newplan.term, this.newplan.freq, this.newplan.per, this.newplan.goalStatus, this.newplan.reasonCancel, this.nxtDueDate, this.newplan.bengname, this.newplan.benrelation, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.imageURL, this.newplan.merchantLogo, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.newplan.productType, this.tax, this.fee , this.newplan.promoDis, this.newplan.promoExpire);
    this.orderservice.AddOrder(this.order.CustId, this.order.ActNo, this.order.merchantName, this.order.productName, this.order.savings, this.order.additionalOffers, this.order.name, this.order.strtdate, this.order.enddate, this.order.pay, this.gname, this.relation, this.order.cardBrand, this.order.cardlast4, this.order.cardId, this.newplan.imageURL);
    // this.redemservice.AddRed(this.plan.CustId, this.plan.ActNo, this.plan.merchantName, this.plan.productName, this.plan.name, this.plan.savings, this.plan.additionalOffers, this.plan.strtdate, this.plan.enddate, this.red.Red[0].DueDate, this.red.Red[0].Amount, this.red.Red[0].Amtmatured, this.red.Red[0].RedStatus, this.red.Red[0].ActStatus, this.plan.term, this.plan.freq, (this.plan.ActNo + this.plan.enddate));
    this.bensta = true;
    this.DelData();
}
}

// OnClick() {
// this.click = true;
// }

// Payment method
OnCard(){
    this.card = true;
    this.bene = false;
    this.main = false;
}

OnCardSta(card: any) {

    if(card == null) {
        this.cardsta = false;
    } else {

        this.cardDet = card;
        this.cardsta = true;
        this.cardBrand = this.cardDet.card.brand;
        this.cardlast4 = this.cardDet.card.last4;
        this.cardId = this.cardDet.id;

this.GetData();

this.planservice.AddPlan(this.newplan.CustId, this.newplan.ActNo, this.newplan.merchantId, this.newplan.merchantName, this.newplan.productName, this.newplan.savings, this.newplan.additionalOffers, this.newplan.name,  this.newplan.strtdate, this.newplan.enddate, this.newplan.monthlyPay, this.newplan.merchantPay, this.newplan.totAmnt, this.newplan.redemAmt, this.newplan.term, this.newplan.freq, this.newplan.per, this.newplan.goalStatus, this.newplan.reasonCancel, this.newplan.nxtDueDate, this.gname, this.relation, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.imageURL, this.newplan.merchantLogo, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.newplan.productType, this.newplan.taxes, this.newplan.appFee, this.newplan.promoDis, this.newplan.promoExpire);
this.merchantservice.AddMPlan(this.newplan.CustId, this.newplan.ActNo, this.newplan.merchantId, this.newplan.merchantName, this.newplan.productName, this.newplan.savings, this.newplan.additionalOffers, this.newplan.name,  this.newplan.strtdate, this.newplan.enddate, this.newplan.monthlyPay, this.newplan.merchantPay, this.newplan.totAmnt, this.newplan.redemAmt, this.newplan.term, this.newplan.freq, this.newplan.per, this.newplan.goalStatus, this.newplan.reasonCancel, this.nxtDueDate, this.newplan.bengname, this.newplan.benrelation, this.newplan.cardBrand, this.newplan.cardlast4, this.newplan.cardId, this.newplan.imageURL, this.newplan.merchantLogo, this.newplan.termsAndconditions, this.newplan.benefitsAndcancellation, this.newplan.productType, this.tax, this.fee , this.newplan.promoDis, this.newplan.promoExpire);
this.orderservice.AddOrder(this.order.CustId, this.order.ActNo, this.order.merchantName, this.order.productName, this.order.savings, this.order.additionalOffers, this.order.name, this.order.strtdate, this.order.enddate, this.order.pay, this.order.bengname, this.order.benrelation, this.cardBrand, this.cardlast4, this.cardId, this.newplan.imageURL);
this.DelData();
}
}


GetData(){
     
    this.newplan = this.planservice.GetPlan();
    // this.payment = this.paymentservice.getPay();
    
    this.order = this.orderservice.getOrder(); 
    this.MPlan = this.merchantservice.getMPlan();
}

DelData(){
    this.newplan = undefined;
    // this.payment = undefined;
    this.order = undefined;
    this.MPlan = undefined;
}




}

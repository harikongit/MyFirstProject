import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

// form
import { NgForm } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


// Location
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// models
// import { FuturePayment } from '../models/futurePayment';
import { Plan } from '../models/plans';


// service
import { AuthService } from '../service/auth';
import { KeyService } from '../service/key';
import { PlanService } from '../service/plans';
import { BeneficiaryService } from '../service/beneficiary';

// rxjs
import 'rxjs/add/operator/finally';
import 'rxjs/Rx';
import { RedemService } from '../service/redem';
import { PaymentsaveService } from '../service/stripe/service/paymentsave/paymentsave.service';
import { CardService } from '../service/card';
import { DateService } from '../service/date';
import { AutoPayService } from '../service/autoPay';
import { AutoPayment } from '../models/autoPayment';
import { MerchantPlansService } from '../service/merchantplans';

import * as firebase from 'firebase';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { MessageService } from '../service/message';
import { Redem } from '../models/redem';
import { OrderService } from '../service/order';



// datepicker
import * as moment from 'moment';


// Current Date
const currDate =new Date();

type UserFields = 'name' | 'gender' | 'benEmail';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})


export class PaymentsComponent implements OnInit, AfterViewInit, OnDestroy {
  car(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  
  fpayc: Redem[];
  fpay: Redem[];
  payhist: Redem[];
  plan: Plan;
  merchnt: string;
  product: string;
  name: string;
  ActNo: number;
  SubStatus: string;
  duration: number;
  reason: string;
  click: boolean = false;

  check: boolean = false;
  options = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  planStatus: string;


  paidmon: number = 0 ;
  unpaidmon: number = 0;
  add: boolean = false;
  plans:Plan[];
  count: number;
  Fpay: Redem[];
  date: any;

  autoPay: AutoPayment;
  aPay: AutoPayment[] = [];
  merchantId: number;
  noplansflag: boolean = false;
  plansflag: boolean = false; 
  splans: Plan[];
  planscopy: Plan[];
  goalStatus: any;
  gStatus: any;

  clickA: boolean = true;
  clickO:boolean = false;
  clickC: boolean = false;
  clickW:boolean = false;
  clickG:boolean = false;
  text: string;
  freq: string;
  cardId: string;
  model: { year: number; month: number; day: number; };
  edate: string;
  res: string = 'No';
  
  constructor(private orderservice: OrderService, private msgService: MessageService, public dialog : MatDialog, private merchantservice: MerchantPlansService, private autopayservice: AutoPayService, private dateservice: DateService, private keyservice: KeyService, private authservice: AuthService,
              private planservice: PlanService, private router: Router, private location: Location,
              private beneficiaryservice: BeneficiaryService, private fb: FormBuilder, private redemservice: RedemService,
              private cd: ChangeDetectorRef, private paymentsaveservice: PaymentsaveService, private cardservice: CardService) { 
  
                
                
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.GetSub();
        this.router.navigate(['/scheme/payments']); 
      } 
    }); 
    
    // this.GetCard();
    // console.log('payments in NgOninit');
  }

GetSub() {
  this.splans = [];
    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {
        this.planservice.FetchPln(token).subscribe((data: Plan[]) => {
          
         if(data){
           this.noplansflag = false;
           this.plansflag =  false;
          this.splans = this.keyservice.conData(data);
          
          this.planscopy = this.splans;
          this.click = true;
         }else{
          //  alert('There are no payments yet');
          this.noplansflag = true;
         }
                         
            });
        });

        this.model = {year: currDate.getFullYear(), month: currDate.getMonth()+1 , day: currDate.getDate()}
        this.edate = moment({year:this.model.year, month:this.model.month-1, day:this.model.day}).format("YYYY-MM-DD");
        
      }



// To Get Payment Data
OnFuturPay(plan: Plan){
  this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {
        this.redemservice.FetchFuturPay(token, plan.ActNo).subscribe((data: Redem[]) => {
        this.Seperate(data);
        
  });
 });
}



// To seperate payment history and future payments
Seperate(data: Redem[]) {
 
  this.merchnt = data[0].merchantName;
  this.product = data[0].productName;
  this.name = data[0].name;
  this.freq = data[0].freq;
  this.fpay = [];
  this.payhist = [];

  for(let i=0; i<data.length; i++){
  
    if(data[i].payStatus == 'Paid' || data[i].payStatus == 'paid' || data[i].payStatus == 'Redeemed' || data[i].payStatus == 'Refunded' ) {

        this.payhist.push(data[i]);
        
      
    } else {

      this.fpay.push(data[i]);
      
    }

   
  }
}



// Cancel Subscription
ToCancel(plan: Plan) {
this.ActNo = plan.ActNo;
this.plan = plan;
this.paidmon = 0;
this.unpaidmon = 0;
this.authservice.ActiveUser().getIdToken()
  .then((token: string) => {
    // this.planservice.FetchPlnwithActNo(token, this.ActNo).subscribe((data1: Plan) => {
      // let pl = data1;
      this.planStatus = plan.SubStatus;
      this.goalStatus = plan.goalStatus;
      this.merchantId = plan.merchantId;
      this.redemservice.FetchFuturPay(token, plan.ActNo).subscribe((data: Redem[]) => {
        
        this.fpayc = data;
        
        if(this.fpayc[0].freq == 'Monthly'){
          this.freq = 'months';
        } else if(this.fpayc[0].freq == 'Weekly'){
          this.freq = 'weeks';
        } else if(this.fpayc[0].freq == 'Bi Weekly'){
          this.freq = 'bi-weeks';
        } else if(this.fpayc[0].freq == 'Daily'){
          this.freq = 'days';
        }

        for(let i=0; i< this.fpayc.length; i++){

        // console.log(this.fpayc.length, this.fpayc[i].InstStatus);

          if(data[i].payStatus == 'paid'){
               this.paidmon++;
              //  console.log(this.paidmon);
          } else if(data[i].payStatus == 'due'){
            this.unpaidmon++;
            // console.log(this.unpaidmon);
          }
        }

      this.merchnt = data[0].merchantName;
      this.product = data[0].productName;
      this.name = data[0].name;
// });
});
});

}


OnClick() {
  this.check = true;
}

OnCancel(rcancel: string) {

  this.authservice.ActiveUser().getIdToken()
  .then((token: string) => {
  
  if(this.plan.instaPaid != 0){
  this.gStatus = 'Ready to Redeem';
  }else{
  this.gStatus = this.plan.goalStatus;
  }
  this.SubStatus = 'Cancelled';
  this.AutoPayCancel(token, this.plan.ActNo, this.SubStatus, this.fpayc);
  this.planservice.UpdatePlan(token, this.SubStatus, this.gStatus, this.ActNo, rcancel, this.edate).subscribe(() => {
  this.redemservice.UpdateRed(token, this.SubStatus, this.gStatus, this.ActNo, this.fpayc).subscribe(() => {
  this.orderservice.UpdateOrder(token, this.SubStatus, this.edate, this.plan.ActNo).subscribe(() => {
  
  this.merchantservice.UpdateMPlan(token, this.SubStatus, this.gStatus, this.ActNo, this.reason, this.merchantId ).subscribe(() => {
  console.log('success');
  this.check = false;
  this.openDialog('Successfully Cancelled','');
  this.GetSub();
  // this.router.navigate(['scheme/payments']);
  });
  });
  });
  });
  });
  }

AutoPayCancel(token: string, ActNo: number, status: string, Fpay: Redem[]){

  for(let i=0; i< Fpay.length; i++){
       
        
    // console.log(pay[i].InstStatus, pay.length);
     if(Fpay[i].payStatus == 'due'){

         this.autopayservice.UpdateAutoPayCancel(token, ActNo, Fpay[i].voucherId, status, Fpay[i].InstDate).subscribe(() => {
              console.log('success');
         });
     }
    }
}
  

// Payment Method
PayMethod(plan: any) {
  this.GetCard();

this.plan = plan;
this.cardId = this.plan.cardId;
this.authservice.ActiveUser().getIdToken()
.then((token: string) => {

this.redemservice.FetchFuturPay(token, this.plan.ActNo).subscribe((data1: Redem[]) => {
this.Fpay = data1;
});
});

}




  // CardsListing
  cards: any;
  keyArra: any;
  cardclick: boolean = false;
  selectedcard: any;
  // result: Charge | Source;

  result: string;
  errMsg: string;

  // The Stripe Elements Card
@ViewChild('cardElement') cardElement: ElementRef;
card: any;
formError: string; 
formComplete = false
totalAmount = 0;
loading = false;


  ngAfterViewInit() {
    
    this.card = this.paymentsaveservice.elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.on('change', (evt: any) => {
      this.result = null;
      this.errMsg = null;
        this.formError = evt.error ? evt.error.message : null
        this.formComplete = evt.complete
        this.cd.detectChanges();
    });
  }


  formHandler(): void {
    this.loading = true;
    let action;
    console.log("pay form - form handler"); 
    
     
      action = this.paymentsaveservice.attachSource(this.card);
      // this.loading = false;
 

    action.subscribe(
      data => {
        this.result = "Card Saved";
        
        // console.log("pay form - emitting data", data); 
        // this.stripeResult.emit(data)
        this.loading = false;
        this.card.destroy();
        this.ngAfterViewInit();
        // this.add = false;
        this.GetCard();
      },
      err => {
        this.errMsg = err.error.message;
        // this.add = false;
        console.log("pay form - error", err); 
        // console.log("pay form - error", err); 
       this.loading = false; 
      }
    );
  }


  ngOnDestroy() {
    this.card.destroy();
  }





Done() {

this.authservice.ActiveUser().getIdToken()
.then((token: string) => {
  this.AutoPay(token, this.plan.ActNo, this.selectedcard.card.brand, this.selectedcard.card.last4, this.selectedcard.id, this.Fpay);
  this.planservice.UpdatePlanCard(token, this.plan.ActNo, this.selectedcard.card.brand, this.selectedcard.card.last4, this.selectedcard.id).subscribe(() => {
   this.redemservice.UpdatePayCard(token,this.plan.ActNo, this.selectedcard.card.brand, this.selectedcard.card.last4, this.selectedcard.id, this.Fpay)
      
      this.GetSub();
      console.log('success');
      this.openDialog('Successfully Updated','');
  });
}).catch(err => { alert('Error is ' + err); });
}


AutoPay(token: string, ActNo: number, brand: string, last4: number, cardId: string, pay: Redem[] ){
  

  for(let i=0; i< pay.length; i++){
       
        
    // console.log(pay[i].InstStatus, pay.length);
     if(pay[i].payStatus == 'due'){

         this.autopayservice.UpdateAutoPay(token, ActNo, pay[i].voucherId, brand, last4, cardId, pay[i].InstDate).subscribe(() => {
              console.log('success');
         });
     }
 }
}

OnAdd(){
  this.result = null;
  this.errMsg = null;
  this.add = true;
}


  OnSelectC(card: any) {
  // this.cardclick = false;
  // this.schdetail.OnCardSta(card);
  this.selectedcard = card;
  this.result = null;
  this.errMsg = null;
  this.add = false;
}


GetCard(){
  this.authservice.ActiveUser().getIdToken()
  .then((token: string) => { 
    // console.log(token);
        this.cardservice.FetchCard(token).subscribe((data: any) => {

          if(data){

          
        this.cards = this.keyservice.conBen(data);
       
      }else{
        this.cards = null;
            // this.openDialog('Please Add a Card');
      }
      });
  });
}


tnc: string;


  OnTerm(t: string){
    
    this.tnc = t;
}
 





//Filter
OnFilter(sta: string) {

  if(sta == 'All'){
 
    
    this.splans = [];
    this.splans = this.planscopy;
   this.clickA = true;
   this.clickW = false;
   this.clickG = false;
   this.clickO = false;
   this.clickC = false;

  }else if(sta == 'In Progress'){
   
    this.plansflag = false;
        this.splans = [];
        this.clickA = false;
        this.clickG = false;
        this.clickW = false;
        this.clickC = false;
        this.clickO = true;

        for(let i=0; i<this.planscopy.length; i++){

            if(this.planscopy[i].SubStatus == 'In Progress'){

                this.splans.push(this.planscopy[i]);
          
            } 
        }

        if(this.splans == [] || this.splans.length == 0){
          this.text = 'In Progress';
          this.plansflag = true;
        }
    console.log(this.splans);

  }else if(sta == 'Upcoming'){

    this.plansflag = false;
        this.splans = [];
        this.clickA = false;
        this.clickG = false;
        this.clickW = true;
        this.clickO = false;
        this.clickC = false;

        for(let i=0; i<this.planscopy.length; i++){

            if(this.planscopy[i].SubStatus == 'Upcoming'){

                this.splans.push(this.planscopy[i]);
          
            } 
        }

        if(this.splans == [] || this.splans.length == 0){
          this.text = 'Upcoming';
          this.plansflag = true;
        }
    console.log(this.splans,this.planscopy);

  }else if(sta == 'Cancelled'){

    this.plansflag = false;
      this.splans = [];
      this.clickA = false;
      this.clickC = true;
      this.clickW = false;
      this.clickO = false;
      this.clickG = false;

      for(let i=0; i<this.planscopy.length; i++){

          if(this.planscopy[i].SubStatus == 'Cancelled'){

              this.splans.push(this.planscopy[i]);
        
          } 
      }

      if(this.splans == [] || this.splans.length == 0){
        this.text = 'Cancelled';
        this.plansflag = true;
      }
    console.log(this.splans);
  }else if(sta == 'Completed'){

    this.plansflag = false;
    this.splans = [];
    this.clickA = false;
    this.clickC = false;
    this.clickW = false;
    this.clickG = true;
    this.clickO = false;

    for(let i=0; i<this.planscopy.length; i++){

        if(this.planscopy[i].SubStatus == 'Completed'){

            this.splans.push(this.planscopy[i]);
      
        } 
    }

    if(this.splans == [] || this.splans.length == 0){
      this.text = 'Completed';
      this.plansflag = true;
    }
  console.log(this.splans);
  }

}



 // Delete
 OnRemove(card: any){
  // console.log(card);

if(this.res == 'Yes'){

  for(let i=0; i<this.splans.length; i++){

    if(this.splans[i].SubStatus == 'In Progress' && this.splans[i].cardId == card.id){
      
    this.count = 1;
    break;
    }
  }
  if(this.count == 1){
    // this.openDialog(' Your request is unsuccessful as it is linked to an Account. Please link another card in My Payments and try again. ');
    this.msgService.add(' Your request is unsuccessful as it is linked to an Account. Please link another card in My Payments and try again. ', 'red');
    this.res = 'No';
  }
  if(this.count != 1){

    this.paymentsaveservice.removeSource(card).subscribe(() => {
      // this.openDialog('Card successfully removed');
      this.msgService.add('Card successfully removed', 'green');
      this.GetCard();
      });
  }
  this.count = null;


} else if(this.res == 'No'){

this.car = card;
this.openDialog('Are you sure you want to remove your card ?', 'con');

}

 
}

// Alert
openDialog(a: string, f: string) {
const dialogConfig = new MatDialogConfig();

dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.hasBackdrop = false;
dialogConfig.role = 'alertdialog';

dialogConfig.data = {
    id: 1,
    title: a,
    flag: f
    };

dialogConfig.panelClass = "bckgrdcolor";
dialogConfig.backdropClass = "myBack";

dialogConfig.position = {
  top: '200px',
  // left: '200px'
};

const dialogRef = this.dialog.open(AlertdialogComponent, dialogConfig);

dialogRef.afterClosed().subscribe(result => {
  console.log("Dialog was closed" );
 console.log("response: " + result);
 if(f == 'con' && result == true){
  console.log(f);
this.res = 'Yes';
this.OnRemove(this.car);
} else {
  this.res = 'No';
  
} 
});
}


}

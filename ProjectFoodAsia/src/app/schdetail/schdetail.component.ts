import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';


// Routing
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
 

// Services
import { ProductService } from '../service/product';
import { AuthService } from '../service/auth';
import { PlanService } from '../service/plans';
import { LastIdService } from '../service/lastId';
import { DateService } from '../service/date';


// model
import { Product } from '../models/product';
import { Plan } from '../models/plans';
import { RedemService } from '../service/redem';
import { BeneficiaryService } from '../service/beneficiary';
import { Ben } from '../models/beneficiary';
import { OrderService } from '../service/order';
import { MerchantPlansService } from '../service/merchantplans';
import { AngularFireAuth } from 'angularfire2/auth';
// import { BeneficiaryComponent } from '../beneficiary/beneficiary.component';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';


// datepicker
import * as moment from 'moment';

import * as firebase from 'firebase';
import { UserService } from '../service/user';
import { KeyService } from '../service/key';
import { cardLink } from '../models/cardlink';

// Current Date
const currDate =new Date();

@Component({
  selector: 'app-schdetail',
  templateUrl: './schdetail.component.html',
  styleUrls: ['./schdetail.component.css']
})
export class SchdetailComponent implements OnInit {
  
  merchantPay: number;
  taxes: number = 0;
  appFee: number = 0;
  index: any;
  term: number;
  product: Product;
  monthlyPay: number;
  totAmnt: number;
  payr: number;
  freq: string;
  sdate: any = null;
  ed: string;
  proname: string; 
  mername: string;
  merId: number;
  name: string;
  l: number;
  ActNo: number;
  per: any;
  instaAmt: number;
  instaStatus: string;
  reasonCancel: string;
  bene: boolean = false;
  main: boolean = true;
  plan: Plan;
  savings: number;
  user: any;
//   red: number = 500;
  ActStatus: string;
  due: string;
  terma: number = 1;
  nxtDueDate: string;
  gname: string;
  relation: string;
  fre: string;
  mname: string;
  pname: string;
  sav: number;
  redStatus: string;
  opts: any = [];
//   opts = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  optis = [];

  ben: Ben;
  bensta: boolean = false;
  click: boolean = false;
  cardDet: any;
  card: boolean = false;
  cardsta: boolean = false;
  cardBrand: string;
  cardlast4: number;
  cardId: any;

  minDate: Date;
  type: string;

 tnc: string;
 bnc: string;
 redem: number;
 payStatus: string;
 goalStatus: string;
 typ: string;
    minDate1: any;
    model: any;
    // sDate: string;


    clickw: boolean = false;
    clickb: boolean = false;
    clickm: boolean = false;
    clickd: boolean = false;
    maxDu: number;
    minDu: number;
    merchantLogo: any;
    clickenable: boolean= false;


    merchantVoucherId1: any;
    merchantVoucherId2: any;
    data: any[];
    issue: any;
    cardcount: number;


    


  constructor( private keyservice: KeyService, private userservice: UserService, public dialog : MatDialog, private dateservice: DateService, private lastIdservice: LastIdService,
              private planservice: PlanService, private authservice: AuthService, private router: Router,
              private activatedroute: ActivatedRoute, private productservice: ProductService,
              private redemservice: RedemService, private orderservice: OrderService, private merchantservice: MerchantPlansService, 
              private af: AngularFireAuth, ) {
              // console.log('schdetail in NgOninit');
    

    // firebase.auth().onAuthStateChanged( user => {
    //     if(user) {
    //     //   console.log(this.index, this.type);
    //     //   this.OnDo();
    //       this.router.navigate(['scheme/addproducts']); 
    //     } 
    //   });
   }

ngOnInit() {
    // console.log('schdetail in NgOninit');
    this.OnDo();   
}

OnDo(){
    
    let d = new Date();
    // console.log(d, this.parseDate(d));
    this.minDate =this.dateservice.DateChange(d);
    this.freq = 'Weekly';
    this.Calf(this.freq);
    
    
    
    
    
    this.minDate1 = {year: currDate.getFullYear(), month: currDate.getMonth()+1 , day: currDate.getDate()}
    // console.log("this.minDate", this.minDate1);

    if(this.sdate == null){
        this.model = this.minDate1;
        this.sdate = moment({year:this.model.year, month:this.model.month-1, day:this.model.day}).format("YYYY-MM-DD");
        // console.log(this.sdate);
    }
   


     this.main = true;
       this.index = this.activatedroute.snapshot.paramMap.get('i');
       this.typ = this.activatedroute.snapshot.paramMap.get('type');
       
       this.af.authState.subscribe(user => {
           if(user){
            this.authservice.ActiveUser().getIdToken()
            .then((token: string) => {
             this.productservice.getData(token,this.index, this.typ).subscribe( (product: Product) => {
         
             this.product = product;
             console.log(this.product);
             this.mname = this.product.merchantName;
             this.pname = this.product.productName;
             this.merchantLogo = this.product.merchantLogo;
             this.sav = this.product.savings;
             this.merId = this.product.merchantId;
             this.tnc = this.product.termsAndconditions;
             this.bnc = this.product.benefitsAndcancellation;
             this.taxes = this.product.taxes;
             this.appFee = this.product.appFee;
             this.minDu = this.product.minDu;
             this.maxDu = this.product.maxDu;
             this.monthlyPay = this.product.pay;
             
            //  this.term = this.minDu;
            //  for(let i = this.minDu; i<= this.maxDu; i++ ){
            //     this.opts.push(i);
            //  }

             this.type = this.product.productType;
             this.Plan();
             this.Calt();
           });
          });
           }
       });
}

    Plan() {
        this.plan = this.planservice.GetPlan();
        
        if(this.plan) {
            this.ed = this.plan.enddate;
            this.totAmnt = this.plan.totAmnt;
            this.savings = this.plan.savings;
            this.monthlyPay = this.plan.monthlyPay;
            this.merchantPay = this.plan.merchantPay;
            this.sdate = this.plan.strtdate;
        
            let d = this.parseDate(this.sdate);
            this.model = {year: d.getFullYear(), month: d.getMonth()+1 , day: d.getDate()};
            console.log(this.sdate, 'new Date' + this.model);
            this.term = this.plan.term;
            this.freq = this.plan.freq;
            this.Calf(this.freq);
            this.name = this.plan.name;
            this.payr = this.plan.redemAmt;
            // this.gname = this.plan.bengname;
            // this.relation = this.plan.benrelation;
            // this.bensta = true;
            this.cardsta = true;
            this.cardBrand = this.plan.cardBrand;
            this.cardlast4 = this.plan.cardlast4;
            this.cardId = this.plan.cardId;
            this.nxtDueDate = this.plan.nxtDueDate;
            this.taxes = this.plan.taxes;
            this.appFee = this.plan.appFee;
            this.merId = this.plan.merchantId;
            this.redem = this.plan.promoDis;
            this.due = this.plan.promoExpire;

            // this.due = this.dateservice.dateFormat(this.sdate, this.term, this.freq);
            if(this.freq == 'Monthly'){
                this.fre = 'months';
      
            } else if(this.freq == 'Weekly'){
                this.fre = 'weeks';

            } else if(this.freq == 'Bi Weekly'){
                this.fre = 'Bi weeks';

            } else if(this.freq == 'Daily'){
                this.fre = 'daily';
            }
        }
        
        
    }


  
         parseDate(input) {
            var parts = input.match(/(\d+)/g);
            // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
            return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
          }
    

Calt() {
    
    console.log(this.product.merchantId);
    
     this.redemservice.filterIDforGift(this.product.merchantId).subscribe((data) => {
         if(data){
            console.log(data);
            this.merchantVoucherId1 = data[0].payload.val().voucherId;
            console.log(this.merchantVoucherId1);
         }
         
     });

     this.redemservice.filterIDforPay(this.product.merchantId, this.product.pay).subscribe((data1) => {

        if(data1){
            
            this.merchantVoucherId2 = data1[0].payload.val().voucherId;
            console.log(this.merchantVoucherId2, data1[0].key);
        }
        
    });
    
    this.totAmnt = (this.term * this.monthlyPay);
   // this.redem = Math.round(((this.product.savings * this.monthlyPay)/100)*100)/100;;
//   console.log(this.redem, this.product.savings, this.monthlyPay);
// this.payr = this.monthlyPay + this.redem;

if(this.monthlyPay == 25){

    this.redem = 2;
    this.payr = 27;
    }
    else if(this.monthlyPay == 50) {
    
    this.redem = 5;
    this.payr = 55;
    }
         
      

      
}

Calf(value: any) {
    // console.log(value);
      this.freq = value;

    //   this.Calt();
      
      if(this.freq){
          this.clickenable = true;
      }
      if(this.freq == 'Monthly'){
          this.fre = 'months';
          this.clickm = true;
          this.clickb = false;
          this.clickw = false;
          this.clickd = false;

      } else if(this.freq == 'Weekly'){
          this.fre = 'weeks';
          this.clickm = false;
          this.clickb = false;
          this.clickw = true;
          this.clickd = false;


      }else if(this.freq == 'Bi Weekly'){
        this.fre = 'Bi weeks';
          this.clickm = false;
          this.clickb = true;
          this.clickw = false;
          this.clickd = false;

      }else if(this.freq == 'Daily'){
            this.fre = 'Daily';
              this.clickm = false;
              this.clickb = false;
              this.clickw = false;
              this.clickd = true;
    }

    this.term = 12;

      if(this.sdate && this.term) {
           this.ed = this.dateservice.dateFormat(this.sdate, this.term, this.freq);
        //    this.nxtDueDate = this.dateservice.dateformat(this.sdate, 1 , this.freq);
        //    var d = new Date(this.nxtDueDate); 
           this.nxtDueDate = null; 
           this.due = this.dateservice.dateformat(this.sdate, this.product.duration , 'Daily');
        //    console.log(this.ed, this.due, this.product.duration);
          
      }
}



Date(e) {
    //   this.sdate = e.target.value;
    // console.log("start date", this.sdate);
     
    this.term = 12;
      this.sdate = moment({year:this.model.year, month:this.model.month-1, day:this.model.day}).format("YYYY-MM-DD");
    //   console.log("start date1", this.sdate);

      if(this.term && this.freq) {
        this.ed = this.dateservice.dateFormat(this.sdate, this.term, this.freq);
        // this.nxtDueDate = this.dateservice.dateformat(this.sdate, 1 , this.freq);
        // var d = new Date(this.nxtDueDate);
        this.nxtDueDate = null;
        this.due = this.dateservice.dateformat(this.sdate, this.product.duration , 'Daily');
    //    console.log(this.ed, this.due, this.product.duration);

      }

}

OnCnfrm(form: NgForm) {

    if(this.cardsta == true){

    

      this.proname = this.product.productName;
      this.mername = this.product.merchantName;
      this.name = form.value.name;
    //   this.sdate = form.value.sdate;
    
      this.authservice.ActiveUser().getIdToken()
      .then((token: string) => {
         this.lastIdservice.getId(token).subscribe((last: number)=> { 
          this.l = last;
          console.log("start Date in schdetail "+ this.sdate, 'CurrentDate '+ this.minDate);
          this.Con();
        //   this.Pay();
         this.FuturePay();   
          this.Redem();
          this.Order();
          this.Mer();
          this.Vou(token);
          this.router.navigate(['review']);     
      });
  }); 
  
} else {

    this.openDialog('Please select a payment method to continue');
}

}

Con() {

      if(this.l != null) 
      {
          this.ActNo = (this.l + 1);  
          this.user = this.authservice.ActiveUser(); 
          this.lastIdservice.AddId(this.ActNo);   
          this.Stat();  
          this.goalStatus = 'null';
          this.reasonCancel = 'null';
          if(this.ben){
            this.gname = this.ben.gname;
            this.relation = this.ben.relation;
          }
         
        this.merchantPay = ( this.monthlyPay * ( 1 -  ((this.taxes / 100) + (this.appFee / 100)) ));
        this.merchantPay = Math.round(this.merchantPay*100) / 100;
   
    

          this.planservice.AddPlan(this.user.email,this.ActNo, this.merId, this.mername,this.proname, this.product.savings, this.product.additionalOffers,this.name, this.sdate, this.ed, this.monthlyPay, this.merchantPay, this.totAmnt, this.payr, this.term, this.freq, this.per, this.goalStatus, this.reasonCancel, this.nxtDueDate, this.gname, this.relation, this.cardBrand, this.cardlast4, this.cardId, this.product.imageURL, this.product.merchantLogo, this.product.termsAndconditions, this.product.benefitsAndcancellation, this.product.productType, this.taxes, this.appFee, this.redem, this.due);
      }
      else 
      {
          this.ActNo = 1001;
          this.user = this.authservice.ActiveUser();
          this.lastIdservice.AddId(this.ActNo);   
          this.Stat();
          this.goalStatus = 'null';
          this.reasonCancel = 'null';
          if(this.ben){
            this.gname = this.ben.gname;
            this.relation = this.ben.relation;
          }
          
          this.merchantPay = ( this.monthlyPay * ( 1 -  ((this.taxes / 100) + (this.appFee / 100)) ));
          this.merchantPay = Math.round(this.merchantPay*100) / 100;
        //   console.log(this.merchantPay);
   

          this.planservice.AddPlan(this.user.email,this.ActNo, this.merId, this.mername,this.proname, this.product.savings, this.product.additionalOffers, this.name, this.sdate, this.ed, this.monthlyPay, this.merchantPay, this.totAmnt, this.payr, this.term, this.freq, this.per, this.goalStatus, this.reasonCancel, this.nxtDueDate, this.gname, this.relation, this.cardBrand, this.cardlast4, this.cardId, this.product.imageURL, this.product.merchantLogo, this.product.termsAndconditions, this.product.benefitsAndcancellation, this.product.productType, this.taxes, this.appFee, this.redem, this.due);   
      }
    }


Stat() {
    //   this.per = (this.monthlyPay / this.totAmnt) * 100 ; 
    this.per = null;
}     


Order(){
this.orderservice.AddOrder(this.user.email,this.ActNo,this.mername,this.proname, this.product.savings, this.product.additionalOffers,this.name, this.sdate, this.ed, this.monthlyPay, this.gname, this.relation, this.cardBrand, this.cardlast4, this.cardId, this.product.imageURL);
}


Mer(){
    // const uid = this.authservice.ActiveUser().uid; 
this.merchantservice.AddMPlan(this.user.email,this.ActNo, this.merId, this.mername,this.proname, this.product.savings, this.product.additionalOffers, this.name, this.sdate, this.ed, this.monthlyPay, this.merchantPay, this.totAmnt, this.payr, this.term, this.freq, this.per, this.goalStatus, this.reasonCancel, this.nxtDueDate, this.gname, this.relation, this.cardBrand, this.cardlast4, this.cardId, this.product.imageURL, this.product.merchantLogo, this.product.termsAndconditions, this.product.benefitsAndcancellation, this.product.productType, this.taxes, this.appFee, this.redem, this.due);
}

OnBack() {
    this.planservice.DelPlan();
    this.router.navigate(['scheme/addproducts']);
}

FuturePay() {
    
    // this.instaStatus = 'paid';
    // let txn = 'null';
    // this.paymentservice.AddFuturePay(this.user.email, this.ActNo, this.sdate, this.monthlyPay, this.term, this.freq, this.mername,this.proname, this.name, this.user.uid, this.merId, this.cardBrand, this.cardlast4, this.cardId, txn, txn);
}


OnBen() {
    
    this.bene = true;
    this.main = false;
    this.card = false;
}
OnMain() {
    this.bene = false;
    this.main = true;
    this.card = false;
}

Redem(){
   
    let txn = 'null';
    this.redemservice.AddRed(this.user.email, this.ActNo, this.mername,this.proname, this.name, this.product.savings,
         this.product.additionalOffers, this.sdate, this.ed, this.monthlyPay,  this.term, this.freq, this.product.imageURL, 
         this.goalStatus, this.product.termsAndconditions, txn, txn , this.totAmnt, this.redem, this.due, this.merId,
          this.cardBrand, this.cardlast4, this.cardId, this.user.uid, this.redem, this.merchantVoucherId2, this.product.benefitsAndcancellation );
}

OnBenSta(ben: Ben) {

    if(ben == null){
        this.bensta = false;
    } else {
    this.ben = ben;
    this.gname = this.ben.gname;
    this.bensta = true;
    }
}

OnClick() {
this.click = true;
}

// Payment method
OnCard(){
    this.card = true;
    this.bene = false;
    this.main = false;
}

OnCardSta(card: any) {

    if(card == null){

        this.cardsta = false;

    } else {

        this.cardDet = card;
        this.cardsta = true;
        this.cardBrand = this.cardDet.card.brand;
        this.cardlast4 = this.cardDet.card.last4;
        this.cardId = this.cardDet.id;
    }

}



Vou(token: string){

    this.redemservice.FetchCardLink(token).subscribe((datal: any) => {

        console.log(datal);

        if(datal == null || datal == undefined){


            this.userservice.FetchDet(token).subscribe((data) => {

                let key = this.keyservice.getkey(data);
                data = this.keyservice.conData(data);
                
                console.log(data, data[0].custGiftVoucherIssued, key[0]);
        
                this.issue = data[0].custGiftVoucherIssued;
        
                let txn = 'null';
                this.redemservice.AddVoucher(this.user.email, this.ActNo, this.mername,this.proname, this.name, this.product.savings, this.product.additionalOffers, 
                this.sdate, this.monthlyPay, this.goalStatus,  this.freq, this.product.imageURL,  txn, txn , this.merId, this.cardBrand, this.cardlast4, 
                this.cardId, this.user.uid, this.redem, this.merchantVoucherId1, this.merchantVoucherId2, this.product.termsAndconditions, this.product.benefitsAndcancellation, this.issue, this.due);
        
            });

        } else {

            datal = this.keyservice.conCardLink(datal);
            // console.log(datal, datal[0]);

            for(let i=0; i < datal.length; i++){
                if(datal[i].cardlast4 == this.cardlast4 && datal[i].cardBrand == this.cardBrand){
                     this.cardcount = 1;
                     break;
                } else {
                    this.cardcount = 0;
                }

            }

            if(this.cardcount == 1){

            
            
                    this.issue = 'Yes';
            
                    let txn = 'null';
                    this.redemservice.AddVoucher(this.user.email, this.ActNo, this.mername,this.proname, this.name, this.product.savings, this.product.additionalOffers, 
                    this.sdate, this.monthlyPay, this.goalStatus,  this.freq, this.product.imageURL,  txn, txn , this.merId, this.cardBrand, this.cardlast4, 
                    this.cardId, this.user.uid, this.redem, this.merchantVoucherId1, this.merchantVoucherId2, this.product.termsAndconditions, this.product.benefitsAndcancellation, this.issue, this.due);
                    
                
            } else if(this.cardcount == 0) {

                this.userservice.FetchDet(token).subscribe((data) => {

                    let key = this.keyservice.getkey(data);
                    data = this.keyservice.conData(data);
                    
                    console.log(data, data[0].custGiftVoucherIssued, key[0]);
            
                    this.issue = data[0].custGiftVoucherIssued;
            
                    let txn = 'null';
                    this.redemservice.AddVoucher(this.user.email, this.ActNo, this.mername,this.proname, this.name, this.product.savings, this.product.additionalOffers, 
                    this.sdate, this.monthlyPay, this.goalStatus,  this.freq, this.product.imageURL,  txn, txn , this.merId, this.cardBrand, this.cardlast4, 
                    this.cardId, this.user.uid, this.payr, this.merchantVoucherId1, this.merchantVoucherId2, this.product.termsAndconditions, this.product.benefitsAndcancellation, this.issue, this.due);
            
                });

            }

        }
    });

    
    
}


// Alert
openDialog(a: string) {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.role = 'alertdialog';
  
    dialogConfig.data = {
        id: 1,
        title: a
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
     console.log("response: " + result) });
  }
}

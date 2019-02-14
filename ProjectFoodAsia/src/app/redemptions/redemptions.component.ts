import { Component, OnInit } from '@angular/core';
import { Red } from '../models/redem';
import { RedemService } from '../service/redem';
import { KeyService } from '../service/key';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../service/auth';
import { PlanService } from '../service/plans';
import { Plan } from '../models/plans';
import { Voucher } from '../models/voucher';

@Component({
  selector: 'app-redemptions',
  templateUrl: './redemptions.component.html',
  styleUrls: ['./redemptions.component.css']
})
export class RedemptionsComponent implements OnInit {
  


  redem : Red[];
  freq: string;
  status: string;
  click: boolean = false;
  noplansflag: boolean = false;
  countStatus: any = [];
 
  
  plansflag: boolean = false;
  
  clickA: boolean = false;
  clickO:boolean = true;
  clickC: boolean = false;
  clickW:boolean = false;
  clickG:boolean = false;
  text: string;

  vouchers: any[];
  voucherscopy: any[];
  vouData: any;
  tnc: string;

  constructor(private router: Router, private authservice:AuthService,private redemservice: RedemService, 
              private planservice:PlanService,private keyservice: KeyService) {
    // console.log('constructor in redem');

    
   }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.GetRed();
        this.router.navigate(['/scheme/redemptions']); 
      } 
    }); 
  
  }



 GetRed(){
      this.redemservice.getVouchers().subscribe(data=> {
        // console.log ("card list comp", data);
        if(data.length != 0){
          this.noplansflag = false;
          this.click = true;
          this.voucherscopy = data;
          this.OnFilter('Ready to Redeem');
          // this.vouchers = this.voucherscopy;
          console.log(this.vouchers);

        }else{
          // alert('There are no vouchers yet');
          this.noplansflag = true;
        }
        
        
        // console.log("vouchers", this.vouchers);
      });
    }
  

//Filter
OnFilter(sta: string) {

  if(sta == 'All'){
 
    
    this.vouchers = [];
    this.vouchers = this.voucherscopy;
   this.clickA = true;
   this.clickW = false;
   this.clickG = false;
   this.clickO = false;
   this.clickC = false;

  }else if(sta == 'Ready to Redeem'){
   
    this.plansflag = false;
        this.vouchers = [];
        this.clickA = false;
        this.clickG = false;
        this.clickW = false;
        this.clickC = false;
        this.clickO = true;

        for(let i=0; i<this.voucherscopy.length; i++){

            if(this.voucherscopy[i].RedStatus == 'Ready to Redeem'){

                this.vouchers.push(this.voucherscopy[i]);
          
            } 
        }

        if(this.vouchers == [] || this.vouchers.length == 0){
          this.text = 'Ready to Redeem';
          this.plansflag = true;
        }
    console.log(this.vouchers);

  }else if(sta == 'Redeemed'){

    this.plansflag = false;
        this.vouchers = [];
        this.clickA = false;
        this.clickG = false;
        this.clickW = true;
        this.clickO = false;
        this.clickC = false;

        for(let i=0; i<this.voucherscopy.length; i++){

            if(this.voucherscopy[i].RedStatus == 'Redeemed'){

                this.vouchers.push(this.voucherscopy[i]);
          
            } 
        }

        if(this.vouchers == [] || this.vouchers.length == 0){
          this.text = 'Redeemed';
          this.plansflag = true;
        }
    console.log(this.vouchers,this.voucherscopy);


  }

}


getDetails(vou: Voucher){

  this.redemservice.getVoucherData(vou).subscribe((data) => {
       this.vouData = data;
       console.log(this.vouData);
  });
}

OnTerm(t: string){
    
  this.tnc = t;
}
}

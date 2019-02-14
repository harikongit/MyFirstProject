import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth';
import { Plan } from '../models/plans';
import { PlanService } from '../service/plans';
import { KeyService } from '../service/key';
import { Ben } from '../models/beneficiary';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BeneficiaryService } from '../service/beneficiary';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Modal, ModalOverlay, ModalModule } from 'ngx-modialog';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { MessageService } from '../service/message';


type UserFields = 'name' | 'gender' | 'benEmail';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  plans: Plan[];
  planscopy: Plan[];
  tnc: string;
  pln: Plan;
  click:boolean = false;

  clickA: boolean = true;
  clickO:boolean = false;
  clickC: boolean = false;
  clickW:boolean = false;
  clickG:boolean = false;
  noplansflag: boolean = false;
  plansflag: boolean = false;



  // Beneficiary
  ben: Ben;
  benefs: Ben[];
  isLoading = false;
  selectedBen: Ben;
  editBen: Ben;
  edit: boolean;
  add: boolean;
  benForm: FormGroup;
  keyArray: any[]; 
  key: string;
  plan: Plan;
  userId: string;
  
  benplan: Plan[];
  count: number;

  array: any = [];

  track: boolean = false;
  gname: string;

  // error messages
formErrors: FormErrors = {
  'name': '',
  'gender': '',
  'benEmail': ''
};
validationMessages = {
  'name': {
    'required': 'name is required.',
    'email': 'Email must be a valid email',
  },
  'gender': {
    'required': 'Gender is required.',
   
  },
  'benEmail': {
    'required': 'Email is required.',
    'email': 'Email must be a valid email',
  },
};
  text: string;

// modal: boolean = false;

// @ViewChild('encasUnPwModal') public modal: ModalDirective;




  constructor(private msgService: MessageService, public dialog : MatDialog, private afAuth: AngularFireAuth,  private fb: FormBuilder, private authservice: AuthService, private planservice: PlanService, 
              private keyservice: KeyService, private beneficiaryservice: BeneficiaryService, private router: Router) { 
    // console.log('subscriptions in constructor');
    

    
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.OnSub();
        this.getBen();
        this.router.navigate(['/scheme/subscriptions']); 
      } 
    }); 

    this.createForm();
  }

  ngOnInit() {
    // console.log('subscriptions in NgOninit');
  //   this.afAuth.authState.subscribe((user) => {
  //   if(user){
  //   this.OnSub();
  //   this.getBen();
  //   }
  // });
  }

 
  // to get plans
  OnSub() {
    this.plans = [];
    this.authservice.ActiveUser().getIdToken()
    .then((token:string) => {
      this.planservice.FetchPln(token).subscribe((data: Plan[]) => {

        if(data) {
          this.noplansflag = false;
          this.plansflag =  false;
          this.plans = this.keyservice.conData(data);
          this.planscopy = this.plans;
          // for(let i=0; i<this.plans.length ; i++ ){
            
              // console.log(this.plans[i].nxtDueDate);
              // let d = (new Date(this.plans[i].nxtDueDate)).toDateString();
              // if(d != 'Invalid Date'){
              //   this.plans[i].nxtDueDate = d;
              // }
              // console.log(this.plans[i].nxtDueDate);
            
       
          // }
          if(this.plans.length > 0){
            this.click = true;
          }        
        } else {
          // alert('You have not subscribed to any product yet. Go through Add Products for exciting products');
          this.noplansflag = true;
        }
         
      });
    });
  }


  OnTerm(t: string){
    
        this.tnc = t;
  }


  // Beneficiary
  Beneficiary(plan: any) {
    // console.log(plan.ActNo);
    this.plan = plan;
    this.gname = this.plan.bengname;
    }
  
  OnSelect(ben: Ben){
    this.selectedBen = ben;
    this.edit = false;
    this.add = false;
    }
    
    
    // Get beneficiary Details with key
    getBen() {
      this.authservice.ActiveUser().getIdToken()
      .then((token: string) => { 
              this.beneficiaryservice.FetchBen(token).subscribe((data: Ben[]) => {
                if(data){

                
              this.benefs = this.keyservice.conBen(data);
              this.keyArray = this.keyservice.getKey(data);
        
              for(let i=0; i<this.benefs.length; i++ ){
    
                  Object.assign(this.benefs[i], { key: this.keyArray[i] });
              }
            }
            });
        });
    }
      
    
    
    OnEdit(bene: any, index: number) { 
      this.edit = true;
      this.add = false;
      this.key = bene.key;
      this.editBen = bene;
      this.ben = this.editBen;
      this.rebuildForm();
     
    }
    
    addBen() {
      this.edit = false;
      this.add = true;
      this.benForm.reset(); 
    }
    
    
     
    // Form Creation
    createForm() {
      this.benForm = this.fb.group({
        gname: ['', [Validators.required]],
        lname: ['', [Validators.required]],
        relation: ['', [Validators.required]],    
        address: ['', [Validators.required]],  
      });
    }
    
    // Form Submission
    onSubmit() {
    
      this.ben = this.prepareSaveBen();
      this.beneficiaryservice.AddBen(this.ben.gname, this.ben.lname, this.ben.relation, this.ben.address);
      this.rebuildForm();
      
      this.authservice.ActiveUser().getIdToken()
      .then((token: string) => { 
            this.beneficiaryservice.StrBen(token).subscribe(() => { 
            this.getBen();
           });
      });
      this.benForm.reset(); 
    }
    
    // Update
    OnUpdate() {
      this.ben = this.prepareSaveBen();
      this.beneficiaryservice.AddBen(this.ben.gname, this.ben.lname, this.ben.relation, this.ben.address);
      this.rebuildForm();
      this.ben
      this.authservice.ActiveUser().getIdToken()
      .then((token: string) => { 
            this.beneficiaryservice.UpdateBen(token,this.key).subscribe(() => { 
            this.getBen();
           });
      });
      this.benForm.reset(); 
    }
    
    
    rebuildForm() {
      
      this.benForm.reset({
        gname: this.ben.gname,
        lname: this.ben.lname,
        relation: this.ben.relation,
        address: this.ben.address,
      });
     
    }
    
    
    
    prepareSaveBen(): Ben {
    
      const formModel = this.benForm.value;
      const saveBen: Ben = {
        
        gname: formModel.gname as string,
        lname: formModel.lname as string,
        relation: formModel.relation as string,
        address : formModel.address as string,     
      };
        
      return saveBen;
    }


    OnDone() {
     
    // this.paymentservice.AddPay(this.pay.merchantName, this.pay.merchantId, this.pay.productName, this.pay.savings, this.pay.additionalOffers, this.pay.name, this.pay.strtdate, this.pay.enddate, this.pay.ActNo, this.pay.Amtpaid, this.pay.totAmt, this.pay.instaAmt, this.pay.instaStatus, this.pay.term, this.pay.freq, this.pay.per,  this.selectedBen.gname, this.selectedBen.relation, this.pay.cardBrand, this.pay.cardlast4, this.pay.cardId, this.pay.imageURL, this.pay.termsAndconditions);
    this.planservice.AddPlan(this.plan.CustId, this.plan.ActNo, this.plan.merchantId, this.plan.merchantName, this.plan.productName, this.plan.savings, this.plan.additionalOffers, this.plan.name,  this.plan.strtdate, this.plan.enddate, this.plan.monthlyPay, this.plan.merchantPay, this.plan.totAmnt, this.plan.redemAmt, this.plan.term, this.plan.freq, this.plan.per, this.plan.goalStatus, this.plan.reasonCancel, this.plan.nxtDueDate, this.selectedBen.gname, this.selectedBen.relation, this.plan.cardBrand, this.plan.cardlast4, this.plan.cardId, this.plan.imageURL, this.plan.merchantLogo, this.plan.termsAndconditions, this.plan.benefitsAndcancellation, this.plan.productType, this.plan.taxes, this.plan.appFee, this.plan.promoDis, this.plan.promoExpire);
    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {
    this.planservice.StrPln(token).subscribe(() => { 
     
         this.Sub(token);
      
 
        // console.log('success');
        this.openDialog('Successfully Updated');
      }); 
    });
      }
     
      
      Sub(token: string){
        this.planservice.FetchPln(token).subscribe((data: Plan[]) => {
              this.plans = this.keyservice.conData(data);
        });
      }


      OnDelete(bene: any, index: number) {
        
        this.key = bene.key;
        
        this.authservice.ActiveUser().getIdToken()
        .then((token: string) => { 
      
          this.planservice.FetchPln(token).subscribe((data: Plan[]) => {

            if(data){
          
            this.benplan = this.keyservice.conData(data);
      
            for(let i=0; i<this.benplan.length; i++){
      
              if(this.benplan[i].bengname == bene.gname){
                
              this.count = 1;
              break;
              }
            }
          }
            if(this.count == 1){
              // msg notifications
              this.msgService.add(' Your request is unsuccessful as it is linked to an Account. Please link another card in My Payments and try again.', 'red')
              // alert(' Your request is unsuccessful as it is linked to an Account. Please link another card in My Payments and try again. ');
              }
            if(this.count != 1){
      
              this.beneficiaryservice.DelBen(token,this.key, bene).subscribe(() => { 
                // this.openDialog('Beneficiary successfully Removed');
                this.msgService.add('Beneficiary successfully Removed', 'green');
                // this.modal = true;
                  this.getBen();
                 });
            }
            this.count = null;
          });
          
        });
      }



OnFilter(sta: string) {

        if(sta == 'All'){
       
          
          this.plans = [];
          this.plans = this.planscopy;
         this.clickA = true;
         this.clickW = false;
         this.clickG = false;
         this.clickO = false;
         this.clickC = false;

        }else if(sta == 'In Progress'){
         
          this.plansflag = false;
              this.plans = [];
              this.clickA = false;
              this.clickG = false;
              this.clickW = false;
              this.clickC = false;
              this.clickO = true;

              for(let i=0; i<this.planscopy.length; i++){

                  if(this.planscopy[i].SubStatus == 'In Progress'){

                      this.plans.push(this.planscopy[i]);
                
                  } 
              }

              if(this.plans == [] || this.plans.length == 0){
                this.text = 'In Progress';
                this.plansflag = true;
              }
          console.log(this.plans);

        }else if(sta == 'Upcoming'){
            
          this.plansflag = false;
              this.plans = [];
              this.clickA = false;
              this.clickG = false;
              this.clickW = true;
              this.clickO = false;
              this.clickC = false;

              for(let i=0; i<this.planscopy.length; i++){

                  if(this.planscopy[i].SubStatus == 'Upcoming'){

                      this.plans.push(this.planscopy[i]);
                
                  } 
              }

              if(this.plans == [] || this.plans.length == 0){
                this.text = 'Upcoming';
                this.plansflag = true;
              }
          console.log(this.plans);

        }else if(sta == 'Cancelled'){

            this.plansflag = false;
            this.plans = [];
            this.clickA = false;
            this.clickC = true;
            this.clickW = false;
            this.clickO = false;
            this.clickG = false;

            for(let i=0; i<this.planscopy.length; i++){

                if(this.planscopy[i].SubStatus == 'Cancelled'){

                    this.plans.push(this.planscopy[i]);
              
                } 
            }

            if(this.plans == [] || this.plans.length == 0){
              this.text = 'Cancelled';
              this.plansflag = true;
            }
            
          console.log(this.plans);
        }else if(sta == 'Completed'){

          this.plansflag = false;
          this.plans = [];
          this.clickA = false;
          this.clickC = false;
          this.clickW = false;
          this.clickG = true;
          this.clickO = false;

          for(let i=0; i<this.planscopy.length; i++){

              if(this.planscopy[i].SubStatus == 'Completed'){

                  this.plans.push(this.planscopy[i]);
            
              } 
          }

          if(this.plans == [] || this.plans.length == 0){
            this.text = 'Completed';
            this.plansflag = true;
          }
        console.log(this.plans);
        }
  
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

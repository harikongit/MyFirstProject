
import { Component, OnInit,  AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../service/auth';
import { CardService } from '../service/card';
import { KeyService } from '../service/key';
import { PaymentsaveService } from '../service/stripe/service/paymentsave/paymentsave.service';
import { Location } from '@angular/common';
import { PlanService } from '../service/plans';
import { Plan } from '../models/plans';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.css']
})
export class PaymentmethodComponent implements OnInit, AfterViewInit, OnDestroy {


  cards: any;
  keyArray: any;
  cardclick: boolean = false;
  selectedcard: any;
 

  // The Stripe Elements Card
@ViewChild('cardElement') cardElement: ElementRef;
card: any;
formError: string; 
formComplete = false
totalAmount = 0;
loading = false;
result: string;
errMsg: string;

plans: Plan[];
plan:Plan[];
count: number;
car: any

clicka: boolean = false;
res: string = 'No';

  constructor(public dialog : MatDialog, private router: Router,  private planservice: PlanService, private location: Location, private cd: ChangeDetectorRef, private paymentsaveservice: PaymentsaveService, private authservice: AuthService, private cardservice: CardService, private keyservice: KeyService) {

                
               }

  ngOnInit() {
    
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.GetPlans();
        this.GetCard();
        this.router.navigate(['/paymentmethod']); 
      } 
    }); 
    
  }


  ngAfterViewInit() {
    
  // this.result = null;
  // this.errMsg = null;
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
    // console.log("pay form - form handler"); 
    
    //  console.log(this.card);
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
        
        this.GetCard();
      },
      err => {
        this.errMsg = err.error.message;
        
        console.log("pay form - error", err); 
        // console.log("pay form - error", err); 
       this.loading = false; 
      }
    );
  }


  ngOnDestroy() {
    if(this.card){
      console.log(this.card);
      this.card.destroy();
    }
  }


OnAdd() {
this.clicka = true; 
}


OnClose() {
  this.location.back();
}

//   OnSelect(card: any) {
//   this.cardclick = false;
  
//   this.selectedcard = card;
// }


GetCard(){
  // this.clicka = false;
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
          this.res = 'No';
        // console.log(this.cards);
      });
  });
}

OnBack(){
  this.router.navigate(['/scheme/account']);
}
  


  // Plans

  GetPlans(){
    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {
      this.planservice.FetchPln(token).subscribe((data: Plan[]) => {
         this.plans = this.keyservice.conData(data);
         console.log(this.plans);
      });
    });
  }

  // Delete
  OnRemove(card: any){
    // console.log(card);

  if(this.res == 'Yes'){

  

  this.authservice.ActiveUser().getIdToken()
  .then((token: string) => { 
    this.planservice.FetchPln(token).subscribe((data: Plan[]) => {
    
     
      if(data){

      this.plan = this.keyservice.conData(data);

      for(let i=0; i<this.plan.length; i++){

        if(this.plan[i].SubStatus == 'In Progress' && this.plan[i].cardId == card.id){
          
        this.count = 1;
        break;
        }
      }
    
    }
    if(this.count == 1){
      this.openDialog(' Your request is unsuccessful as it is linked to an Account. Please link another card in My Payments and try again.', '');
      this.res = 'No';
    }
      if(this.count != 1){
        //  console.log(card);
        this.paymentsaveservice.removeSource(card).subscribe(() => {
          this.openDialog('Card successfully removed','');
          this.GetCard();
          
          });
      }
      this.count = null;
    });
  });
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

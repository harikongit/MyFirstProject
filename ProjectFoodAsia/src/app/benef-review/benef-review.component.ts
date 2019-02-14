import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { AuthService } from '../service/auth';
import { BeneficiaryService } from '../service/beneficiary';
import { KeyService } from '../service/key';
import { Beneficiary, Ben } from '../models/beneficiary';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { ReviewComponent } from '../review/review.component';
import { debounceTime } from 'rxjs/operators';
import { PlanService } from '../service/plans';
import { Plan } from '../models/plans';
import * as firebase from 'firebase';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';


type UserFields = 'name' | 'gender' | 'benEmail';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-benef-review',
  templateUrl: './benef-review.component.html',
  styleUrls: ['./benef-review.component.css']
})


export class BenefReviewComponent implements OnInit, OnDestroy {

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
  count: number;
  plan: Plan[];

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
  gname: string;


  @Input() name: string;

constructor( public dialog : MatDialog, private activatedroute: ActivatedRoute, private planservice: PlanService, public review: ReviewComponent ,private location: Location,  private router: Router, private keyservice: KeyService, private authservice: AuthService, private beneficiaryservice: BeneficiaryService, private fb: FormBuilder) {
  // console.log("in detail constructor");
  this.createForm();

  // firebase.auth().onAuthStateChanged( user => {
  //   if(user) {
  //     this.getBen();
  //     this.router.navigate(['/review/benef']); 
  //   } 
  // }); 
}
  


ngOnInit() {
  // this.name = this.activatedroute.snapshot.paramMap.get('name'); 
  // console.log(this.name);
   this.getBen();
   this.gname= this.name;
  //  this.gname= this.name;
   console.log(this.name);
}


// passName(name: string){
//   this.gname = name;
// }

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
            }else{
              this.benefs = null;
              // debounceTime(5000),
              this.openDialog('Please add a beneficiary');
              
              
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


OnClose() {
  console.log('Success');
  this.review.OnBenSta(this.selectedBen);
  console.log('Success');
  this.beneficiaryservice.AddBen(this.selectedBen.gname, this.selectedBen.lname, this.selectedBen.relation, this.selectedBen.address);
  this.review.OnMain();
}


ngOnDestroy() {
  this.review.OnMain();
}


OnBack(){
  // this.selectedBen = null;
  // this.review.OnBenSta(null);
  console.log('Success');
  this.review.OnMain();
}


// Delete
OnDelete(bene: any, index: number) {
  this.key = bene.key;
  
  this.authservice.ActiveUser().getIdToken()
  .then((token: string) => { 
    this.planservice.FetchPln(token).subscribe((data: Plan[]) => {
     
      if(data){

      
      this.plan = this.keyservice.conData(data);

      for(let i=0; i<this.plan.length; i++){

        if(this.plan[i].bengname == bene.gname){
         
        this.count = 1;
        break;
        }
      }
    }
    if(this.count == 1){
      this.openDialog(' Your request is unsuccessful as it is linked to an Account. Please link another card in My Payments and try again. ');
    }

      if(this.count != 1){

        this.beneficiaryservice.DelBen(token,this.key, bene).subscribe(() => { 
          this.openDialog('Beneficiary successfully Removed');
          console.log(bene.gname , this.gname, this.name)
          if(bene.gname == this.name){
            this.review.OnBenSta(null);
          }
            this.getBen();
           });
      }
      this.count = null;
    });
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


import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user';
import { CustomerDetAtSignUp, Address, CustomerDet } from '../models/customer';
import { AuthService } from '../service/auth';
import { KeyService } from '../service/key';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import * as moment from 'moment';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  user: CustomerDetAtSignUp;
  userfull: CustomerDet;
  firstnam: string;
  lastnam: string;
  phnumber: number;
  custemail: string;
  click: boolean = false;
  DOB: Date;
  gender: string;
  CustStatus: string = 'Active';
  Add: Address[];
  key: string[];
  date: any;



  constructor( public dialog : MatDialog, private keyservice: KeyService, private authservice: AuthService, private router: Router, private location: Location, private userservice: UserService) {
                
                firebase.auth().onAuthStateChanged( user => {
                  if(user) {
                    this.OnLoad(); 
                    this.router.navigate(['/profile']); 
                  } 
                }); 
   }

  ngOnInit() {
   
  }

  OnLoad() {
    
    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {
    this.userservice.FetchCustomer(token).subscribe((data: CustomerDet) => {
    // console.log(data);
      if(data){
        this.userfull = data; 
        this.phnumber = this.userfull.custPhoneMobile;
        this.custemail = this.userfull.custEmailId;
        let d =  new Date(this.userfull.custDOB);
        // console.log(d);
        this.date = {year: d.getFullYear(), month: d.getMonth()+1 , day: d.getDate()};
        this.DOB = this.date;
        // console.log(this.date);
        this.gender = this.userfull.custGender; 
        // console.log(this.phnumber, this.custemail, this.DOB, this.gender);
      }

      this.userservice.FetchDet(token).subscribe((data1: CustomerDetAtSignUp) => {
        // console.log(data1);
        this.user = this.keyservice.conCust(data1);
        this.key = this.keyservice.getkey(data1); 
        this.firstnam = this.user[0].custFirstName;
        this.lastnam = this.user[0].custLastName;
        // console.log( this.user);
        if(!this.userfull){
          this.phnumber = this.user[0].custPhoneMobile;
          this.custemail = this.user[0].custEmailId; 
        }
        
      });
    });
      
    });
  }

  OnDet(form: NgForm){
    
     console.log(form.value.DOB, form.value.gender);

    if(form.value.DOB){
     this.date = moment({year:form.value.DOB.year, month:form.value.DOB.month-1, day:form.value.DOB.day}).format("YYYY-MM-DD");
    //  console.log(this.date) ;
    }
    
     this.userservice.AddCustomer(this.custemail, (form.value.firstnam + form.value.lastnam) , form.value.phnumber, this.custemail, form.value.gender, this.date, this.CustStatus)
      this.authservice.ActiveUser().getIdToken()
    .then((token: string) => { 
      this.userservice.UpdateUser(token, this.custemail, form.value.firstnam , form.value.lastnam, form.value.phnumber, this.custemail, this.key[0]).subscribe(() => {
        this.userservice.StrCustomer(token).subscribe(() => {
          this.openDialog('Successfully Updated');
      });
        
        });
    }); 
  }

  OnTrue(){
    this.click = true;
  }

OnLogOut(){
    this.authservice.LogOut();
  }

  OnBack(){

    this.router.navigate(['/scheme/account']);
  }

  OnReset(){
    this.authservice.resetPassword(this.custemail);
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

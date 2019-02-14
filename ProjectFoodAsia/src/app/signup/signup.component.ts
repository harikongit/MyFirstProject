import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';



import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit {
    
    
click: boolean = false;
click1: boolean = false;
paswrd: any;
pass : any;
message: string;
userId: string;
    
constructor ( public dialog : MatDialog, private userservice: UserService, private authservice: AuthService, private router: Router,){ }
    

ngOnInit() {

    this.router.navigate(['/signup']);
}


   
OnSubmit(form: NgForm) {
    this.click1 = true;
      
    this.authservice.signUp(form.value.email, form.value.password)
    .then((user) => {
        let uid = this.authservice.ActiveUser().uid;
        console.log(uid);
        this.userservice.AddCust(form.value.email, form.value.fname, form.value.lname, form.value.cnum, form.value.email, uid);
        
        this.authservice.UpdateProfile(form.value.email, form.value.fname);
        this.authservice.sendEmailVerification();
        console.log("email sent");
        this.OnSignOut();
    }).catch((error) => { this.openDialog(error.message); });
}


OnLog() {
    this.router.navigate(['login']);
}

OnSignOut() {
    this.authservice.LogOut();
}

Pass(e) {
    this.paswrd = e.target.value;
}

Pass2(e) {
    
    this.pass = e.target.value;
console.log(this.pass, this.paswrd);
    if(this.pass != this.paswrd){
        
        this.message = 'Password do not match with above';
        this.click = false;
    } else if(this.pass === this.paswrd){
        this.message = '';
        this.click = true;
    }
    
}

OnSign(){
    this.router.navigate(['signup']);
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
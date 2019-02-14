import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor( public dialog : MatDialog, private router: Router, private userservice: UserService) {

    
         
    
  
   }

  ngOnInit() {

    
          this.router.navigate(['/contact']);
    
    
  }


OnSubmit(form: NgForm){
 console.log(form.value.name, form.value.email, form.value.subject, form.value.message);
  this.userservice.AddContDet(form.value.name, form.value.email, form.value.subject, form.value.message);
  this.userservice.StrCont().then(() => {
      form.reset();
      this.openDialog('Your message is added to our queue. We will get to you within 24 hours.');

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

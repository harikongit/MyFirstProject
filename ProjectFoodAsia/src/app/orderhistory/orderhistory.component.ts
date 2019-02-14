import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth';
import { OrderService } from '../service/order';
import { Order } from '../models/order';
import { KeyService } from '../service/key';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { PlanService } from '../service/plans';
import { Plan } from '../models/plans';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {


  order: Order[];
  message: string;

  constructor(private planservice: PlanService, public dialog : MatDialog, private router: Router, private location: Location, private authservice: AuthService, private orderservice: OrderService, private keyservice: KeyService) {

     
   }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.GetOrderDet();
        this.router.navigate(['/order']); 
      } 
    });
    
    
  }

GetOrderDet(){
    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {
      this.orderservice.FetchOrder(token).subscribe((data: Order[]) => {
        if(data){
        this.order = this.keyservice.conData(data);
        }else{
            this.openDialog('Seems like you have not subscribed to any deal yet'); 
        }
        
      });
    });
}

OnBack(){
  this.router.navigate(['/scheme/account']);
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

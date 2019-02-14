import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';
import { Response } from "@angular/http/src/static_response";
import { Ben } from "../models/beneficiary";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";
// import { BeneficiaryComponent } from "../beneficiary/beneficiary.component";

import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

@Injectable() 

export class BeneficiaryService {

    ben: Ben;
    constructor(public dialog : MatDialog, private errorservice: ErrhandlerService, private http: Http, private authservice: AuthService) {}

// Onpass(name: string){
//     this.benec.passName(name);
// }




AddBen( gname : string, lname: string, relation : string, address: string) {
  this.ben = new Ben( gname, lname, relation, address);
 
}

GetBen(){
    return this.ben;
}

UpdateBen(token: string, key: string) {
    let userid = this.authservice.ActiveUser().uid;
    return this.http.put('https://my-hasha-app.firebaseio.com/test/beneficiary/'+ userid +'/'+ key +'/.json?auth='+ token, this.ben).pipe(catchError(this.errorservice.handleError<any>('Update beneficiary', "S"))) ;
}

DelBen(token: string, key: string, bene: Ben) {
    
    let userid = this.authservice.ActiveUser().uid;
   this.StrDelBen(token, userid, bene, key).subscribe(() => {
        console.log('success'); 
        
    });
    return this.http.delete('https://my-hasha-app.firebaseio.com/test/beneficiary/'+ userid +'/'+ key +'/.json?auth='+ token);
    
}

StrBen(token: string) {
    let userid = this.authservice.ActiveUser().uid;
    return this.http.post('https://my-hasha-app.firebaseio.com/test/beneficiary/'+ userid +'/.json?auth='+ token, this.ben).pipe(catchError(this.errorservice.handleError<any>('Store Beneficiary', "S"))) ;
}


FetchBen(token: string) {
    let userid = this.authservice.ActiveUser().uid;
    return this.http.get('https://my-hasha-app.firebaseio.com/test/beneficiary/'+ userid +'/.json?auth='+ token)
    .map((response: Response) => { return response.json() ; }).pipe(catchError(this.errorservice.handleError<any>('Fetching Beneficiary', "S"))) ;
}


StrDelBen(token: string, userid: string, ben: Ben, key: string){

    return this.http.patch('https://my-hasha-app.firebaseio.com/test/del_beneficiary/'+ userid +'/'+ key +'/.json?auth='+ token, { gname: ben.gname, lname: ben.lname, relation: ben.relation, address: ben.address }).pipe(catchError(this.errorservice.handleError<any>('Store Del Beneficiary', "S"))) ;
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
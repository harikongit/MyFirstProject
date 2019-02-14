import { Component, OnInit, Inject, Injectable  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material";

@Component({
  selector: 'app-alertdialog',
  templateUrl: './alertdialog.component.html',
  styleUrls: ['./alertdialog.component.css']
})
export class AlertdialogComponent implements OnInit {


  title: string;
  flag: string;
  
  constructor( private dialogRef: MatDialogRef<AlertdialogComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {

    this.title = data.title;
    if(data.flag){
      this.flag = data.flag;
    } else {
      this.flag = '';
    }
    
   }

  ngOnInit() {
  }


  public closeDialog(){
    this.dialogRef.close();
  }

}

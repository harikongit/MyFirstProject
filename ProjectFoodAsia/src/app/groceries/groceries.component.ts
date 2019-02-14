import { Component, OnInit } from '@angular/core';
import { PlanService } from '../service/plans';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProdscrollService } from '../service/productscroll';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.css']
})
export class GroceriesComponent implements OnInit {

 
  mdesc: string;
  pdesc: string;
  click0: boolean = true;
  click1: boolean = false;
  click2: boolean = false;
  click4: boolean = false;

  srchflag: boolean = false;
  user: any;
  userA: boolean;
  

  constructor(private afAuth: AngularFireAuth, private prdscrlservice: ProdscrollService, private planservice: PlanService, private router: Router) {


    this.afAuth.authState.subscribe((user) => {
      if (user) {
       
        this.user = user;
        // console.log(this.user)
        if(user.email == 'sam@sam.com'){
          this.userA = true;
        }else{
          this.userA = false;
        }
      }
    });

     
   }

  ngOnInit() {
    
    this.router.navigate(['/scheme/addproducts']); 

  }


  

  OnDel(){
    this.planservice.DelPlan();
  }

  OnMer(desc: string){
    this.mdesc = desc;
  }
  
  OnPro(des: string) {
    this.pdesc = des;
  }
   
  
  OnSave(data: string){

    if(data == '10'){
  
      this.click1 = true;
      this.click2 = false;
      this.click4 = false;
      this.click0 = false;
      this.srchprodMerch('10');
      console.log(this.click1);
  
    } else if(data == '11'){
  
      this.click1 = false;
      this.click2 = true;
      this.click4 = false;
      this.click0 = false;
      this.srchprodMerch('11');
      console.log(this.click2);
  
    } else if(data == '25'){
      
      this.click1 = false;
      this.click2 = false;
      this.click4 = true;
      this.click0 = false;
      this.srchprodMerch('25');
      console.log(this.click4);
    }
  }
  
  
  // search
  prod1$;
  
  
  
  // search product on merchant Name
  srchprodMerch(ter: string) {
    this.srchflag = true;
      console.log("subject term swrvice")
      this.prod1$ = this.prdscrlservice.srchMerchantg(ter);
       
        console.log(this.prod1$.key, this.prod1$.payload);
    }
  
    OnAlgo(){
      this.srchflag = false;
      this.click1 = false;
      this.click2 = false;
      this.click4 = false;
      this.click0 = true;
    }
  }



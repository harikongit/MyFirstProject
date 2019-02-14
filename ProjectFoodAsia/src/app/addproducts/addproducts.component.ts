import { Component, OnInit } from '@angular/core';



// services
import { PlanService } from '../service/plans';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})

export class AddproductsComponent implements OnInit {

  
  // clickj: boolean = true;
  clickg: boolean = true;




  constructor(private router: Router, private planservice: PlanService) {
    // console.log('addproducts in constructor');


    this.OnGro();
   }

  ngOnInit() {
    // console.log('subscriptions in NgOninit');
   
   

  }


  // OnJew() {
  //   this.clickj = true;
  //   this.clickg = false;
   
  // }
 


OnDel() {
  this.planservice.DelPlan();
}


OnGro(){
    this.clickg = true;
    // this.clickj = false;
}

}
  


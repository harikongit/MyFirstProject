import { Component, OnInit, OnDestroy } from '@angular/core';

// services
import { AuthService } from '../service/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  
  mdesc: string;
  pdesc: string;
  clickj: boolean = true;
  clickg: boolean = false;

  // email = 'sam@sam.com';
  // pass= '123456';
  


  constructor( private router: Router, private authservice: AuthService) {
    // console.log('products in constructor');
    

     

   }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      
      this.OnJew();
        this.router.navigate(['/products']);
     
  }); 
    // this.authservice.signIn(this.email, this.pass);
   }


     OnJew() {
       this.clickj = true;
       this.clickg =false;
   
    }
  
    OnGro(){
       this.clickj = false;
       this.clickg = true;
     
    }

     OnMer(desc: string){
       this.mdesc = desc;
     }
  
     OnPro(des: string) {
    this.pdesc = des;
     }

  OnLog() {
 this.router.navigate(['login']);
  }


  //  to go to signup page
 OnSign() {
  this.router.navigate(['signup']);
}

   

// OnLogOut(){
//   this.authservice.LogOut();
// }

ngOnDestroy(){
  // this.authservice.LogOut();
}
}

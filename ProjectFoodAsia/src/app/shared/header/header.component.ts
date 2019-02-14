import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../service/auth';
import { UserService } from '../../service/user';
import { CustomerDetAtSignUp } from '../../models/customer';
import { KeyService } from '../../service/key';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

user: any;
userA: boolean;
userId: string;
Cust: CustomerDetAtSignUp;
fname: string;
lname: string;

clicku: boolean = false;
clicki: boolean = false;

  constructor(private keyservice: KeyService, private authservice: AuthService, private userservice: UserService, private router: Router, private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe((user) => {
      if (user) {

       if(user.emailVerified){

        this.user = user;
        this.getData();
        // console.log(this.user)
        if(user.email == 'sam@sam.com'){

          this.userA = true;

        }else{

          this.userA = false;

        }
       } else {

         this.user = null;
       }
        
        
      } else {
         
        this.user = null;
      }
    });
    
  }

  ngOnInit() {

  }


  getData(){

    this.authservice.ActiveUser().getIdToken()
    .then((token: string) => {

        this.userservice.FetchDet(token).subscribe((Cust: CustomerDetAtSignUp) => {
        this.Cust = this.keyservice.conCust(Cust);
        // console.log(this.Cust);
        this.fname = this.Cust[0].custFirstName;
        this.lname = this.Cust[0].custLastName;  
      });  
    });
}

ngOnDestroy(){

}



  // OnLog() {
  //   this.clicki = true;
  //   this.clicku = false;
  //   // this.router.navigate(['login']);
  //   console.log(this.clicki);
  // }

  // OnSign(){
  //   this.clicki = false;
  //   this.clicku = true;
  //   // this.router.navigate(['signup']);
  // }

  OnLogout(){
    this.authservice.LogOut();
  }
}

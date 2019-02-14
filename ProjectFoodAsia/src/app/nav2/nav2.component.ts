import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth';
import { Router } from '@angular/router';
import { UserService } from '../service/user';
import { KeyService } from '../service/key';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component implements OnInit {


 
  constructor(private afAuth: AngularFireAuth, private keyservice: KeyService, private userservice: UserService, private authservice: AuthService, private router: Router) { 
    // console.log('nav in constructor');
  }

  ngOnInit() {
    
}

    
  OnLog() {
    this.authservice.LogOut();
  }
}

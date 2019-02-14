import { Component, OnInit } from '@angular/core';
import { PlanService } from '../service/plans';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css']
})

export class SchemeComponent implements OnInit {
  
  
  constructor(private planservice: PlanService) {
    // console.log('scheme in NgOninit');
   }

  ngOnInit() {
    this.planservice.DelPlan();
    // console.log('scheme in NgOninit');
      
     }     
     
      
}

    

   
  







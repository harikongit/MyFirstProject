import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable()

export class DateService {

calcDate:any = [];
Date: Date;


dateFormat(startDate: any, term: number, freq: string) {

    if(term > 1){

    
    
    let now = moment(startDate,'YYYY-MM-DD');

    if(freq == 'Monthly') {
        for (let i=1; i<term; i++) {
            
           let endDate = moment(now).add(i, 'M');
           
           this.calcDate = endDate;
        //   console.log(i,term,this.calcDate); 
       }
    }
    else if(freq == 'Weekly') {

        for (let i=1; i<term; i++) {
           
           let endDate = moment(now).add(i, 'w');
           
           this.calcDate = endDate;
        //    console.log(i,term,this.calcDate);
       }
    } 
    else if(freq == 'Bi Weekly') {

        for (let i=2; i<2*term; ) {
           
           let endDate = moment(now).add(i, 'w');
           
           this.calcDate = endDate;
        //    console.log(i,term,this.calcDate);
        i = i + 2;

       }
    
    } else if(freq == 'Daily') {

        for (let i=1; i<term; i++ ) {
           
           let endDate = moment(now).add(i, 'd');
           
           this.calcDate = endDate;
        //    console.log(i,term,this.calcDate);
      

       }
    }
    
   this.calcDate = moment(this.calcDate).format('YYYY-MM-DD');
//    console.log(this.calcDate);
   return this.calcDate;
}
else if(term == 1){
    // console.log(term);
  let d = moment(startDate).format('YYYY-MM-DD'); 
//   console.log(d);
  return d;
}
   
}

dateformat(startDate: any, term: number, freq: string) {

    
    let now = moment(startDate,'YYYY-MM-DD');

    if(freq == 'Monthly') {
        for (let i=1; i<=term; i++) {
            
           let endDate = moment(now).add(i, 'M');
           
           this.calcDate = endDate;
        //   console.log(i,term,this.calcDate); 
       }
    }
    else if(freq == 'Weekly') {

        for (let i=1; i<=term; i++) {
           
           let endDate = moment(now).add(i, 'w');
           
           this.calcDate = endDate;
        //    console.log(i,term,this.calcDate);
       }
    }
    else if(freq == 'Bi Weekly') {

        for (let i=2; i<=2*term; ) {
           
           let endDate = moment(now).add(i, 'w');
           
           this.calcDate = endDate;
        //    console.log(i,term,this.calcDate);
        i = i + 2;
       }
    } else if(freq == 'Daily') {

        for (let i=1; i<=term; i++ ) {
           
           let endDate = moment(now).add(i, 'd');
           
           this.calcDate = endDate;
        //    console.log(i,term,this.calcDate);
      

       }
    }
    

    
    
   this.calcDate = moment(this.calcDate).format('YYYY-MM-DD');
//    console.log(this.calcDate);
   return this.calcDate;
   
}

DateChange(date: any) {
  date = moment(date).format('YYYY-MM-DD');
  return date;
}
}
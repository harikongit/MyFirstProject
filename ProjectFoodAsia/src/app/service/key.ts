
import { Plan } from "../models/plans";
import { Observable } from "rxjs/Observable";

import { Beneficiary, Ben } from "../models/beneficiary";
import { CustomerDetAtSignUp, CustomerDet } from "../models/customer";
import { cardLink } from "../models/cardlink";

export class KeyService {
   
    keyArray : any[] = [];
    dataAry: any ;
    dataArray : any[] = [];
    


// Plan Array
conData (plan: any) : any[] {
    this.dataArray = [];
       
    let arrayOfkeys : any[] = Object.keys(plan);
    
    arrayOfkeys.forEach((Key: any) => {  this.dataArray.push(plan[Key]);  });
        
    return this.dataArray;
        
}

// Plan
conPlan (plan: Plan) {
    this.dataArray = [];
               
    let arrayOfkeys : any[] = Object.keys(plan);
            
    arrayOfkeys.forEach((Key: any) => {  this.dataArray.push(plan[Key]);  });
                
    return this.dataArray;
                
}

// Payment Array
conPays (payment: any ): any[]  {

    this.dataArray = [];

    for( let i=0; i<payment.length; i++) {
            
    let pay = payment[i];

    let arrayOfkeys : any[] = Object.keys(pay);
            
    arrayOfkeys.forEach((Key: any) => {  this.dataArray.push(pay[Key]);  });
          
    }
    return this.dataArray;
            
}


// Payment
// conPay (payment: Payment) {
//     this.dataArray = [];
           
//     let arrayOfkeys : any[] = Object.keys(payment);
        
//     arrayOfkeys.forEach((Key: any) => {  this.dataArray.push(payment[Key]);  });
            
//     return this.dataArray;
            
// }


// Cust Data
conCust (Cust: CustomerDetAtSignUp) {
    this.dataAry = [];
                   
    let arrayOfkeys : any[] = Object.keys(Cust);
                
    arrayOfkeys.forEach((Key: any) => {  this.dataAry.push(Cust[Key]);  });
                    

    return this.dataAry;
                    
}

// Cust Data
conCustDet (Cust: CustomerDet) {
    this.dataAry = [];
                   
    let arrayOfkeys : any[] = Object.keys(Cust);
                
    arrayOfkeys.forEach((Key: any) => {  this.dataAry.push(Cust[Key]);  });
                    

    return this.dataAry;
                    
}


// Beneficiary Data
conBen (ben: Ben[]) {
           
    this.dataArray = [];
    let arrayOfkeys = Object.keys(ben);
                
    arrayOfkeys.forEach((Key: any) => {  this.dataArray.push(ben[Key]);   });
                    
                  
    return this.dataArray;
                    
}

// Get Key of Beneficiary Data
getKey (ben: any[]) {
           
    this.keyArray = [];
    let arrayOfkeys = Object.keys(ben);
                     
    arrayOfkeys.forEach((Key: any) => {  this.keyArray.push(Key);   });
                         
                       
    return this.keyArray;
                         
}

getkey( data: any) {

    this.keyArray = [];
    let arrayOfkeys = Object.keys(data);
                     
    arrayOfkeys.forEach((Key: any) => {  this.keyArray.push(Key);   });
                         
                       
    return this.keyArray;
}

conCardLink(data : cardLink){

    this.dataArray = [];
    let arrayOfkeys = Object.keys(data);
                
    arrayOfkeys.forEach((Key: any) => {  this.dataArray.push(data[Key]);   });
                    
                  
    return this.dataArray;
}
}


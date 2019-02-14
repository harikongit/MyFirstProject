import { Injectable, OnInit } from '@angular/core';

// Database
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// Environment
import { environment } from '../../../../../environments/environment';

// Http
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// service
import { AuthService } from '../../../../service/auth';



@Injectable()
export class StripepaymentService  {

  data: any;
  url1: any;
  userId: string;
  sourceId: any;
  readonly api = `${environment.functionsURL}`;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private http: HttpClient, private authservice: AuthService) { 
    
    this.afAuth.authState.subscribe((auth) => {
      if (auth){

      this.userId = auth.uid;
      
      this.authservice.ActiveUser().getIdToken()
      .then((token:string) => {
        this.getId(token).subscribe((data) => {
          this.sourceId = data
        });
      });
    
    }


    });

    
    
    
  }


  
processPayment(token: any, amount: number) {
    
    
    const payment = { token, amount }
    return this.db.list(`/test/stripe_payments/${this.userId}`).push(payment)
}


payConnectCharge(ActNo: number, Amount: number, sourceId: any, appFee: number, merchantId: number, desc: string): Observable<any> {
    
    const url = `${this.api}/app/charges/`;
    
    this.sourceId = sourceId;
    return this.http.post<any>(url, {userId: this.userId, sourceId: this.sourceId, amount: Amount, currency :"cad" , actNo: ActNo, appFee: appFee, merchantId: merchantId, desc: desc });
 
    
}
    
  
getId(token: string) {
  const uid = this.authservice.ActiveUser().uid;
  return this.http.get('https://my-hasha-app.firebaseio.com/stripe_sources/'+ uid + '/' + this.sourceId +'.json?auth=' + token);
}  


// to get source id from paymentsave service
setvalue(src: string) {
   this.sourceId = src;
}


}

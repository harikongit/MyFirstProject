
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { switchMap, map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
// firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// models
import { Customer, Source, Charge, SubscriptionPlan, StripeObject } from  '../../stripemodel';
import { StripepaymentService } from '../payment/stripepayment.service';

@Injectable()
export class PaymentsaveService {

  // sourceId: string;
  userId: string;
  readonly api = `${environment.functionsURL}/app`;

  private stripe = Stripe(environment.stripeKey);
  elements: any;

  constructor( private stripepaymentservice: StripepaymentService, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private http: HttpClient) { 
    
    this.elements = this.stripe.elements();
    
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    });
  }

  // Saves a payment source to the user account that can be charged later
  attachSource(card: any) :Observable<Source> {
    const url = `${this.api}/sources/`;
   
    return  fromPromise<Source>(this.stripe.createSource(card)) 
    .pipe(
      switchMap(data => {
       
          console.log(url, card);
          // this.sourceId = data.source.id;
          this.stripepaymentservice.setvalue(data.source.id);
          
          return this.http.post<Source>(url, { sourceId: data.source.id })
        })
      
       
    )
  }

  removeSource(card: any): Observable<Source>{

    const url = `${this.api}/removeSource/`;
// console.log(url);
// console.log(this.userId);
// console.log(card.id);
    return this.http.post<Source>(url, { userId: this.userId, sourceId: card.id });
  }

  

  // end of methods
}

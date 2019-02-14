// DatePicker
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';


// user idle
// import { UserIdleModule } from 'angular-user-idle';

// for alert dialog
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// firebase

import firebase from "@firebase/app"; 
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

// Routing Module
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

// Components
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ProfileComponent } from './profile/profile.component';
import { Nav2Component } from './nav2/nav2.component';



// Progress Bar
import { NgCircleProgressModule } from 'ng-circle-progress';

// Services
import { DateService } from './service/date';
import { PlanService } from './service/plans';
import { LastIdService } from './service/lastId';
import { KeyService } from './service/key';
import { AuthService } from './service/auth';
import { ProductService } from './service/product';
import { BeneficiaryService } from './service/beneficiary';
import { RedemService } from './service/redem';
import { UserService } from './service/user';
import { StripepaymentService } from './service/stripe/service/payment/stripepayment.service';
import { PaymentsaveService } from './service/stripe/service/paymentsave/paymentsave.service';
import { CardService } from './service/card';


// Barcode Module
import { NgxBarcodeModule } from 'ngx-barcode';

import { ModalModule } from 'ngx-modialog';

// environment
import { environment } from '../environments/environment';

// token interceptors
import { TokenInterceptor } from '../app/service/stripe/tokenInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrderService } from './service/order';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { LoadingspinComponent } from './loadingspin/loadingspin.component';
import { MerchantPlansService } from './service/merchantplans';
import { AutoPayService } from './service/autoPay';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BenefReviewComponent } from './benef-review/benef-review.component';
import { CardReviewComponent } from './card-review/card-review.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './service/message';
import { ErrhandlerService } from './service/errhandler';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LegalComponent } from './legal/legal.component';
import { HowitwrksComponent } from './howitwrks/howitwrks.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PressComponent } from './press/press.component';
import { CareersComponent } from './careers/careers.component';
import { MediakitComponent } from './mediakit/mediakit.component';
import { ReferaFrndComponent } from './refera-frnd/refera-frnd.component';
import { FollowusComponent } from './followus/followus.component';
import { IndexService } from './service';
import { ProdscrollService } from './service/productscroll';
import { GroceriesComponent } from './groceries/groceries.component';
import { JewelleryComponent } from './jewellery/jewellery.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

// algolia search
import { NgAisModule } from 'angular-instantsearch';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { AlertdialogComponent } from './alertdialog/alertdialog.component'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import {MatDialogModule} from '@angular/material/dialog';
import { SchdetailComponent } from './schdetail/schdetail.component';
import { ReviewComponent } from './review/review.component';
// import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

// GeoLocation
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

// google maps
import { AgmCoreModule } from '@agm/core';



export const firebaseConfig = environment.firebaseConfig;


@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModule.components,
    HeaderComponent,
    FooterComponent,
    Nav2Component,
    MyaccountComponent,
    SettingsComponent,
    AddressComponent,
    OrderhistoryComponent,
    PaymentmethodComponent,
    LoadingspinComponent,
    BeneficiariesComponent,
    BenefReviewComponent,
    CardReviewComponent,
    MessagesComponent,
    AboutusComponent,
    PrivacyComponent,
    LegalComponent,
    HowitwrksComponent,
    FaqsComponent,
    PressComponent,
    CareersComponent,
    MediakitComponent,
    ReferaFrndComponent,
    FollowusComponent,
    GroceriesComponent,
    JewelleryComponent,
    ContactUsComponent,
    AlertdialogComponent,
  
       
  
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, AppRoutingModule,
     ReactiveFormsModule,
    AngularFireAuthModule, HttpClientModule,NgxBarcodeModule,
    AngularFireDatabaseModule,               
    AngularFireAuthModule,
    MatDialogModule,
    BrowserAnimationsModule,
    Ng4GeoautocompleteModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    NgAisModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDkzSjneqCaR8_y79oxE2vY0hToKEHe3-8",
      libraries: ["places"]
      }),
    NgIdleKeepaliveModule.forRoot(),
    // UserIdleModule.forRoot({idle: 900, timeout: 30, ping: 120}),
    NgCircleProgressModule.forRoot({
      // set defaults here
      backgroundOpacity : 1,
      backgroundColor: '#44484b',
      backgroundStrokeWidth: 0,
      backgroundPadding: -8,
      radius: 60,
      space: -16,
      toFixed: 0,
      maxPercent: 100,
      outerStrokeWidth: 8,
      outerStrokeColor: "#008000",
      outerStrokeLinecap: "inherit",
      innerStrokeColor: "#ff0000",
      innerStrokeWidth: 0,
      showUnits : true,
      titleColor: "#ffffff",
      unitsColor: "#ffffff",
      subtitleColor: "#ffffff"
   
    })
  ],
  providers: [ AuthService, UserService, DateService, ProductService, PlanService, LastIdService, KeyService,
                BeneficiaryService, RedemService, StripepaymentService, PaymentsaveService,
                CardService, OrderService, MerchantPlansService, AutoPayService, MessageService,
                ErrhandlerService, IndexService, ProdscrollService, SchdetailComponent, ReviewComponent,
               { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
               ],
  bootstrap: [AppComponent],
  
  entryComponents: [AlertdialogComponent]
})
export class AppModule {
  
 }

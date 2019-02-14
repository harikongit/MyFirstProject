import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'


// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { SchemeComponent } from './scheme/scheme.component';
import { ProductsComponent } from './products/products.component';
import { SchdetailComponent } from './schdetail/schdetail.component';
import { ReviewComponent } from './review/review.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { PaymentsComponent } from './payments/payments.component';
import { RedemptionsComponent } from './redemptions/redemptions.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CardlistComponent } from './cardlist/cardlist.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BenefReviewComponent } from './benef-review/benef-review.component';
import { CardReviewComponent } from './card-review/card-review.component';
import { HowitwrksComponent } from './howitwrks/howitwrks.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LegalComponent } from './legal/legal.component';
import { PressComponent } from './press/press.component';
import { CareersComponent } from './careers/careers.component';
import { MediakitComponent } from './mediakit/mediakit.component';
import { ReferaFrndComponent } from './refera-frnd/refera-frnd.component';
import { FollowusComponent } from './followus/followus.component';
import { ContactUsComponent } from './contact-us/contact-us.component';




const routes : Routes = [
  // { path:'', pathMatch:'full', redirectTo: '/home'}, 
  { path:'home', component:HomeComponent} , 
  { path:'login', component:LoginComponent},
  { path:'login/:i', component:LoginComponent},
  { path:'signup', component:SignUpComponent} ,
  { path:'scheme',
    component:SchemeComponent,
    children: [
                   { path:'subscriptions', component:SubscriptionsComponent},
                   { path:'addproducts', component:AddproductsComponent},
                   { path:'payments', component:PaymentsComponent},
                   { path:'redemptions', component:RedemptionsComponent},
                   { path:'account', component:MyaccountComponent},
                   
              ]
  },
  { path:'products', component:ProductsComponent},
  { path:'scheme/addproducts/:type/:i',
    component:SchdetailComponent,
    children: [
                   { path:'beneficiary', component: BeneficiaryComponent},
                   { path:'beneficiary/:name', component: BeneficiaryComponent},
                   { path:'cardlist', component: CardlistComponent}
                   
              ]
  },
  { path:'review', 
  component:ReviewComponent,
  children: [
    { path:'benef', component: BenefReviewComponent},
    { path:'cardlis', component: CardReviewComponent}
    
]},
  { path:'profile', component:ProfileComponent},
  { path:'settings', component:SettingsComponent},
  { path:'order', component:OrderhistoryComponent},
  { path:'paymentmethod', component:PaymentmethodComponent},
  { path:'beneficiaries', component:BeneficiariesComponent},
  { path:'howitwrks', component:HowitwrksComponent},
  { path:'faqs', component:FaqsComponent},
  { path:'aboutus', component:AboutusComponent},
  { path:'privacy', component:PrivacyComponent},
  { path:'legal', component:LegalComponent},
  { path:'careers', component:CareersComponent},
  { path:'mediakit', component:MediakitComponent},
  { path:'press', component:PressComponent},
  { path:'refer', component:ReferaFrndComponent},
  { path:'follow', component:FollowusComponent},
  { path:'contact', component:ContactUsComponent},
  
   
 
  

];

@NgModule({

  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule {
     static components = [ HomeComponent, LoginComponent, SignUpComponent, SchemeComponent,
                           SchdetailComponent, ProductsComponent, ReviewComponent,  SubscriptionsComponent,
                           AddproductsComponent, PaymentsComponent, RedemptionsComponent, BeneficiaryComponent,
                           MyaccountComponent, ProfileComponent, SettingsComponent,  
                           CardlistComponent, BeneficiariesComponent, BenefReviewComponent, CardReviewComponent
                           ];
 }

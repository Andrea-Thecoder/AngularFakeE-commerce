import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {JwtModule} from '@auth0/angular-jwt';

import myLocaleIt from '@angular/common/locales/it';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DetailComponent } from './components/detail/detail.component';
import { PopupcartComponent } from './components/popupcart/popupcart.component';
import { CheckoutcartComponent } from './components/checkoutcart/checkoutcart.component';
import { ValuecheckPipe } from './pipes/valuecheck.pipe';
import { WizardcheckoutComponent } from './components/wizardcheckout/wizardcheckout.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';


registerLocaleData(myLocaleIt)
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainhomeComponent,
    SearchComponent,
    DetailComponent,
    PopupcartComponent,
    CheckoutcartComponent,
    ValuecheckPipe,
    WizardcheckoutComponent,
    ErrorpageComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxSliderModule,
    InfiniteScrollModule,
    JwtModule.forRoot({ config: { disallowedRoutes: [""] }})
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'it'}
],
  bootstrap: [AppComponent]
})
export class AppModule { }

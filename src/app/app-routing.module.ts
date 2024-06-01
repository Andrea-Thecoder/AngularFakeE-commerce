import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { SearchComponent } from './components/search/search.component';
import { DetailComponent } from './components/detail/detail.component';
import { CheckoutcartComponent } from './components/checkoutcart/checkoutcart.component';
import { WizardcheckoutComponent } from './components/wizardcheckout/wizardcheckout.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "" , component: MainhomeComponent},
  {path: "Home" , component: MainhomeComponent},
  {path: "Prodotti", component: SearchComponent},
  {path: "Prodotti/Best_seller/:filter", component: SearchComponent},
  {path: "Prodotti/Nuovo_arrivo/:filter", component: SearchComponent},
  {path: "Prodotti/:filter", component: SearchComponent},
  {path: "Prodotti/Nome/:filter", component: SearchComponent},
  {path: "Prodotti/Dettaglio/:id", component: DetailComponent},
  {path: "Checkout", component: CheckoutcartComponent},
  {path: "Wizard", component: WizardcheckoutComponent},
  {path:"Login",component: LoginComponent},
  {path:"Register",component: RegisterComponent},
  {path:"Account", component: AccountComponent, canActivate: [authGuard]},
  {path: "404", component: ErrorpageComponent},
  {path: "**" , component: ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

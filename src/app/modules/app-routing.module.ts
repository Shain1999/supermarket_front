import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { PlaceOrderComponent } from '../components/place-order/place-order.component';
import { ProductsComponent } from '../components/products/products.component';
import { RegisterComponent } from '../components/register/register.component';
import { OrderReferralComponent } from '../components/UI/order-referral/order-referral.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  // { path: "customer", component: CustomerComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
  // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
  { path: "products", component: ProductsComponent },
  { path: "order", component: PlaceOrderComponent },{ path: "register", component: RegisterComponent },
  {path:"recipt",component:OrderReferralComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

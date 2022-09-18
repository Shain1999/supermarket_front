import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuComponent } from '../components/menu/menu.component';
import { LoginComponent } from '../components/login/login.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from '../components/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { CardComponent } from '../components/UI/card/card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component';
import { ProductsNameFilterPipe } from '../pipes/products-name-filter.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CategoryBtnComponent } from '../components/UI/category-btn/category-btn.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsCategoryFilterPipe } from '../pipes/products-category-filter.pipe';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { UpdateCartItemComponent } from '../components/UI/update-cart-item/update-cart-item.component';
import { DialogModule } from '@angular/cdk/dialog';
import { AddToCardDialogComponent } from '../components/UI/add-to-card-dialog/add-to-card-dialog.component';
import { PlaceOrderComponent } from '../components/place-order/place-order.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {MatStepperModule} from "@angular/material/stepper"
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { OrderSummurayComponent } from '../components/UI/order-summuray/order-summuray.component';
import { OrderReferralComponent } from '../components/UI/order-referral/order-referral.component';
import { RegisterComponent } from '../components/register/register.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { AddProductComponent } from '../components/add-product/add-product.component';






@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    FooterComponent,
    ProductsComponent,
    CardComponent,
    ShoppingCartComponent,
    ProductsNameFilterPipe,
    CategoryBtnComponent,
    ProductsCategoryFilterPipe,
    UpdateCartItemComponent,
    AddToCardDialogComponent,
    PlaceOrderComponent,
    OrderSummurayComponent,
    OrderReferralComponent,
    RegisterComponent,
    EditProductComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule, MatIconModule, MatToolbarModule, MatButtonToggleModule, MatCheckboxModule, CdkAccordionModule, MatSliderModule, DialogModule, MatStepperModule, CdkStepperModule,CreditCardDirectivesModule
    

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

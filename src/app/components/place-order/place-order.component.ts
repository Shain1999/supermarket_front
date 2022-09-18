import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CreditCardValidators } from 'angular-cc-library';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ValidateOrderService } from 'src/app/services/validate-order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AddOrder } from 'src/app/Models/AddOrder';
import { dateVlidator } from 'src/app/validators/orderDateValidator.validator';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class PlaceOrderComponent implements OnInit, AfterViewInit {
  // @ViewChild('stepper', { read: MatStepper }) stepper: MatStepper;


  constructor(private formBuilder: FormBuilder, private validateOrderService: ValidateOrderService, private shoppingCartService: ShoppingCartService,private orderService:OrdersService) {

  }
  public city = new FormControl(null, [Validators.required, Validators.maxLength(20)]);
  public street = new FormControl(null, [Validators.required, Validators.maxLength(20)]);
  public shippingDate = new FormControl<any>(null, {validators:[Validators.required],asyncValidators:[dateVlidator(this.orderService)]});

  public orderForm: FormGroup = this.formBuilder.group({
    city: this.city,
    street: this.street,
    shippingDate: this.shippingDate,
  })

  public creditCardNumber = new FormControl(null, [Validators.required, CreditCardValidators.validateCCNumber]);
  public creditCardExpirationDate = new FormControl(null, [Validators.required, CreditCardValidators.validateExpDate]);
  public creditCardCvc = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
  public creditCardForm: FormGroup = this.formBuilder.group({
    creditCardNumber: this.creditCardNumber,
    creditCardExpirationDate: this.creditCardExpirationDate,
    creditCardCvc: this.creditCardCvc
  })
  cartId: number = 0;
  public isPlaceOrderOptinal = this.creditCardForm.valid == true && this.orderForm.value == true

  public selectedStepIndex: number;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;


  getCityErrorMessage() {
    if (this.city.hasError('required')) {

      return 'You must enter a value';
    }
    return this.city.hasError('maxLength') ? 'Max 20 letters' : '';
  }
  getStreetErrorMessage() {

    if (this.street.hasError('required')) {

      return 'You must enter a value';
    }

    return this.city.hasError('maxLength') ? 'Max 20 letters' : '';
  }
  getCreditCardErrorMessage() {
    if (this.creditCardForm.hasError('required')) {

      return 'You must enter a value';
    }
    return '';
  }
  getShippingDateErrorMessage() {
    if (this.shippingDate.value==null) {
      return 'You must enter a value';
    }
    return '';
  }
  sendValidationToCard() {
    console.log(this.creditCardForm.valid);
    console.log(this.orderForm.valid);
    let orderDate = new Date().toISOString()
    const orderData: AddOrder = { cartId:this.cartId, city: this.orderForm.controls['city'].value, street: this.orderForm.controls['street'].value, date: this.orderForm.controls['shippingDate'].value, orderDate: orderDate, totalSum: 0, paymentInfo: this.creditCardForm.controls['creditCardNumber'].value.slice(-5) }
    if (this.creditCardForm.valid == true && this.orderForm.valid == true) {
      this.validateOrderService.onOrderValidatedClick(true);
      this.validateOrderService.sendOrderData(orderData);
      console.log('got here');
      return
    }
    alert('must fill all form')

  }
  // validateOrderDate = (control: AbstractControl) => {
  //   const date = control.value.toISOString().slice(0, 10)
  //   let isDateValidObs = this.shoppingCardService.isDateValid(date);
  //   isDateValidObs.subscribe((successfullResponse) => {
  //     successfullResponse == true ? null : { error: 'Shippment date already filled' }
  //   }, (err) => {
  //     alert(err)
  //   })
  // }
  getShoppingCartData(): void {
    let getShoppingCartData = this.shoppingCartService.getShoppingCartData();
    getShoppingCartData.subscribe(successfullLoginResponse => {
      this.cartId=successfullLoginResponse[0].id
    }, (error: string) => {
      alert(error)
    })
  }
  ngOnInit(): void {
    this.getShoppingCartData();
  }
  ngAfterViewInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddOrder } from 'src/app/Models/AddOrder';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';
import { OrdersService } from 'src/app/services/orders.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ValidateOrderService } from 'src/app/services/validate-order.service';

@Component({
  selector: 'app-order-summuray',
  templateUrl: './order-summuray.component.html',
  styleUrls: ['./order-summuray.component.scss']
})
export class OrderSummurayComponent implements OnInit {

  public orderSummaryArray: ShoppingCartItem[] = []
  public totalOrderSum: number = 0;
  public orderData: AddOrder;
  public isValidated: boolean = false;
  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private validateOrderService: ValidateOrderService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getAllCartItems()
    this.getTotalSum()
    let orderValidatedObservable = this.validateOrderService.onOrderValidatedRecive();
    orderValidatedObservable.subscribe((validateData) => {
      this.isValidated = validateData;
    })
    let orderDataRecivedObservable = this.validateOrderService.onOrderDataRecived();
    orderDataRecivedObservable.subscribe((orderData) => {
      this.orderData = orderData;
    })
  }
  placeOrder() {
    if (this.isValidated) {
      this.addOrder();
    }
    else {
      alert('must enter all areas to proced')
    }
  }
  getAllCartItems(): void {
    let shoppingCartDetailsObservable = this.shoppingCartService.getShoppingCartItems();

    shoppingCartDetailsObservable.subscribe((succuessfulResponse) => {
      console.log(succuessfulResponse);

      this.orderSummaryArray = succuessfulResponse
    }
      , (error: string) => {
        alert(error)
      })
  }
  getTotalSum(): void {
    let totalSumObservable = this.shoppingCartService.getCartTotalSum();

    totalSumObservable.subscribe((succuessfulResponse) => {
      console.log(succuessfulResponse);

      this.totalOrderSum = succuessfulResponse[0].totalCartPrice
    }
      , (error: string) => {
        alert(error)
      })
  }
  
  addOrder(): void {
    this.orderData.totalSum = this.totalOrderSum;
    let addOrderObservable = this.ordersService.addOrder(this.orderData);

    addOrderObservable.subscribe((succuessfulResponse) => {
      
      alert(succuessfulResponse)
    this.cleanShoppingCartAfterPlacingOrder();

      
    }
      , (error: string) => {
        alert(error)
      })
  }
  onOrderClicked():void{
    try {
      this.addOrder();
      this.router.navigate(["/", "recipt"])

    } catch (error) {
    alert(error)    
    }
  }
  cleanShoppingCartAfterPlacingOrder():void{
    let cleanShoppingCartObservable = this.shoppingCartService.cleanShoppingCart();

    cleanShoppingCartObservable.subscribe((succuessfulResponse) => {
      console.log(succuessfulResponse[0]);
    }
      , (error: any) => {
        alert(error.message)
      })
  }




}

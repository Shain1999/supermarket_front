import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddOrder } from '../Models/AddOrder';
import { OrderData } from '../Models/OrderData';

@Injectable({
  providedIn: 'root'
})
export class ValidateOrderService {
  private orderData = new BehaviorSubject<any>(null);
  private orderValidated = new BehaviorSubject<any>(null);

  constructor() { }
  public sendOrderData(orderData: AddOrder) {
    this.orderData.next(orderData);
  }
  public onOrderDataRecived(): Observable<AddOrder> {
    return this.orderData.asObservable();
  }
  public onOrderValidatedClick(validate: boolean) {
    this.orderValidated.next(validate);
  }
  public onOrderValidatedRecive(): Observable<boolean> {
    return this.orderValidated.asObservable();
  }

}

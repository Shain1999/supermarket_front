import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Models/Product';
import { ShoppingCart } from '../Models/ShoppingCart';
import { ShoppingCartItem } from '../Models/ShoppingCartItem';
import { UpdateShoppingCartItem } from '../Models/UpdateShoppingCartItem';
import { AddItemToCart } from '../Models/AddItemToCart';
import { CalcTotalPrice } from '../Models/CalcTotalPrice';
import { AddOrder } from '../Models/AddOrder';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  public isDateValid(date: string): Observable<[]> {
    return this.http.get<[]>(`http://localhost:3001/orders/isOrderDate/${date}`)
  }
  public addOrder(orderObj: AddOrder): Observable<string> {
    return this.http.post<string>(`http://localhost:3001/orders`, orderObj)
  }
}

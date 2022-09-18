import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Models/Product';
import { ShoppingCart } from '../Models/ShoppingCart';
import { ShoppingCartItem } from '../Models/ShoppingCartItem';
import { UpdateShoppingCartItem } from '../Models/UpdateShoppingCartItem';
import { AddItemToCart } from '../Models/AddItemToCart';
import { CalcTotalPrice } from '../Models/CalcTotalPrice';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private onChangeToCart = new BehaviorSubject<any>(null);
  private isCartEmpty = new BehaviorSubject<any>(null);
  private isCartCreated = new BehaviorSubject<any>(null);
  public shoppingCartItems: ShoppingCartItem[] = [];
  public shoppingCart: ShoppingCart = { date: '', id: 0, userId: 0 };

  constructor(private http: HttpClient) { }
  public updateShoppingCart(shoppingCart: ShoppingCart) {
    this.shoppingCart = shoppingCart;
  }

  public addItemToCart(prodcutToAdd: AddItemToCart): Observable<string> {
    return this.http.post<string>(`http://localhost:3001/shoppingCart/`, prodcutToAdd);
  }
  public getShoppingCartData(): Observable<ShoppingCart[]|[]> {
    return this.http.get<ShoppingCart[]|[]>(`http://localhost:3001/shoppingCart/`)
  }
  public getShoppingCartItems(): Observable<ShoppingCartItem[]> {
    return this.http.get<ShoppingCartItem[]>(`http://localhost:3001/shoppingCart/items`)
  }
  public updateShoppingCartItem(updateShoppingCartItemDto: UpdateShoppingCartItem): Observable<string> {
    return this.http.put<string>(`http://localhost:3001/shoppingCart/items`, updateShoppingCartItemDto)
  }
  public deleteShoppingCartItem(cartItemId: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:3001/shoppingCart/${cartItemId}`)
  }
  public getCartTotalSum(): Observable<CalcTotalPrice[]> {
    return this.http.get<CalcTotalPrice[]>(`http://localhost:3001/shoppingCart/items/sum`);
  }
  public createNewShoppingCart():Observable<string[]>{
    return this.http.post<string[]>(`http://localhost:3001/shoppingCart/cart`,{})
  }
  
  public cleanShoppingCart():Observable<string[]>{
    return this.http.delete<string[]>(`http://localhost:3001/shoppingCart/clean/cart`)

  }
 
  public onCartChangeClicked(changeType: string) {
    this.onChangeToCart.next(changeType);
  }
  public onCartChangeRecived(): Observable<string> {
    return this.onChangeToCart.asObservable();
  }
  public isCart(value: boolean) {
    this.isCartCreated.next(value);
  }
  public onIsCartRecived(): Observable<boolean> {
    return this.isCartCreated.asObservable();
  }
  public onEmptyCart(value: boolean) {
    this.isCartEmpty.next(value);
  }
  public emptyCartRecived(): Observable<boolean> {
    return this.isCartEmpty.asObservable();
  }
  


}

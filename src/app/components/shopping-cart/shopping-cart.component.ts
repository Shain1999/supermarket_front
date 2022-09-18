import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ShoppingCart } from 'src/app/Models/ShoppingCart';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }
  public shoppingCartItems: ShoppingCartItem[] = [];
  public shoppingCart: ShoppingCart = { date: '', id: 0, userId: 0 };
  shoppingCartAction: string = ""
  public isCart = true;
  public shoppingCartTotalSum: number = 0;

  expandedIndex = 0;
  ngOnInit(): void {
    this.getShoppingCartData();
    this.shoppingCartService.onCartChangeRecived().subscribe((type) => {

      this.getShoppingCartItems()

      this.getShoppingCartTotalSum();
    })
    this.getShoppingCartItems()
  }

  updateCartItem(shoppingCartItem: ShoppingCartItem): void {
    let updateCartItem = this.shoppingCartService.updateShoppingCartItem(shoppingCartItem);
    updateCartItem.subscribe(successfullLoginResponse => {
      this.shoppingCartService.onCartChangeClicked('update');

      console.log(successfullLoginResponse);

    }, (error: string) => {
      alert(error)
    })
  }
  deleteCartItem(cartItemId: number): void {
    let deleteCartItemObservable = this.shoppingCartService.deleteShoppingCartItem(cartItemId);
    deleteCartItemObservable.subscribe(successfullLoginResponse => {
      console.log(successfullLoginResponse);
      this.shoppingCartService.onCartChangeClicked('delete');
    }, (error: string) => {
      alert(error)
    })
  }


  getShoppingCartItems(): void {
    let getShoppingCartItems = this.shoppingCartService.getShoppingCartItems();
    getShoppingCartItems.subscribe(successfullLoginResponse => {
      if (successfullLoginResponse.length == 0) {
        this.shoppingCartService.onEmptyCart(true);
      }
      else {
        this.shoppingCartService.onEmptyCart(false);

      }
      this.shoppingCartItems = successfullLoginResponse;
    }, (error: any) => {
      alert(error)

    })
  }
  getShoppingCartTotalSum(): void {
    let getShoppingCartTotalSum = this.shoppingCartService.getCartTotalSum();
    getShoppingCartTotalSum.subscribe(successfullLoginResponse => {

      this.shoppingCartTotalSum = successfullLoginResponse[0].totalCartPrice;
    }, (error: string) => {
      alert(error)
    })
  }
  getShoppingCartData(): void {
    let getShoppingCartData = this.shoppingCartService.getShoppingCartData();
    getShoppingCartData.subscribe(successfullLoginResponse => {
      if (successfullLoginResponse.length == 0) {
        this.shoppingCartService.isCart(false)
      }
      this.shoppingCart = successfullLoginResponse[0];
      this.shoppingCartService.updateShoppingCart(successfullLoginResponse[0])
    }, (error: string) => {
      alert(error)
    })
  }

}



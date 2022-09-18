import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { saveAs } from 'file-saver';
declare var require: any


@Component({
  selector: 'app-order-referral',
  templateUrl: './order-referral.component.html',
  styleUrls: ['./order-referral.component.scss']
})
export class OrderReferralComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  public shoppingCartItems: ShoppingCartItem[] = []
  public shoppingCartTotalSum: number = 0;
  ngOnInit(): void {

    this.getShoppingCartItems()
    this.getShoppingCartTotalSum();
    

  }
  onDownloadClicked(): void {
    let FileSaver = require('file-saver');
    let stringToReturn = this.convertItemsArrayToJson();
    let blob = new Blob([stringToReturn], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "recipt.txt");
  }
  getShoppingCartItems(): void {
    let getShoppingCartItems = this.shoppingCartService.getShoppingCartItems();
    getShoppingCartItems.subscribe(successfullLoginResponse => {
      this.shoppingCartItems = successfullLoginResponse;
      console.log(successfullLoginResponse);
    }, (error: string) => {
      alert(error)
    })
  }
  getShoppingCartTotalSum(): void {
    let getShoppingCartTotalSum = this.shoppingCartService.getCartTotalSum();
    getShoppingCartTotalSum.subscribe(successfullLoginResponse => {
      console.log(successfullLoginResponse);
      this.shoppingCartTotalSum = successfullLoginResponse[0].totalCartPrice;
    }, (error: string) => {
      alert(error)
    })
  }
  convertItemsArrayToJson(): string {
    let jsonToReturn = JSON.stringify(this.shoppingCartItems,null,2);
    jsonToReturn+="\n"
    jsonToReturn+='Total Sum: '
    jsonToReturn+=JSON.stringify(this.shoppingCartTotalSum,null,2);
    return jsonToReturn
  }
 

}

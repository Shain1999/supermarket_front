import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';

@Component({
  selector: 'app-update-cart-item',
  templateUrl: './update-cart-item.component.html',
  styleUrls: ['./update-cart-item.component.scss']
})
export class UpdateCartItemComponent implements OnInit {

  @Input() shoppingCartItem: ShoppingCartItem = { amount: 0, cartItemId: 0, img: "", productId: 0, productName: "", totalPrice: 0 }
  sliderValue: number = 0;
  @Output() saveClicked = new EventEmitter<ShoppingCartItem>();
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() eventClicked = new EventEmitter();

  formatLabel(value: number) {
    return value;
  }
  constructor() { }

  ngOnInit(): void {
  }
  public onSaveClicked(): void {
    this.shoppingCartItem.amount = this.sliderValue;
    this.saveClicked.emit(this.shoppingCartItem);
    this.eventClicked.emit();
  }
  public onDeleteClicked(): void {
    this.deleteClicked.emit(this.shoppingCartItem.cartItemId);
    this.eventClicked.emit();

  }

}

import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddItemToCart } from 'src/app/Models/AddItemToCart';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { DialogData } from '../card/card.component';

@Component({
  selector: 'app-add-to-card-dialog',
  templateUrl: './add-to-card-dialog.component.html',
  styleUrls: ['./add-to-card-dialog.component.scss']
})
export class AddToCardDialogComponent implements OnInit {

  constructor(@Inject(DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private shoppingCartService: ShoppingCartService, private dialogRef: DialogRef) { }

  public newAmount = new FormControl<number>(0, [Validators.required, Validators.min(1), Validators.max(20)]);
  cartItemToAdd: AddItemToCart = { amount: 0, productId: 0, cartId: 0 };
  @Output() addToCartClicked = new EventEmitter<number>();

  getErrorMessage() {
    if (this.newAmount.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.newAmount.hasError('max')) {
      return 'value must be between 1-20'
    }
    return this.newAmount.hasError('min') ? 'value must be between 1-20' : '';
  }
  public newAmountForm = this.formBuilder.group({
    newAmount: this.newAmount
  })

  addItemToCart(): void {

    this.cartItemToAdd.amount = this.newAmountForm.controls.newAmount.value;
    this.cartItemToAdd.productId = this.data.product.id;
    let addItemToCart = this.shoppingCartService.addItemToCart(this.cartItemToAdd);
    addItemToCart.subscribe(successfullLoginResponse => {
      this.shoppingCartService.onCartChangeClicked('add');
      this.shoppingCartService.onEmptyCart(false);
      this.addToCartClicked.emit();
      this.dialogRef.close()
      console.log(successfullLoginResponse);
    }), (error: string) => {
      alert(error)
    }
  }

  ngOnInit(): void {
    console.log(this.cartItemToAdd);
    
    let getShoppingCartData = this.shoppingCartService.getShoppingCartData();
    getShoppingCartData.subscribe(successfullLoginResponse => {
      console.log(successfullLoginResponse[0].id);
      this.cartItemToAdd.cartId = successfullLoginResponse[0].id;
    }, (error: string) => {
      alert(error)
    })

  }

}

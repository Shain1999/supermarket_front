import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { AddToCardDialogComponent } from '../add-to-card-dialog/add-to-card-dialog.component';
import { OnUpdateProductClicked } from 'src/app/Models/OnUpdateProductClicked';
import { ProductsService } from 'src/app/services/products.service';

export interface DialogData {
  product: Product;

}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() product: Product = { id: 0, category: "", img: "", name: "", price: 0 };
  @Input() isAdmin: boolean = false;
  @Output() addToCartClicked = new EventEmitter<number>();
  @Output() editCardClicked = new EventEmitter<OnUpdateProductClicked>();



  constructor(public dialog: Dialog,public productsService:ProductsService) { }
  openDialog() {
    this.dialog.open(AddToCardDialogComponent, {
      minWidth: '300px',
      data: {
        product: this.product,
      },
    });
  }
  ngOnInit(): void {
  }
  public onAddToCartClicked(): void {
    this.addToCartClicked.emit();
  }
  onEditProductClicked(): void {
    let updateProductObj: OnUpdateProductClicked = { product: this.product }
    this.productsService.onUpdateProductClicked(updateProductObj);
    this.editCardClicked.emit(updateProductObj)
  }

}

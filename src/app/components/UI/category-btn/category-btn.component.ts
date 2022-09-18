import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-btn',
  templateUrl: './category-btn.component.html',
  styleUrls: ['./category-btn.component.scss']
})
export class CategoryBtnComponent implements OnInit {

  @Input() categoryName: string = "";
  @Output() categoryClicked = new EventEmitter<string>();
  imgSrc="../../../../assets/imgs/"+this.categoryName+".png"


  constructor() { }

  ngOnInit(): void {
    
  }
  public onAddToCart(): void {
    this.categoryClicked.emit(this.categoryName);
  }
}

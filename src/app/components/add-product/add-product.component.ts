import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddProduct } from 'src/app/Models/AddProduct';
import { Category } from 'src/app/Models/Category';
import { OnUpdateProductClicked } from 'src/app/Models/OnUpdateProductClicked';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private formBuilder: FormBuilder) { }
  categoriesArray: Category[];
  isVisible: boolean = false;
  public name = new FormControl('', [Validators.required]);
  public price = new FormControl<any>('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')] });
  public category = new FormControl(0, [Validators.required]);
  public img = new FormControl('', [Validators.required, Validators.pattern("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$")]);
  public addProductForm = this.formBuilder.group({
    name: this.name,
    price: this.price,
    category: this.category,
    img: this.img
  })

  ngOnInit(): void {
    let onAddClicked = this.productsService.onAddProductRecived();
    onAddClicked.subscribe((value) => {
      if(value!=null){
        this.isVisible = true;
      }
    })
  
    this.initCategories()

  }
  initCategories(): void {
    let getAllCategoriesObservable = this.categoriesService.getAllCategories();
    getAllCategoriesObservable.subscribe(successfullLoginResponse => {
      this.categoriesArray = successfullLoginResponse;
    }, (error: string) => {
      alert(error)
    })
  }
  onAddClicked(): void {
    let newProductObj:AddProduct={categoryId:this.addProductForm.controls['category'].value,img:this.addProductForm.controls['img'].value
  ,name:this.addProductForm.controls['name'].value,price:this.addProductForm.controls['price'].value}
  let addProductObservable=this.productsService.addProduct(newProductObj);
  addProductObservable.subscribe((response)=>{
    console.log(response);

    this.productsService.onChangeToProducts('added');
    this.productsService.onCloseAddProduct('closed')
    this.addProductForm.reset()

    this.isVisible=false;
    
  })
  }
  onCloseClicked():void{
    this.isVisible=false;
    this.productsService.onCloseAddProduct('closed')
    this.addProductForm.reset()
  }
    
}

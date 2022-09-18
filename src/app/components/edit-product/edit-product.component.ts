import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/Category';
import { OnUpdateProductClicked } from 'src/app/Models/OnUpdateProductClicked';
import { Product } from 'src/app/Models/Product';
import { UpdateProduct } from 'src/app/Models/UpdateProduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private formBuilder: FormBuilder) { }
  categoriesArray: Category[];
  product: OnUpdateProductClicked = { product: { category: '', id: 0, img: '', name: '', price: 0 } };
  isVisible:boolean=false;
  public name = new FormControl('', [Validators.required]);
  public price = new FormControl(0, { validators: [Validators.required, Validators.pattern('^[0-9]*$')] });
  public category = new FormControl(0, [Validators.required]);
  public img = new FormControl('', [Validators.required, Validators.pattern("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$")]);
  public updateProductForm = this.formBuilder.group({
    name: this.name,
    price: this.price,
    category: this.category,
    img: this.img
  })

  ngOnInit(): void {
    this.productsService.onUpdateProductRecived().subscribe((product) => {
      this.isVisible=true;
      this.product = product
      this.name.setValue(product.product.name)
      this.price.setValue(product.product.price)
      let categoryId = this.getCategoryIdByName(product.product.category)
      this.category.setValue(categoryId)
      this.img.setValue(product.product.img)

      console.log(product);
      console.log(this.categoriesArray);

    }, err => {
      alert(err)
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
  getCategoryIdByName(name: string | null): number {

    for (let category of this.categoriesArray) {
      if (category.name = name) {
        return category.id;
      }
    }
    return 0;
  }
  onEditClicked(): void {
    let updateProductObj: UpdateProduct = {
      categoryId: this.updateProductForm.controls['category'].value, img: this.updateProductForm.controls['img'].value
      , name: this.updateProductForm.controls['name'].value, price: this.updateProductForm.controls['price'].value, id: this.product.product.id
    }
    let editProductObservable = this.productsService.updateProduct(updateProductObj);
    editProductObservable.subscribe((sucessfullResponse) => {
      this.productsService.onChangeToProducts('updated')
      console.log(sucessfullResponse);
      
      this.isVisible=false;
    }, err => {
      alert(err.message)
    })
  }
  onCloseClicked():void{
    this.isVisible=false
  }

}

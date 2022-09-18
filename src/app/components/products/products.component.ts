import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { OnUpdateProductClicked } from 'src/app/Models/OnUpdateProductClicked';
import { Product } from 'src/app/Models/Product';
import { ShoppingCart } from 'src/app/Models/ShoppingCart';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productsArray: Product[] = [];
  public categoriesArray: Category[] = [];
  public categoryFilter: string = 'all';
  public userName: string | null = ""
  public isShoppingCart = false;
  public productToEdit: OnUpdateProductClicked;
  public isAdmin = localStorage.getItem('userType') == 'admin';
  public isAddProdVisible=true;
  // public categoriesArray:
  public isEmpty: boolean = false;
  filter = new FormControl('', [Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]);


  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private categoriesService: CategoriesService, private tokenService: TokenService, private router: Router, private shoppingCartService: ShoppingCartService) {
  }


  public filterForm = this.formBuilder.group({
    filterData: this.filter,
  })
  ngOnInit(): void {
    if(!this.isAdmin){

    this.getShoppingCartData();
    let isCartEmptyObservable = this.shoppingCartService.emptyCartRecived();
    isCartEmptyObservable.subscribe((response) => {
      console.log(response);
      this.isEmpty = response;
    })
  }

    let onProductsChangeObservable=this.productService.changeToProductsResponse();
    onProductsChangeObservable.subscribe((response)=>{
      console.log(response);
      
      this.initProducts();

    })
    let onCloseClickedObservable=this.productService.ReciveCloseAddProduct();
    onCloseClickedObservable.subscribe((value)=>{
      if(value!=null){
        this.isAddProdVisible=true;
      }
    })
    this.initProducts();
    this.initCategories();


  }
  initProducts(): void {
    this.userName = this.tokenService.getUserData()
    let getAllProductsObservable = this.productService.getAllProducts();
    getAllProductsObservable.subscribe(successfullLoginResponse => {
      this.productsArray = successfullLoginResponse;
    }, (error: string) => {
      alert(error)
    })
  }
  initCategories(): void {
    let getAllCategoriesObservable = this.categoriesService.getAllCategories();
    getAllCategoriesObservable.subscribe(successfullLoginResponse => {
      this.categoriesArray = successfullLoginResponse;
    }, (error: string) => {
      alert(error)
    })
  }

  navToPlaceOrder() {
    this.router.navigate(["/", "order"])

  }
  getShoppingCartData(): void {
    let getShoppingCartData = this.shoppingCartService.getShoppingCartData();
    getShoppingCartData.subscribe(successfullLoginResponse => {
      if (successfullLoginResponse.length == 0) {
        this.isShoppingCart = true;
      }

      this.shoppingCartService.updateShoppingCart(successfullLoginResponse[0])
    }, (error: string) => {
      alert(error)
    })
  }
  onCreateShoppingCartClicked() {
    let createShoppingCartObservable = this.shoppingCartService.createNewShoppingCart();
    createShoppingCartObservable.subscribe((response) => {
      this.ngOnInit();
    }, err => {
      alert(err.message)
    })
  }
  onEditProductClicked(productToEdit: OnUpdateProductClicked): void {
    this.productToEdit = productToEdit;
  }
  onAddProductClicked():void{
    this.productService.onAddProductClicked('clicked')
    this.isAddProdVisible=false;
  }



}

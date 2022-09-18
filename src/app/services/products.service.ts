import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Models/Product';
import { AddProduct } from '../Models/AddProduct';
import { UpdateProduct } from '../Models/UpdateProduct';
import { OnAddProductClicked } from '../Models/OnAddProductClicked';
import { OnUpdateProductClicked } from '../Models/OnUpdateProductClicked';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private onUpdateClicked = new BehaviorSubject<any>(null);
  private onAddClicked = new BehaviorSubject<any>(null);
  private changeToProduct=new BehaviorSubject<any>(null)
  private closeAddModal=new BehaviorSubject<any>(null)


  constructor(private http: HttpClient) { }
  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products");
  }
  public addProduct(productObj:AddProduct):Observable<string[]>{
    return this.http.post<string[]>('http://localhost:3001/products',productObj);
  }
  public updateProduct(productObj:UpdateProduct):Observable<string[]>{
    return this.http.put<string[]>('http://localhost:3001/products',productObj);
  }
  public onAddProductClicked(value:string){
    this.onAddClicked.next(value);
  }
  public onAddProductRecived():Observable<string>{
    return this.onAddClicked.asObservable();
  }
  public onUpdateProductClicked(updateProductClicked:OnUpdateProductClicked){
    this.onUpdateClicked.next(updateProductClicked);
  }
  public onUpdateProductRecived():Observable<OnUpdateProductClicked>{
    return this.onUpdateClicked.asObservable();
  }
  public onChangeToProducts(value:string){
    this.changeToProduct.next(value);
  }
  public changeToProductsResponse():Observable<any>{
    return this.changeToProduct.asObservable();
  }
  public onCloseAddProduct(value:string){
    this.closeAddModal.next(value)
  }
  public ReciveCloseAddProduct():Observable<any>{
    return this.closeAddModal.asObservable()
  }

}

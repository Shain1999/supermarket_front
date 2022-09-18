import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  public getAllCategories(): Observable<Category[]> {
    return this.http.get<[]>("http://localhost:3001/categories/");
  }}

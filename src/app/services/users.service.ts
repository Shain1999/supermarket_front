import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { LoginDto } from '../Models/LoginDto';
import { SuccessfulLoginResponse } from '../Models/SuccessfulLoginResponse';
import { UserRegisterData } from '../Models/UserRegisterData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
   }
  public onLoginClicked(userLoginData: LoginDto): Observable<SuccessfulLoginResponse> {
    return this.http.post<SuccessfulLoginResponse>(`http://localhost:3001/users/login`, userLoginData).pipe(
      tap((data: any) => {
          console.log(data);
      }),
      catchError((err) => {
          throw 'Error in source. Details: ' + err; // Use console.log(err) for detail
      })
  )
  }
  public isUserExist(id:number):Observable<boolean[]>{
    return this.http.get<boolean[]>(`http://localhost:3001/users/validateId/${id}`);
  }
  public isEmailExist(email:string):Observable<boolean[]>{
    return this.http.get<boolean[]>(`http://localhost:3001/users/validateEmail/${email}`);
  }
  public addUser(userData:UserRegisterData):Observable<string[]>{
    return this.http.post<string[]>(`http://localhost:3001/users`, userData)
  }
  public getUserType():Observable<string[]>{
    return this.http.get<string[]>(`http://localhost:3001/users/userType`);
  }
}


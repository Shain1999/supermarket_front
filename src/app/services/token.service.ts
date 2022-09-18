import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuccessfulLoginResponse } from '../Models/SuccessfulLoginResponse';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private onLoginClicked = new BehaviorSubject<string>('');
  private onLogoutClicked = new BehaviorSubject<string>('');
  private  userType= new BehaviorSubject<string>('');


  constructor() {

  }
  public successfullLogin(successfulLoginResponse: SuccessfulLoginResponse): void {
    localStorage.setItem('token', successfulLoginResponse.token);

  }
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');
    this.onLogoutClicked.next('logedOut')
  }
  public isLogedIn(): boolean {
    return localStorage.getItem("token") != null;
  }
  public setUserDataOnLogin(userData: string) {
    localStorage.setItem('userData', userData);
    this.onLoginClicked.next(userData);
  }
  public setUserTypeOnLogin(userType:string){
    localStorage.setItem('userType',userType)
    this.userType.next(userType);
  }
  public getUserType():Observable<string>{
    return this.userType.asObservable();
  }
  public onUserDataRecived(): Observable<string> {
    return this.onLoginClicked.asObservable();
  }
  public onLogedOut(): Observable<string> {
    return this.onLogoutClicked.asObservable();
  }
  public getUserData(): string | null {
    if (localStorage.getItem('userData')) {
      return localStorage.getItem('userData')
    }
    return ''
  }

}

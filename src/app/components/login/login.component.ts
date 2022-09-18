import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccessfulLoginResponse } from 'src/app/Models/SuccessfulLoginResponse';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router, private tokenService: TokenService) { }
  public hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  public loginForm = this.formBuilder.group({
    email: this.email,
    password: this.password
  })
  public disabled = this.loginForm.valid;

   onLoginClicked(): void {
    let userLoginData = { email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value }

    let onLoginClickedObservable = this.usersService.onLoginClicked(userLoginData);
    onLoginClickedObservable.subscribe(successfullLoginResponse => {
      if (successfullLoginResponse) {
        this.tokenService.successfullLogin(successfullLoginResponse)
        this.tokenService.setUserDataOnLogin(`${successfullLoginResponse.firstName.charAt(0).toUpperCase()}${successfullLoginResponse.firstName.substring(1)} ${successfullLoginResponse.lastName} 's`);
        this.tokenService.setUserTypeOnLogin(successfullLoginResponse.userType)
        this.router.navigate(["/", "products"])
      }
    }, (error: any) => {
      alert('password or email incorrect')
    })
  }
  navToRegister(): void {
    this.router.navigate(["/", "register"])

  }
  ngOnInit(): void {
    console.log(this.disabled);

  }
  getUserType(): void {

  }

}

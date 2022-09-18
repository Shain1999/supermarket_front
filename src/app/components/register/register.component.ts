import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterData } from 'src/app/Models/UserRegisterData';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { isEmailExist } from 'src/app/validators/isEmailExistValidator.validator';
import { ComparePassword } from 'src/app/validators/isPasswordsMatchValidator.validator';
import { isUserExistValidator } from 'src/app/validators/isUserExistValidatoer.validator';
import { validateID } from 'src/app/validators/validateID.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hide = true;
  public email = new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: isEmailExist(this.usersService) });
  public id = new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), validateID], asyncValidators: isUserExistValidator(this.usersService) });
  public password = new FormControl('', [Validators.required]);
  public reEnterPassword = new FormControl('', [Validators.required]);
  public cityArray = [{ value: 'Haifa' }, { value: 'Tel - aviv' }, { value: 'Rishon Lezion' }, { value: 'Yoqneam Illit' }, { value: 'Herzelia' }, { value: 'Netanya' }, { value: 'Metula' }, { value: 'Hadera' }, { value: 'Jerusalem' }, { value: 'Eilat' }]
  public submited = false;
  public city = new FormControl(null, [Validators.required]);
  public street = new FormControl(null, [Validators.required, Validators.maxLength(20)]);
  public firstName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  public lastName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router, private tokenService: TokenService, private shoppingCartService: ShoppingCartService) {
  }
  public userCredentialsForm = this.formBuilder.group({
    id: this.id,
    email: this.email,
    password: this.password,
    reEnterPassword: this.reEnterPassword
  }, {
    validator: ComparePassword("password", "reEnterPassword")
  })
  public userInfoForm = this.formBuilder.group({
    city: this.city,
    street: this.street,
    firstName: this.firstName,
    lastName: this.lastName
  })

  ngOnInit(): void {
    this.userCredentialsForm.valid;
  }
  onRegisterClicked(): void {
    let newUserData: UserRegisterData = {
      id: this.userCredentialsForm.controls['id'].value, email: this.userCredentialsForm.controls['email'].value
      , password: this.userCredentialsForm.controls['password'].value, city: this.userInfoForm.controls['city'].value, street: this.userInfoForm.controls['street'].value
      , firstName: this.userInfoForm.controls['firstName'].value, lastName: this.userInfoForm.controls['lastName'].value
    }
    let registerObservable = this.usersService.addUser(newUserData)
    registerObservable.subscribe((response) => {
      if (response[0] == "user registered") {
        this.submited = true;
        let userLoginData = { email: this.userCredentialsForm.controls['email'].value, password: this.userCredentialsForm.controls['password'].value }

        let onLoginClickedObservable = this.usersService.onLoginClicked(userLoginData);
        onLoginClickedObservable.subscribe(successfullLoginResponse => {
          if (successfullLoginResponse) {
            this.tokenService.successfullLogin(successfullLoginResponse)
            this.createCartForUser();
          }
        }, (error: any) => {
          alert('password or email incorrect')
        })
      }

    }, err => {
      alert(err)
    })
  }
  createCartForUser(): void {
    let createCartForUserObservable = this.shoppingCartService.createNewShoppingCart();
    createCartForUserObservable.subscribe((response) => {
      console.log(response);

    }, err => {
      alert(err)
    })
  }
  onStartShoppingClicked(): void {

    let userLoginData = { email: this.userCredentialsForm.controls['email'].value, password: this.userCredentialsForm.controls['password'].value }

    let onLoginClickedObservable = this.usersService.onLoginClicked(userLoginData);
    onLoginClickedObservable.subscribe(successfullLoginResponse => {
      if (successfullLoginResponse) {
        this.tokenService.successfullLogin(successfullLoginResponse)
        this.tokenService.setUserDataOnLogin(`${successfullLoginResponse.firstName.charAt(0).toUpperCase()}${successfullLoginResponse.firstName.substring(1)} ${successfullLoginResponse.lastName} 's`);
        this.createCartForUser();
        this.router.navigate(["/", "products"])
      }
    }, (error: any) => {
      alert('password or email incorrect')
    })
  }

}

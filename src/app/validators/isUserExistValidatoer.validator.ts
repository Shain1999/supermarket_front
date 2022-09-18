import { AbstractControl, ValidationErrors, AsyncValidatorFn, Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef, Input, Injectable } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrdersService } from '../services/orders.service';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { UsersService } from '../services/users.service';

export function
    isUserExistValidator(usersService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return usersService.isUserExist(control.value).pipe(
            map(value => {
                console.log(value);
                return value ?{isUserExist:true} : null
            })
        )
    }
}



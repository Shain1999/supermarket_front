import { AbstractControl, ValidationErrors, AsyncValidatorFn, Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef, Input, Injectable } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrdersService } from '../services/orders.service';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

export function
    dateVlidator(ordersService: OrdersService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return ordersService.isDateValid(control.value.toISOString()).pipe(
            map(value => {
                console.log(value);
                
                return !value ?{dateIsntValid:true} : null
            })
        )
    }
}



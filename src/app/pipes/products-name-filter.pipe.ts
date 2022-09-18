import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/Product';

@Pipe({
  name: 'productsNameFilter'
})
export class ProductsNameFilterPipe implements PipeTransform {

  transform(productsArray: Product[], filterValue: string | null): Product[] {
    
    if (filterValue != null) {
      let newArray = productsArray.filter(product => product.name.toUpperCase().includes(filterValue.toUpperCase()))
      return newArray;
    }

    return productsArray;
  }

}

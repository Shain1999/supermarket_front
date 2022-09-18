import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/Product';

@Pipe({
  name: 'productsCategoryFilter'
})
export class ProductsCategoryFilterPipe implements PipeTransform {

  transform(productsArray: Product[], categoryName: string): Product[] {
    if (categoryName == 'all') {
      return productsArray
    }
    let newArray = productsArray.filter(product => product.category == categoryName)
    return newArray;
  }

}

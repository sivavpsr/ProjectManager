import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(items: any[], field: string, order: number): any {
    
    if (!items || !field || !order) return items; 

    return items.sort((a:any, b:any) => {
      a = a[field];
      b = b[field];

      if (a < b) {
        return -1 * order;
      } else if (a > b) {
        return 1 * order;
      } else {
        return 0;
      }
      //return a > b ? order : order * (-1);
    })
  }

}

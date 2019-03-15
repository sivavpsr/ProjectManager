import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, properties?: string[]): any {

    if (!items) return [];

    if (!searchText) return items;

    return items.filter(item => {
      for (let key in item) {
        if (!properties) {
          if (("" + item[key]).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
            return true;
        }
        else {
          if (properties && properties.indexOf(key) >= 0) {
            if (("" + item[key]).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
              return true;
          }
        }
      }
      return false;
    });
  }

}

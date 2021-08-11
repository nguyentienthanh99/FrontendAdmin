import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'VietHoa'
})
export class VietHoa implements PipeTransform {

  transform(value: string){
    let result = '';
    result = value.charAt(0).toUpperCase() + value.slice(1);
    return result;
  }

}
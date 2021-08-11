import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'LoaiKM'
})
export class LoaiKM implements PipeTransform {

  transform(value: any){
    let result = '';
    if(value == 'Tien' ){
      result = 'đ';
    }
    if(value == '%'){
      result = '%'
    }
    else result = '';
    return result;
  }

}

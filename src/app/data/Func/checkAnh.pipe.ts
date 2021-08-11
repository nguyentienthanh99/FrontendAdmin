import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'AnhNguoiDungDefault'
  })
  export class AnhNguoiDungDefault implements PipeTransform {
  
    transform(value: any){
        let check = '';
      let result = '';
      if(value == ''){
        result = value.slice(22,value.length);
        result = 'src/assets/default/default-user.png';
      }
      else result = value;
      return result;
    }
  
  }

  @Pipe({
    name: 'checkSo'
  })
  export class checkSo implements PipeTransform {
  
    transform(value: any){
      let result = 0;
      if(value >= 1){
        result = Number(value);
      }
      else result = 0;
      return result;
    }
  
  }
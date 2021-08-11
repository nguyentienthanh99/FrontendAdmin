import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CheckBol'
})
export class CheckBol implements PipeTransform {

  transform(value: Boolean){
    let result = '';
    if(value == false){
      result = 'Chưa';
    }
    else result = 'Xong';
    return result;
  }

}

@Pipe({
  name: 'GiaoHang'
})
export class GiaoHang implements PipeTransform {

  transform(value: Boolean){
    let result = '';
    if(value == false){
      result = 'Chưa giao hàng';
    }
    else result = 'Đã giao hàng';
    return result;
  }

}

@Pipe({
  name: 'XacThuc'
})
export class XacThuc implements PipeTransform {

  transform(value: Boolean){
    let result = '';
    if(value == false){
      result = 'Chưa xác thực';
    }
    else result = 'Đã xác thực';
    return result;
  }

}

@Pipe({
  name: 'ThanhToan'
})
export class ThanhToan implements PipeTransform {

  transform(value: Boolean){
    let result = '';
    if(value == false){
      result = 'Chưa thanh toán';
    }
    else result = 'Đã thanh toán';
    return result;
  }

}
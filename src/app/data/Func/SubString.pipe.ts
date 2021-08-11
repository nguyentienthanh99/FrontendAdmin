import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring'
})
export class Substring implements PipeTransform {

  transform(value: string){
    let result = '';
    if(value.length >14 ){
      result = value.slice(0,14) + '...';
    }
    else result = value;
    return result;
  }

}

// @Pipe({
//   name: 'substringPass'
// })
// export class substringPass implements PipeTransform {

//   transform(value: string){
//     let result = '';
//     if(value.length >0 ){
//       result = value.slice(0,14) + '...';
//     }
//     else result = value;
//     return result;
//   }

// }
// import { Injectable } from "@angular/core";

// import { Observable, of, BehaviorSubject  } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Product } from "../modal/product";
// import { PRODUCT } from "../sevice/product.sevice";

// @Injectable({
//     providedIn: 'root',
// })

// export class productService {
//   private messageSource = new BehaviorSubject('Default message');
//   currentMessage = this.messageSource.asObservable();
//     constructor() { }
  
//     getProducts(): Observable<Product[]>{
//         return of(PRODUCT);
//       }
//     getProduct(ma: any) {
//        return this.getProducts().pipe(
//          map((Product: Product[]) => Product.find(item=>item.ma == ma))
//         );
//       }
      
//   }
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http' ;
import { Product } from './product' ;
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private  getAllProductsUrl =" http://localhost:8000/api/get";
  private  getProductByIdUrl =" http://localhost:8000/api/more-info/";
  private addProductUrl ="http://localhost:8000/api/post" ; 
  private deleteProductUrl = "http://localhost:8000/api/delete/" ; 
  private myProductsUrl = "http://localhost:8000/api/myproducts/" ; 
  private updateProductUrl = "http://localhost:8000/api/put/" ; 
  private searchProductUrl = "http://localhost:8000/api/find?name=" ; 
  constructor(private http:HttpClient , private userService :UserService) { }


          getAllProducts()
          {
            return this.http.get<any>(this.getAllProductsUrl) ;
          }
          addProduct(product:Product)
          {
            return this.http.post<any>(this.addProductUrl, product,{headers: new HttpHeaders().append('Authorization','Bearer '+this.userService.userToken() )})
          }

          myProducts()
          {
            return this.http.get<any>(this.myProductsUrl,{headers: new HttpHeaders().append('Authorization','Bearer '+this.userService.userToken() )}) ; 
          }

              deleteProduct(id : String)
              {
                  return this.http.delete<any>(this.deleteProductUrl+id,{headers: new HttpHeaders().append('Authorization','Bearer '+this.userService.userToken() )}) ; 
              }

              getProductById(id :String)
              {
                return this.http.get<any>(this.getProductByIdUrl+id,{headers: new HttpHeaders().append('Authorization','Bearer '+this.userService.userToken() )}) ; 
              }
              updateProduct(product:Product , id :String)
              {
                return this.http.put<any>(this.updateProductUrl+id,product,{headers: new HttpHeaders().append('Authorization','Bearer '+this.userService.userToken() )});
             }

             searchProduct(name :String)
             {
              return this.http.get<any>(this.searchProductUrl+name) ; 
             }
}

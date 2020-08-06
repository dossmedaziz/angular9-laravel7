import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service' ;
import { CategoryService } from '../category.service' ;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 products = [] ;
 categories = [];
  constructor(private productService : ProductService , private categoryService : CategoryService) { }

  ngOnInit(): void {
   
    this.productService.getAllProducts().subscribe(
      ress => {
         this.products = ress.data   ;
       
      },
      err => {
        console.log(err);
      }
    )
    this.categoryService.getAllCategories().subscribe(
      res =>{
      this.categories = res ; 
     
      },
      err =>{
      console.log(err) ; 
      }
    )
  }



}

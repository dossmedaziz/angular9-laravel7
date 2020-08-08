import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories = [];
 products = [] ;


  constructor(private router :ActivatedRoute, private productService :ProductService,private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      res =>{
      this.categories = res ; 
     
      },
      err =>{
      console.log(err) ; 
      }
    )


    let name = this.router.snapshot.params.name ; 
this.productService.getProductByCategory(name).subscribe(
  res=>{
   this.products = res.data 
  },
  err=>{
     console.log(err) ;
  }
)



  }
  filter(category)
  {
  
    let name = category.name ;
  this.productService.getProductByCategory(name).subscribe(
    res =>{
     
      this.products = res.data ;
    },
    err=>{
      console.log(err) ;
     }
  )

  }

}

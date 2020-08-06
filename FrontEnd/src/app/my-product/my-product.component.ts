import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service' ;
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {
 myproducts = [] ;
exist = false ; 
 user_id = localStorage.getItem('user_id') ; 
  constructor(private productService:ProductService,private toastr: ToastrService, private route:Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem('user_id')
    this.productService.myProducts().subscribe(
      res=>{
       if(res.data.length == 0)
       {
       this.exist = true
       }else{
       this.myproducts = res.data ; 
      }
         },
      err =>{
      console.log(err) ; 
      }
    )

 }

 delete(product)
 {
  
   let index = this.myproducts.indexOf(product) ;
   this.myproducts.splice(index , 1) ;
   this.productService.deleteProduct(product.id).subscribe(
     res=>{ 
       this.toastr.success('Deleted!')

     },
     err=>{
       console.log(err) ; 
     }
   )  
 }



}
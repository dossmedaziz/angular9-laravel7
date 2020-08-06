import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product' ; 
import { ProductService } from '../product.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 categories = [] ;
 addForm :FormGroup ; 
 
                        constructor(private fb:FormBuilder,
                          private userService:UserService,
                          private toastr: ToastrService,
                          private route:Router,
                          private categoryService:CategoryService,
                          private productService:ProductService) { 

                let formControls = {
                 name : new FormControl('',[
                    Validators.required,
                    Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                    Validators.minLength(4),
                    Validators.maxLength(16)
                      ]),
                  subtitle : new FormControl('',[
                    Validators.required,
                    Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                    Validators.minLength(4),
                    Validators.maxLength(30)
                      ]),
              
                  description : new FormControl ('',[
                    Validators.required,
                    Validators.minLength(20),

                    
                  ]),
                  price : new FormControl ('',[
                    Validators.required,
                     Validators.pattern("[0-9]+"),
                  ]),
                  qte : new FormControl ('',[
                    Validators.required,
                    Validators.pattern("[0-9]+"),
                  ]),
                  category_id : new FormControl ('',[
                    Validators.required,
                    Validators.pattern("[0-9]+"),
                  ]),
                  
                }
                            this.addForm = this.fb.group(formControls) ;
                          }

                    
                          get name()  { return this.addForm.get('name') }
                          get subtitle() { return this.addForm.get('subtitle') }
                          get description(){ return this.addForm.get('description') }
                          get price(){ return this.addForm.get('price') }
                          get qte(){ return this.addForm.get('qte') }
                          get category(){ return this.addForm.get('category_id') }


  ngOnInit(): void {
    let isloggedIn = this.userService.isloggedIn();
    if(!isloggedIn)
    {
      this.route.navigate(['/']) ;
    }
  

    this.categoryService.getAllCategories().subscribe(
      res=>{
           this.categories = res ; 
      },
      err =>{
    console.log(err) ; 
      }
    ) 
   
  }
  addProduct()
  { 
    let user_id = localStorage.getItem('user_id') ;
    let data = this.addForm.value ; 
    let product = new Product(data.name,data.subtitle,data.description,data.price,data.qte,'imageUrl',user_id,data.category_id)
   
    this.productService.addProduct(product).subscribe(
      res =>
      {
      console.log(res) ; 
      this.toastr.success('Your product successfully added to the waiting list') ;
      this.route.navigate(['/']);
      },
      err=>{
        console.log(err) ; 
        this.toastr.error("all field are required !")
      }
    )
  }

}

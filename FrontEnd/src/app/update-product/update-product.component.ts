import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Product } from '../product' ; 


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  categories = [] ;

  updateForm :FormGroup ; 
 
                        constructor(private fb:FormBuilder,
                          private userService:UserService,
                          private toastr: ToastrService,
                          private route:Router,
                          private categoryService:CategoryService,
                          private productService:ProductService,
                          private router:ActivatedRoute) { 

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
                    Validators.pattern("[0-9]+"),
                  ]),
                  
                }
                            this.updateForm = this.fb.group(formControls) ;
                          }

                    
                          get name()  { return this.updateForm.get('name') }
                          get subtitle() { return this.updateForm.get('subtitle') }
                          get description(){ return this.updateForm.get('description') }
                          get price(){ return this.updateForm.get('price') }
                          get qte(){ return this.updateForm.get('qte') }
                          get category(){ return this.updateForm.get('category') }
  ngOnInit(): void {
    let isloggedIn = this.userService.isloggedIn();
    if(!isloggedIn)
    {
      this.route.navigate(['/']) ;
      this.toastr.warning('You need to connect first !');
      

    }
    
    this.categoryService.getAllCategories().subscribe(
      res=>{
           this.categories = res ; 
      },
      err =>{
    console.log(err) ; 
      }
    )
    let product_id = this.router.snapshot.params.id ; 
    
    this.productService.getProductById(product_id).subscribe(
      ress=>{
        let product = ress ; 
        this.updateForm.patchValue({
          name: product.name,
          subtitle:product.subtitle,
          description : product.description,
          price : product.price,
          qte : product.qte,
          category_id:product.category_id
        })

      },
      errr =>{
        console.log(errr) ;
      }
    )

    

    

  }
  updateProduct()
  { 
          let product_id = this.router.snapshot.params.id ; 
          let user_id = localStorage.getItem('user_id') ;
          let data = this.updateForm.value ; 
          let product = new Product(data.name,data.subtitle,data.description,data.price,data.qte,'imageUrl',user_id,data.category_id)
      
          this.productService.updateProduct(product,product_id).subscribe(
            res =>
            {
            this.toastr.success('Your product successfully Updated') ;
            this.route.navigate(['/my-product']);
            },
            err=>{
              console.log(err) ; 
            }
          )
  }

}

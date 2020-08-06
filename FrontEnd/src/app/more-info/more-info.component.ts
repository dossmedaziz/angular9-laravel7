import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
  product  = []; 
  id ; 
  user_id ;
  cnd= false ;
  constructor(private productService:ProductService , private router:ActivatedRoute, private route:Router,  private toastr: ToastrService) { }

  ngOnInit(): void {
    let product_id = this.router.snapshot.params.id ; 
    

    this.productService.getProductById(product_id).subscribe(
      res=>{
     this.id = res.user_id ; 
     this.user_id = localStorage.getItem('user_id') ;
     if(this.user_id != this.id)
    {
      this.route.navigate(['/my-product']) ;
      this.toastr.warning('you are not alowed')
    }else{
      this.product = res ;
      this.cnd = true ; 
     
    }
      },
      err=>{
        console.log(err) ; 
      }
    )

 


  }

}

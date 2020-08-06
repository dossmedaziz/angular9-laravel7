import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl ,FormBuilder ,  Validators } from '@angular/forms' ; 
import { ProductService } from '../product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  result = [] ; 
  isLoggedIn :Boolean ;
  userName = localStorage.getItem('username') ; 
  searchForm : FormGroup ;
  constructor(private fb :FormBuilder ,private productService : ProductService ,private userService:UserService,private route:Router,  private toastr: ToastrService) {
    let formControl = {
      search :   new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
      ]) 
    }
    this.searchForm = this.fb.group(formControl) ; 
   }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isloggedIn(); 
  }
  get search () { return this.searchForm.get('search')}

  logout()
  {
    localStorage.removeItem('mytoken');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    this.route.navigate(['login']) ; 
    this.toastr.info('Hope we meet again ');
    

  }
  Search()
        {
          let data = this.searchForm.value ; 
          let name = data.search ; 
          this.productService.searchProduct(name).subscribe(
            res=>{
              let error = res.error ; 
              if(error == 1 ){
                this.toastr.error('type something to search')
              }else{
            let test = res.found ;
            if(test == 1 )
            {  
              this.result = res.result ;
              console.log(this.result)
            }else{
      console.log("not found")
            }
            }
            },
            err=>{
            console.log(err) ; 
            }
          )
        }
}
  
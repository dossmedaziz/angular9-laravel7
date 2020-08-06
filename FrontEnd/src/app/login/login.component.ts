import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service' ; 
import { ToastrService } from 'ngx-toastr';
import { User } from '../user' ; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup ;

  constructor(private fb:FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private route:Router) { 
    let formControls = {
      email : new FormControl ('',[
        Validators.required,
        Validators.email
      ]),
      password : new FormControl ('',[
        Validators.required,
      
      ]),
    }
    this.loginForm = this.fb.group(formControls) ;
  }
      get email() { return this.loginForm.get('email') }
      get password(){ return this.loginForm.get('password') }
  ngOnInit(): void {
    let isloggedIn = this.userService.isloggedIn();
    if(isloggedIn)
    {
      this.route.navigate(['/']) ;
    }
  }


  login()
  {
    let data = this.loginForm.value ; 
    let user = new User(null,data.email,data.password) ;
    this.userService.loginUser(user).subscribe(
      res=>{
        let access = res.access ; 
        if(access == 1)
        {
        let name = res.user['name']; 
        let user_id = res.user['id']; 
        let token = res.access_token
        localStorage.setItem('mytoken',token);
        localStorage.setItem('username',name) ; 
        localStorage.setItem('user_id',user_id) ; 
        
    
        this.route.navigate(['/']);
        this.toastr.success('Connected !');
 } else
       this.toastr.error(res.message);
          
      
      },
      err =>{
      
      console.log(err) ; 

      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service' ; 
import { ToastrService } from 'ngx-toastr';
import { User } from '../user' ; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 registerForm :FormGroup ;
  constructor(private fb:FormBuilder,
              private userService:UserService,
              private toastr: ToastrService,
              private route:Router) { 
    let formControls = {
      name : new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
        Validators.minLength(4),
        Validators.maxLength(16)
         ]),
        
      email : new FormControl ('',[
        Validators.required,
        Validators.email
      ]),
      password : new FormControl ('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      repassword : new FormControl ('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
      
    }
    this.registerForm = this.fb.group(formControls) ;
  }
     get name()  { return this.registerForm.get('name') }
     get email() { return this.registerForm.get('email') }
     get password(){ return this.registerForm.get('password') }
     get repassword(){ return this.registerForm.get('repassword') }
  ngOnInit(): void {
    let isloggedIn = this.userService.isloggedIn();
    if(isloggedIn)
    {
      this.route.navigate(['/']) ;
    }
  }
  register()
  {
    let data = this.registerForm.value ; 
    let user = new User(data.name,data.email,data.password) ;

   this.userService.registerUser(user).subscribe(
     res =>{
      this.route.navigate(['login']);
      this.toastr.success('successfuly created');
     
     },
    err => {
      this.toastr.error('email already used');     }
   )
  }
}

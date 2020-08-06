import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,private route:Router,private toastr: ToastrService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let isLoggedIn = this.userService.isloggedIn() ; 
      if(isLoggedIn){
        return true;
       }else {
       this.route.navigate(['/login']) ;
      this.toastr.warning('You need to connect first !');

       return false ; 
      }

        
  }
  
}

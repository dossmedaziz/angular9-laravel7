import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  registerUserUrl ="http://localhost:8000/api/create";
  private loginUserUrl = "http://localhost:8000/api/login" ;

  constructor(private http:HttpClient) { }


  registerUser(user : User)
  {
    return this.http.post<any>(this.registerUserUrl, user) ; 
  }

  loginUser(user :User)
  {
   return this.http.post<any>(this.loginUserUrl, user ) ;
  }


  isloggedIn()
  {
    let token = localStorage.getItem("mytoken") ;
    if(token)
    {
      return true ;
    }else{
    return false ; 
  }
}
userToken()
{
  let token = localStorage.getItem('mytoken')
  return token ; 
}
}

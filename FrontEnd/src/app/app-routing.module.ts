import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AuthGuard } from './auth.guard' ; 
import { MyProductComponent } from './my-product/my-product.component';
import { MoreInfoComponent } from './more-info/more-info.component';


const routes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
   path:'add-product',
   component : AddProductComponent,
   canActivate:[AuthGuard]
   
   
  },
  {
    path :'my-product',
    component:MyProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'update-product/:id',
    component:UpdateProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'more-info/:id',
    component:MoreInfoComponent,
    canActivate:[AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

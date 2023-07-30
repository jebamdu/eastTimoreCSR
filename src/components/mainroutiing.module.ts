import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/components/login/login.component';
import { MainpageComponent } from 'src/components/mainpage/mainpage.component';
import { UserComponent } from './switchingComponents/user/user.component';

const routes: Routes = [
  {path:'',component:UserComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/components/login/login.component';
import { MainpageComponent } from 'src/components/mainpage/mainpage.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'MainComponent',component:MainpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

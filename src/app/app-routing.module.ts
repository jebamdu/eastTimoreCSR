import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/components/login/login.component';
import { MainpageComponent } from 'src/components/mainpage/mainpage.component';import { ListComponentComponent } from 'src/components/switchingComponents/chatbot/list-Component/list-component.component';
import { FlowbuilderTrainingListComponent } from 'src/components/switchingComponents/flowBuilder/flowbuilder/flowbuilder.component';
import { ReportsComponent } from 'src/components/switchingComponents/users/reports/reports.component';
import { UserComponent } from 'src/components/switchingComponents/users/user/user.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'MainComponent',component:MainpageComponent,
  children : [
    { path: 'user', children:[
      { path: 'reports', component : ReportsComponent },
      { path: 'userlist', component : UserComponent }
    ]  },
    {path:'chatbot',
    children:[
      { path: 'traininglist', component : ListComponentComponent }
    ]},
    {
       path: 'flowbuilder',
       children:[
        { path: 'flowbuilder', component : FlowbuilderTrainingListComponent }
      ]
    }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

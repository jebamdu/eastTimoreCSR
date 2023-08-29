import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from '../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainpageComponent } from '../components/mainpage/mainpage.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ContendPageComponent } from 'src/components/contend-page/contend-page.component';
import { UserComponent } from './switchingComponents/users/user/user.component';
import { mainservice } from './main.service';
import { TrainingListComponent } from './switchingComponents/chatbot/training-list/training-list.component';
import { FlowbuilderTrainingListComponent } from './switchingComponents/flowBuilder/flowbuilder/flowbuilder.component';
import { ReportsComponent } from './switchingComponents/users/reports/reports.component';

@NgModule({
  declarations: [
    UserComponent,
      // TrainingListComponent,
    FlowbuilderTrainingListComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    mainservice
  ],

})
export class mainModule { }

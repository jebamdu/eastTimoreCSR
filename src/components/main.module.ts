import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from '../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './switchingComponents/users/user/user.component';
import { mainservice } from './main.service';
import { FlowbuilderTrainingListComponent } from './switchingComponents/flowBuilder/flowbuilder/flowbuilder.component';
import { ReportsComponent } from './switchingComponents/users/reports/reports.component';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    UserComponent,
    FlowbuilderTrainingListComponent,
    ReportsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,

  ],

  providers: [
    mainservice
  ],

})
export class mainModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainpageComponent } from '../components/mainpage/mainpage.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ContendPageComponent } from 'src/components/contend-page/contend-page.component';
import { UserComponent } from '../components/switchingComponents/users/user/user.component';
import { mainservice } from 'src/components/main.service';
import { CommonModule } from '@angular/common';
import { ListComponentComponent } from 'src/components/switchingComponents/chatbot/list-Component/list-component.component';
import { ListDataComponent } from 'src/components/switchingComponents/chatbot/list-Component/list-data/list-data.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainpageComponent,
    HeaderComponent,
    SidebarComponent,
    ContendPageComponent,
    ListComponentComponent,
    ListDataComponent,
    UserComponent
    
     ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    
     
    


  ],
  providers: [
    mainservice,ListComponentComponent,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

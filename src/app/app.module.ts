import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainpageComponent } from '../components/mainpage/mainpage.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ContendPageComponent } from 'src/components/contend-page/contend-page.component';
import { UserComponent } from '../components/switchingComponents/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainpageComponent,
    HeaderComponent,
    SidebarComponent,
    ContendPageComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

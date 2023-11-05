import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  errmsg:string|undefined
  constructor(private router:Router,private http: HttpClient) { }
  errorPopup:boolean=false
  pageloadder:boolean=false;
  ngOnInit(): void {
  
  }

    LoginForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
  });
  errorPopupClose(){
    this.errorPopup=false
  }

  loginSubmit(){
    this.pageloadder=true
    this.http.post(`${environment.baseURL}/login`,this.LoginForm.value).toPromise().then((data:any)=>{
     console.log(data)
     this.pageloadder=false
     if(data&&data.access_token){
      localStorage.setItem('jwtToken',data.access_token)
      this.router.navigate(['/MainComponent']);
     }
     else{
      this.errorPopup=true;
      this.errmsg='Wrong Credentials'
     }
    
    }).catch((data)=>{
     console.log(data,"data")
     this.errorPopup=true
     this.pageloadder=false
    });
 
    
  }
}

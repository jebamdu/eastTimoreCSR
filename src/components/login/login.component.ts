import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  
  }

    LoginForm = new FormGroup({
    UserName: new FormControl('',[Validators.required,Validators.email]),
    Password: new FormControl('',[Validators.required]),
  });

  loginSubmit(){
    console.log(this.LoginForm,"LoginForm..");
    console.log(this.LoginForm.status,"LoginForm..");
    if(this.LoginForm.status=='VALID'){
      this.router.navigate(['/MainComponent']);
    }
    
  }
}

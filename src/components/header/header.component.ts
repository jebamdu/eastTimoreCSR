import { Component, EventEmitter, OnInit } from '@angular/core';
import { mainservice } from '../main.service';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})


export class HeaderComponent implements OnInit {
 

  constructor( public mainservice:mainservice ,public router: Router) { 

  }

  ngOnInit(): void {
    this.mainservice.header='user'
  }

  changeheader(headerData: string){
    console.log(headerData,"headerData");
    this.mainservice.header=headerData

  }

  getButtonClasses(btnClasses:string){
    return {
      'Btn BtnPink marginBtn': this.mainservice.header === btnClasses,
      'Btn marginBtn': this.mainservice.header !== btnClasses
    };
  }

  logout(){
    console.log("logout")
    $('#LogoutModal').modal('show')
  }
  abortLogout(){

    $('#LogoutModal').modal('hide')
  }
  LogoutActivate(){
    $('#LogoutModal').modal('hide')
    this.router.navigate(['/']);
  }

 
    
  

}

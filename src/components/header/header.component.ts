import { Component, EventEmitter, OnInit } from '@angular/core';
import { mainservice } from '../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})


export class HeaderComponent implements OnInit {

  constructor( public mainservice:mainservice ) { 

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

 
    
  

}

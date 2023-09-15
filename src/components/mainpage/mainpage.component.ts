import { Component, OnChanges, OnInit } from '@angular/core';
import { mainservice } from '../main.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.less']
})
export class MainpageComponent implements OnChanges {

  constructor(public mainservice:mainservice) {
     
   }

  ngOnChanges(): void {
 
  }

  routingSidebarData(val:any){
  
  }


}

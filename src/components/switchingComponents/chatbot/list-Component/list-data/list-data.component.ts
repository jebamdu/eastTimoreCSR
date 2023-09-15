import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { mainservice } from 'src/components/main.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.less']
})
export class ListDataComponent implements OnInit {
@Input() setListData:any
@Input() sidebardata:any
sidebardata1: any;
setListData1: any;

  constructor(Mainservice:mainservice) { 

  }

  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChange){
  this.sidebardata1 = this.sidebardata;
  this.setListData1 = this.setListData;

  console.log("render agudha ilaioya",this.sidebardata1,this.setListData1);


  
  }

}

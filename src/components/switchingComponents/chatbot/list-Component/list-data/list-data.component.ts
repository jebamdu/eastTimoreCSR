import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { mainservice } from 'src/components/main.service';
declare var $: any;
@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.less']
})
export class ListDataComponent implements OnInit {
  
@Input() setListData:any
@Input() sidebardata:any
@Output() onEditData: any = new EventEmitter;
@Output() onDeleteData: any = new EventEmitter;
sidebardata1: any;
setListData1: any;
deletedata:any;
deleteBoolean:Boolean | undefined;

  constructor(Mainservice:mainservice) { 

  }

  ngOnInit(): void {
   }
  ngOnChanges(changes:SimpleChange){
  this.sidebardata1 = this.sidebardata;
  this.setListData1 = this.setListData;
  }
  onEdit(type: any, data: any, index: number){
    this.onEditData.emit({type: type, data: data, index: index })
  }


  onDelete(type: any, index: number){
    $('#exampleModal').modal('show')
    this.deleteBoolean=true
    this.deletedata={type: type, index: index }
  }

  deleteFunCall(){
  this.onDeleteData.emit(this.deletedata)
  this.deleteBoolean=false
  }

  abortFun(){
    $('#exampleModal').modal('hide')
    this.deletedata={}
    this.deleteBoolean=false
  
  }
}
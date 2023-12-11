import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { mainservice } from '../main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $ : any
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
@Input() tableRow: any
@Input() tableCol: any
@Output() onSortData:any =new EventEmitter
@Output() filterEvent:any =new EventEmitter
@Output() onDeleteData:any =new EventEmitter
@Output() onEditData:any =new EventEmitter
filterKey:any=''
filterIndiactor:boolean= false
filter:any
filterArray:any=''
settings_ebook = {
  singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'search',
      noDataAvailablePlaceholderText: 'No data',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
FilterdDataArr:any={
  publisherName:[],
  publisherNameArr:[], 
  language:[],
  languageArr:[],
  organizedBy:[],
  organizedByArr:[],
  municipality:[],
  municipalityArr:[],
  sector:[],
  sectorArr:[],
  moduleName:[],
  moduleNameArr:[],
  jobCountry:[],
  jobCountryArr:[],
}
toggleData:string=''
Mainservice:any
  constructor(public mainservice:mainservice) { 
    this.Mainservice = mainservice
    this.filter=this.Mainservice.filter

  }

  
  ngOnInit(): void {
    this.FilterdDataArr={
      publisherName:[],
    publisherNameArr:[], 
    language:[],
    languageArr:[],
    organizedBy:[],
    organizedByArr:[],
    municipality:[],
    municipalityArr:[],
    sector:[],
    sectorArr:[],
    moduleName:[],
    moduleNameArr:[],
    jobCountry:[],
    jobCountryArr:[],
    }
  }
  clearsorfun(){
    this.Mainservice.setSortFilerData.active=''; this.Mainservice.setSortFilerData.status=false
  }
  onSortDatafun(field:string,direction:boolean){
    this.onSortData.emit({active:field,direction:direction})
  }

  filteringData(filteredKey:any,colunName:any){
    let check =<HTMLInputElement>(document.getElementById(colunName))
      check.checked=true 
    $('#exampleModalPopup').modal('show')
    this.filterIndiactor=true
    if(this.filter.value){
      this.filterKey=colunName+'Arr'
      this.filterArray=colunName
     }else{
    }
  }
  applyFilterInd(){
    $('#exampleModalPopup').modal('hide')
  }
  removeusingSet(arr:any) {
    let outputArray = Array.from(new Set(arr))
    return outputArray
}
ngOnDestroy(){
  this.FilterdDataArr={}  
}
ngOnChanges(changes: SimpleChange) {
  console.log(this.tableRow,"tableRow arockia..")
  console.log(this.tableCol,"this.tableCol arockia..!")
  this.tableRow.forEach((element:any) => {
   
    if(element.filter){
      this.Mainservice.setListData.forEach((value:any) => {
        const keys = Object.keys(value);
        if (value['sector'] && value['sector'].length>0){
          value['sector']?.forEach((sectorData:any) => {
            this.FilterdDataArr['sector'].push(sectorData)
          });
          
        }
        if (value['municipality'] && value['municipality'].length>0){
          value['municipality']?.forEach((municipalityData:any) => {
            this.FilterdDataArr['municipality'].push(municipalityData)
          });
          
        }
        if (value['organizedBy'] && value['organizedBy'].length &&value['organizedBy'].length>0){
           this.FilterdDataArr['organizedBy'].push(value['organizedBy'])
      
        }
        if (value['moduleName'] && value['moduleName'].length>0){
          this.FilterdDataArr['moduleName'].push(value['moduleName'])
          
        }
        if (value['jobCountry'] && value['jobCountry'].length>0){
          this.FilterdDataArr['jobCountry'].push(value['jobCountry'])
          
        }
        if (value['language'] && value['language'].length>0){
          this.FilterdDataArr['language'].push(value['language'])
          
        }
        if (value['publisherName'] && value['publisherName'].length>0){
          this.FilterdDataArr['publisherName'].push(value['publisherName'])
          
        }      
      });

    }
  });
  for (const prop in this.FilterdDataArr) {
   this.FilterdDataArr[prop]=this.removeusingSet(this.FilterdDataArr[prop])
  }  
}
funForToolTip(iterabledatas:any,header:any){
  let iterables=''
  
  if(header=='simpleArray'){
    for (const data in iterabledatas){
      iterables=iterables+iterabledatas[data]+", "
    }
  }
  else if(header=='link'){
    for (const data in iterabledatas){
      iterables=iterables+iterabledatas[data]['link']+", "
    }
  }
  else if(header=='Reslink'){
    for (const data in iterabledatas){
      iterables=iterables+iterabledatas[data]['resourceName']+", "
    }
  }
 
return iterables
}
closeFilter(){
this.filterIndiactor=false
}
applyFilter(){  
  for (let key in this.tableCol[0]){
    let check =<HTMLInputElement>(document.getElementById(key))
    let index=this.tableRow.findIndex((keyvval:any)=>(keyvval.key==key))
    if(this.FilterdDataArr[key+"Arr"] && this.FilterdDataArr[key+"Arr"].length>0 && index >0){
     check.checked=true
     this.filter.controls[key].setValue(true)    
    }else if(this.FilterdDataArr[key+"Arr"]  && this.FilterdDataArr[key+"Arr"].length==0 && index >0 && this.tableRow[index].filter){
        check.checked=false
        this.filter.controls[key].setValue(false)    
    }
  }
  $('#exampleModalPopup').modal('hide')
  this.filterEvent.emit({
    filterValue:this.FilterdDataArr[this.filterKey], //['xyz','yyy']
    filterColumn: this.filterKey.slice(0,-3), //launngugae
    filterTotallData:this.FilterdDataArr
  })
  this.filterIndiactor=false
}
public onDeSelect(item: any) {
  this.filterEvent.emit({
    filterValue:this.FilterdDataArr[this.filterKey], //['xyz','yyy']
    filterColumn: this.filterKey.slice(0,-3), //launngugae
    filterTotallData:this.FilterdDataArr,
    deselect:true
  })
}
onEdit(type: any, data: any, index: number) {
  this.onEditData.emit({ type: type, data: data, index: index })
  console.log({ type: type, data: data, index: index })
  
}

onDelete(type: any, index: number) {
  this.onDeleteData.emit({ type: type, index: index })
console.log( { type: type, index: index })
}
togglefun(){
  $('#ToggleModalPopup').modal('show')
}
}

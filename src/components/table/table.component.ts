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
filterKey:any=''
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
filter = new FormGroup({
  //ebooks
  publisherName: new FormControl(false, Validators.required), 
  language: new FormControl(false, Validators.required),
  organizedBy: new FormControl(false, Validators.required),
  municipality: new FormControl(false, Validators.required),
  sector: new FormControl(false, Validators.required),
  moduleName: new FormControl(false, Validators.required),
  jobCountry: new FormControl(false, Validators.required),

  //training

})
Mainservice:any
  constructor(public mainservice:mainservice) { 
    this.Mainservice = mainservice
  }

  
  ngOnInit(): void {

  }
  clearsorfun(){
    console.log("clear fun..")
    this.Mainservice.setSortFilerData.active=''; this.Mainservice.setSortFilerData.status=false
  }
  onSortDatafun(field:string,direction:boolean){
    console.log("comng here",this.tableRow)
    this.onSortData.emit({active:field,direction:direction})
  }
  filteringData(filteredKey:any,colunName:any){
    console.log(filteredKey,"filteredKey")
    console.log(this.filter.value,"filterdata")
    if(this.filter.value){
      this.filterKey=colunName+'Arr'
      this.filterArray=colunName
      console.log(
        "coming here",colunName
      )
      $('#exampleModal').modal('show')
    }else{
      console.log("else stateent")
    }
  }
  removeusingSet(arr:any) {
    let outputArray = Array.from(new Set(arr))
    return outputArray
}

ngOnChanges(changes: SimpleChange) {
  //Arr=['values']
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
  this.tableRow.forEach((element:any) => {
   
    if(element.filter){
      this.tableCol.forEach((value:any) => {
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

applyFilter(){
  this.filterEvent.emit({
    filterValue:this.FilterdDataArr[this.filterKey],
    filterColumn: this.filterKey.slice(0,-3),
    filterTotallData:this.FilterdDataArr
  })
  console.log(this.FilterdDataArr[this.filterKey],"filtered data arockia")
}
}

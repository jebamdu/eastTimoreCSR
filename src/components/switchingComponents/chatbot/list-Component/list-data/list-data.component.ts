import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { mainservice } from 'src/components/main.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.less']
})
export class ListDataComponent implements OnInit {

  @Input() setListData: any
  @Input() sidebardata: any
  @Output() onEditData: any = new EventEmitter;
  @Output() onDeleteData: any = new EventEmitter;
  @Output() onSortData:any =new EventEmitter;
  @Output() filterEvent:any =new EventEmitter
  sidebardata1: any;
  setListData1: any;
  deletedata: any;
  deleteBoolean: Boolean | undefined;
  beforeRegistration: string | undefined
  beforeRegistrationRaw: string | undefined
  mainMenu: string | undefined
  mainMenuRaw: string | undefined
  showAdvertisement: any
  showAdvertisementRaw: undefined | boolean
  advertisementMessage: string | undefined
  advertisementMessageRaw: undefined | string
  tableCol:any
  tableRow:any
  constructor(public Mainservice: mainservice, private http: HttpClient) {

  }

  ngOnInit(): void {
    console.log("data when click")
  }
  ngOnChanges(changes: SimpleChange) {
    this.sidebardata1 = this.sidebardata;
    this.setListData1 = this.setListData;
    this.tableCol=this.setListData
    
    console.log("printing ",this.setListData)
    if (this.sidebardata1 == 'Configuration') {
      this.http.post(`${environment.baseURL}/Configuration`, {}).toPromise()
        .then((data: any) => {
          console.log(data, "data")
          this.Mainservice.pageloaderMainservice = false
          data.forEach((elementData: any) => {
            if (elementData.key == 'showAdvertisement') {

              this.showAdvertisement = elementData.data == 'true' ? true : false
              this.showAdvertisementRaw = elementData.data == 'true' ? true : false


            } else if (elementData.key == 'advertisementMessage') {
              this.advertisementMessage = elementData.data
              this.advertisementMessageRaw = elementData.data
              console.log(elementData.data)
            }
            else if (elementData.key == 'mainMenu') {
              this.mainMenu = elementData.data
              this.mainMenuRaw = elementData.data
              console.log(elementData.data)
            }
            else if (elementData.key == 'beforeRegistration') {
              this.beforeRegistration = elementData.data
              this.beforeRegistrationRaw = elementData.data
              console.log(elementData.data)
            }
          })



        }).catch((data) => {
          this.Mainservice.errorPopup = true
          this.Mainservice.pageloaderMainservice = false

        });
    }

    // table changes

    if(this.sidebardata1 == 'Training'){
    this.tableRow=[
      {
          "key": "id",
          "sorting": false,
          "filter": false,
          "rowValue": "id"
      },
      {
          "key": "uuid",
          "sorting": false,
          "filter": false,
          "rowValue": "uuid"
      },
      {
          "key": "title",
          "sorting": true,
          "filter": false,
          "rowValue": "Title"
      },
      {
          "key": "registrationLink",
          "sorting": false,
          "filter": false,
          "rowValue": "Registration Link"
      },
      {
          "key": "description",
          "sorting": false,
          "filter": false,
          "rowValue": "Description"
      },
      {
          "key": "startdate",
          "sorting": true,
          "filter": false,
          "rowValue": "Start date"
      },
      {
          "key": "enddate",
          "sorting": true,
          "filter": false,
          "rowValue": "End date"
      },
      {
          "key": "address",
          "sorting": false,
          "filter": false,
          "rowValue": "Address"
      },
      {
          "key": "basic_requirement",
          "sorting": false,
          "filter": false,
          "rowValue": "Basic Requirements"
      },
      {
          "key": "sector",
          "sorting": true,
          "filter": true,
          "rowValue": "Sector"
      },
      {
          "key": "municipality",
          "sorting": true,
          "filter": true,
          "rowValue": "Municipality"
      },
      {
          "key": "organizedBy",
          "sorting": true,
          "filter": true,
          "rowValue": "Organized By"
      },
      {
          "key": "mapLink",
          "sorting": false,
          "filter": false,
          "rowValue": "Location Link"
      },
      {
          "key": "feeRegistration",
          "sorting": false,
          "filter": false,
          "rowValue": "Registration fee"
      },
     
      {
          "key": "howToRegister",
          "sorting": false,
          "filter": false,
          "rowValue": "How to register"
      },
      {
          "key": "lastDateToApply",
          "sorting": false,
          "filter": false,
          "rowValue": "Last date to apply"
      },
      {
          "key": "otherInfo",
          "sorting": false,
          "filter": false,
          "rowValue": "Other information"
      }
  ]
  }
  else if(this.sidebardata1 == 'Learnings - upskill'){
  
    this.tableRow=[
      {
          "key": "uuid",
          "sorting": false,
          "filter": false,
          "rowValue": "uuid"
      },
      {
          "key": "courseName",
          "sorting": true,
          "filter": false,
          "rowValue": "Course Name"
      },
      {
          "key": "sector",
          "sorting": true,
          "filter": true,
          "rowValue": "Sector"
      },
      {
          "key": "courseLink",
          "sorting": false,
          "filter": false,
          "rowValue": "Course Link "
      },
      {
          "key": "description",
          "sorting": false,
          "filter": false,
          "rowValue": "Description"
      },
      {
          "key": "moduleName",
          "sorting": true,
          "filter": true,
          "rowValue": "Module"
      },
      {
          "key": "resourceslink",
          "sorting": false,
          "filter": false,
          "rowValue": "Resource"
      }
  ] }
  else if(this.sidebardata1 == 'Job Offers'){
    this.tableRow=[
    
      {
          "key": "uuid",
          "sorting": false,
          "filter": false,
          "rowValue": "uuid"
      },
      {
          "key": "title",
          "sorting": true,
          "filter": false,
          "rowValue": "Title"
      },
      {
          "key": "linkToApply",
          "sorting": false,
          "filter": false,
          "rowValue": "Link to apply"
      },
      {
          "key": "sector",
          "sorting": true,
          "filter": true,
          "rowValue": "Sector"
      },
      {
          "key": "description",
          "sorting": false,
          "filter": false,
          "rowValue": "Description"
      },
      {
          "key": "basicRequirements",
          "sorting": false,
          "filter": false,
          "rowValue": "Basic Requirements"
      },
      {
          "key": "rolesAndResponsibility",
          "sorting": false,
          "filter": false,
          "rowValue": "Roles and Responsibility"
      },
      {
          "key": "jobCountry",
          "sorting": true,
          "filter": true,
          "rowValue": "Country"
      },
      {
          "key": "lastDatetoApply",
          "sorting": true,
          "filter": false,
          "rowValue": "Last date to apply"
      },
      {
          "key": "howToApply",
          "sorting": false,
          "filter": false,
          "rowValue": "How to apply"
      },
      {
          "key": "jobDescriptionPDFLink",
          "sorting": false,
          "filter": false,
          "rowValue": "Resource"
      },
      {
          "key": "address",
          "sorting": false,
          "filter": false,
          "rowValue": "Address"
      }
  ]
  }
  else if(this.sidebardata1 == 'EBooks'){
    // this.setListData[0]
    // let newarray=[]
    // for (const [key, value] of Object.entries(this.setListData[0])) {
    //   console.log(key, value);
    //   newarray.push({ 
    //     "key": key,
    //     "sorting": false,
    //     "filter": false,
    //     "rowValue": ""
    // })
    // console.log(newarray,"finnally newarray will  be")
    this.tableRow=[
    
      {
          "key": "uuid",
          "sorting": false,
          "filter": false,
          "rowValue": "uuid"
      },
      {
          "key": "title",
          "sorting": true,
          "filter": false,
          "rowValue": "Title"
      },
      {
          "key": "language",
          "sorting": true,
          "filter": true,
          "rowValue": "Language"
      },
      {
          "key": "description",
          "sorting": false,
          "filter": false,
          "rowValue": "Description"
      },
      {
          "key": "downloadLink",
          "sorting": false,
          "filter": false,
          "rowValue": "Download Link"
      },
      {
          "key": "noPages",
          "sorting": true,
          "filter": false,
          "rowValue": "No of page"
      },
      {
          "key": "publisherName",
          "sorting": true,
          "filter": true,
          "rowValue": "Publisher Name"
      },
      {
          "key": "resourceslink",
          "sorting": false,
          "filter": false,
          "rowValue": "Resource"
      }
  ]
    
    
  }
  }
  onEdit(type: any, data: any, index: number) {
    console.log(index, "index")
    this.onEditData.emit({ type: type, data: data, index: index })
  }

  showchange(inputData: any) {
    this.Mainservice.pageloaderMainservice = true
    let passingdata
    console.log("showchange", inputData)
    if (inputData == 'showAdvertisement') {

      passingdata = { showAdvertisement: !this.showAdvertisement }


    } else if (inputData == 'advertisementMessage') {
      passingdata = { advertisementMessage: this.advertisementMessage }
    }
    else if (inputData == 'mainMenu') {
      passingdata = { mainMenu: this.mainMenu }
    }
    else if (inputData == 'beforeRegistration') {
      console.log("coming here", this.beforeRegistration)
      passingdata = { beforeRegistration: this.beforeRegistration }
    }
    this.http.post(`${environment.baseURL}/Configuration`, passingdata).toPromise().then(async (data: any) => {
      console.log(data, "data")
      this.http.post(environment.systemConfigUpdationURL, {}).toPromise().then((res) => {
        this.Mainservice.pageloaderMainservice = false

        this.showAdvertisementRaw = this.showAdvertisement
        this.beforeRegistrationRaw = this.beforeRegistration
        this.mainMenuRaw = this.mainMenu
        this.advertisementMessageRaw = this.advertisementMessage
      }).catch((err) => {
        this.Mainservice.errorPopup = true
        this.Mainservice.pageloaderMainservice = false
      })

    }).catch((data) => {
      this.Mainservice.errorPopup = true
      this.Mainservice.pageloaderMainservice = false

    });
  }


  onDelete(type: any, index: number) {
    $('#exampleModal').modal('show')
    this.deleteBoolean = true
    this.deletedata = { type: type, index: index }
  }

  deleteFunCall() {
    this.onDeleteData.emit(this.deletedata)
    this.deleteBoolean = false
    $('#exampleModal').modal('hide')
  }

  abortFun() {
    $('#exampleModal').modal('hide')
    this.deletedata = {}
    this.deleteBoolean = false

  }

  showcheckChange(data: any) {
    this.showchange('showAdvertisement')
  }

  onSortDatafun(event:any){
    console.log(event,"from listata screen")
    this.onSortData.emit(event)
  }

  filterEventfun(event:any){
    this.filterEvent.emit(event)
  }
 
}
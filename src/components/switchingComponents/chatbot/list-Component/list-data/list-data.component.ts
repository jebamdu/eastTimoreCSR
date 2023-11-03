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

  constructor(public Mainservice: mainservice, private http: HttpClient) {

  }

  ngOnInit(): void {
    console.log("data when click")
  }
  ngOnChanges(changes: SimpleChange) {
    this.sidebardata1 = this.sidebardata;
    this.setListData1 = this.setListData;
    console.log("printing ")
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
}
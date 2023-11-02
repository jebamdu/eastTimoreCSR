import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Injectable, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { mainservice } from 'src/components/main.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.less'],
})
@Injectable()
export class ListComponentComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect: any;
  @Output() errorPopupFun = new EventEmitter<string>();
  @Input() dummydivfromsidebar: boolean | undefined
  public loadContent: boolean = false;
  public name = 'Cricketers';
  public muncipality_data: any = [];
  public sector_data_trainings: string[] = [];
  public sector_data_jobs: string[] = [];
  public sector_data_skills: string[] = [];
  public ebooks_resource_language: string[] = [];
  public settings = {};
  public sector_settings = {};
  public errorPopup: boolean = false
  public pageloadder: boolean = false;
  public selectedItems = [];
  public originalData = []
  public searchSring: any = ''
  userDataDisplay: any = []
  listData: any[] = [];
  Mainservice: any;
  public setListData: any = [];
  editFlag: boolean = false;
  editDetails: any = '';
  EditDatauuid: any


  joboffersForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    linkToApply: new FormControl(''),
    address: new FormControl('', Validators.required),
    rolesAndResponsibility: new FormControl(''),
    basicRequirements: new FormControl('', Validators.required),
    sector: new FormControl(this.sector_data_jobs, Validators.required),
    // trainingFrequency: new FormControl('',Validators.required),
  })


  trainingFrom = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    registrationLink: new FormControl(''),
    startdate: new FormControl('', Validators.required),
    enddate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    basic_requirement: new FormControl(''),
    municipality: new FormControl(this.muncipality_data, Validators.required),
    sector: new FormControl(this.sector_data_trainings, Validators.required),
    frequencyIntervel: new FormControl(2, Validators.required),
  })

  resourcearray() {
    return new FormGroup({
      resourcelink: new FormControl('', Validators.required),
      resourceName: new FormControl('', Validators.required)
    })
  }
  addresource() {

    let resourcearray = this.learnAndUpskill.get('resourceslink') as FormArray
    resourcearray.push(this.resourcearray())
  }
  getResource(index: any) {
    let resourcearray = this.learnAndUpskill.get('resourceslink') as FormArray
    return resourcearray.length - 1
  }
  deleteResource(index: number) {
    let resourcearray = this.learnAndUpskill.get('resourceslink') as FormArray
    if (index == 0) {
      resourcearray.controls[index].get('resourcelink')?.setValue('')
      resourcearray.controls[index].get('resourceName')?.setValue('')
    } else {
      resourcearray.removeAt(index)
    }

  }
  setfile(index: number, event: any) {
    console.log("coming here")
    this.Mainservice.pageloaderMainservice = true
    let resourcearray = this.learnAndUpskill.get('resourceslink') as FormArray
    let selectfile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectfile);

    // Make a POST request to your API endpoint
    this.http.post(`${environment.baseURL}/uploadfiles`, formData).toPromise().then(
      (response: any) => {
        console.log(response, "response")
        //  let resp= resourcearray.at(index)

        resourcearray.controls[index].get('resourcelink')?.setValue(response.data.Location)
        resourcearray.controls[index].get('resourceName')?.setValue(response.data.key)
        this.Mainservice.pageloaderMainservice = false
      }).catch((error) => {
        console.error('Error uploading file', error);
        this.Mainservice.pageloaderMainservice = false
      });
  }
  learnAndUpskill = new FormGroup({
    courseName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    // resourceslink: new FormControl([{data:'https:1234'}], Validators.required),
    resourceslink: this.fb.array([this.resourcearray()]),
    courseLink: new FormControl(''),
    sector: new FormControl(this.sector_data_skills, Validators.required),
  })

  helpLine = new FormGroup({
    data: new FormControl('', Validators.required),
    key: new FormControl('helplineMSG'),
    id: new FormControl(1)


  })

  constructor(private fb: FormBuilder, Mainservice: mainservice, private ngZone: NgZone, private cdr: ChangeDetectorRef, private http: HttpClient) {
    this.Mainservice = Mainservice;


  }

  ngOnChanges(SimpleChanges: any) {


  }

  ngOnInit(): void {
    this.pageloadder = true
    this.muncipality_data = [
      "Online",
      "Aileu",
      "Ainaro",
      "Atauro",
      "Baucau",
      "Bobonaro",
      "Covalima",
      "Dili",
      "Ermera",
      "Lautem",
      "Liquiça",
      "Manatuto",
      "Manufahi",
      "Oecusse",
      "Viqueque"
    ];

    this.sector_data_trainings = [
      "Languages",
      "Employability",
      "Technology",
      "Agriculture",
      "Travel, Tourism & Hospitality (TTH)",
      "Banking, Financial Services & Insurance (BFSI)",
      "Retail, E-Commerce & Entrepreneurship",
      "Health Care",
      "Transportation & Logistics",
      "Social Development",
      "Manufacturing & Heavy Industries"
    ];
    this.sector_data_jobs = [
      "Agriculture, Food Processing & Allied Services",
      "Information Technology",
      "Travel, Tourism & Hospitality (TTH)",
      "Banking, Financial Services & Insurance (BFSI)",
      "Retail, E-Commerce & Trade",
      "Health Care",
      "Transportation & Logistics",
      "Social Development",
      "Manufacturing & Heavy Industries",
      "Textile, Plastic & Chemicals",
      "Automobiles, Electric & Electronics"
    ];
    this.sector_data_skills = [
      "English",
      "Numerical Ability",
      "Logical Reasoning",
      "Computer Science",
      "Agriculture",
      "Animal Husbandry, Poultry, Piggery, Fishery",
      "Travel, Tourism & Hospitality",
      "BFSI - Banking, Financial Services & Insurance",
      "Retail & E-Commerce",
      "Entrepreneurship",
      "Health & Well Being",
      "Green Jobs, Renewable Energy",
      "Marine Studies",
      "Social Sciences",
      "History, Geography",
      "Civics, Political Science",
      "Communication, Leadership",
      "Physics",
      "Biology"
    ];
    this.ebooks_resource_language = [
      "Tetum",
      "English",
      "Portuguese",
      "Korean"
    ];


    // setting and support i18n
    this.settings = {
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
    // this.sector_data = {...this.muncipality_settings}

    // setting and support i18n


    this.Mainservice.sidebardata = { id: 1, values: 'Training' }
    this.setListDataRequest();

  }

  errorPopupClose() {
    this.Mainservice.errorPopup = false
  }
  //--------------------------------------------

  TrainingListData: any[] = [
  ];


  CourselListData: any[] = [

  ]

  JobOpportunityListData: any[] = []

  HelpLineListData: any[] = []

  SetDataListRequestPopup() {
    console.log("as esxpected Arockia")
    this.pageloadder = true
    setTimeout(() => {
      this.setListDataRequest()
    }, 0)

  }
  setListDataRequest() {
    console.log("coming here...", this.Mainservice.header, this.Mainservice.sidebardata);
    console.log(this.pageloadder, "must false")

    this.pageloadder = true
    let headerVal = ''
    if (this.Mainservice.header == 'chatbot') {
      //makeHttpRequest
      if (this.Mainservice.sidebardata.values == 'Training') {
        headerVal = 'Trainings'
        this.setListData = this.TrainingListData;
        this.Mainservice.setListData = this.TrainingListData
      }
      if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
        headerVal = 'Learnings'
        this.setListData = this.CourselListData;
        this.Mainservice.setListData = this.CourselListData


      }
      if (this.Mainservice.sidebardata.values == 'Job Offers') {
        headerVal = 'Jobs'
        this.setListData = this.JobOpportunityListData;
        this.Mainservice.setListData = this.JobOpportunityListData

      }
      if (this.Mainservice.sidebardata.values == 'Help Line') {
        headerVal = 'HelpLine'
        this.setListData = this.HelpLineListData;
        this.Mainservice.setListData = this.HelpLineListData

      }

      this.cdr.markForCheck();
      this.Mainservice.pageloaderMainservice = true
      if (this.Mainservice.sidebardata.values != 'Configuration') {
        this.http.get(`${environment.baseURL}/getData?headers=` + headerVal).toPromise()
          .then((data: any) => {
            console.log(data, "data")
            this.Mainservice.pageloaderMainservice = false
            this.Mainservice.setListData = data

          }).catch((data) => {
            this.Mainservice.errorPopup = true
            this.Mainservice.pageloaderMainservice = false
            console.log(this.pageloadder, "task completed Arockia")
          });
      }


    }


  }


  get f() {
    if (this.Mainservice.sidebardata.values == 'Training') {
      return this.trainingFrom.controls;
    }
    else if (this.Mainservice.sidebardata.values == 'Job Offers') {
      return this.joboffersForm.controls;
    }
    else if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
      return this.learnAndUpskill.controls;
    }
    return

  }

  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

  addSubmitForm() {
    //need change here
    this.Mainservice.pageloaderMainservice = true
    let headerdata = ''
    let behaviour = 'insertTableData'
    let formData = {}
    if (this.Mainservice.sidebardata.values == 'Training') {
      headerdata = 'Trainings'


      if (this.editFlag) {
        behaviour = 'ModifyTableData'
        formData = this.trainingFrom.value
      }
      else {
        formData = this.trainingFrom.value
      }
      $("#addPopUp").modal('hide');
      console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values);
    }
    else if (this.Mainservice.sidebardata.values == 'Job Offers') {
      headerdata = 'Jobs'


      if (this.editFlag) {
        behaviour = 'ModifyTableData'
        formData = this.joboffersForm.value
      }
      else {
        formData = this.joboffersForm.value
      }
      $("#addPopUp").modal('hide');
      console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values)
    }
    else if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
      headerdata = 'Learnings'
      if (this.editFlag) {
        behaviour = 'ModifyTableData'
        formData = this.learnAndUpskill.value
      }
      else {
        formData = this.learnAndUpskill.value
        this.CourselListData.push(this.learnAndUpskill.value);
      }

      $("#addPopUp").modal('hide');
      console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values)
    }
    else if (this.Mainservice.sidebardata.values == 'Help Line') {
      headerdata = 'Help Line'
      formData = this.helpLine.value
      behaviour = 'ModifyTableData'





      $("#addPopUp").modal('hide');
      // this.Mainservice.setListData = this.HelpLineListData;
    }

    let bodyparams = {}
    if (behaviour == 'insertTableData') {
      bodyparams = { TableName: headerdata, TableData: formData }
    } else {
      bodyparams = { TableName: headerdata, TableData: formData, id: headerdata == 'Help Line' ? this.editDetails.data.id : this.editDetails.data.uuid }
    }
    this.http.post(`${environment.baseURL}/` + behaviour, bodyparams).toPromise()
      .then((data: any) => {
        console.log(data, "data")
        this.Mainservice.pageloaderMainservice = false
        // this.Mainservice.setListData=data
        if (behaviour == 'insertTableData') {
          console.log(this.Mainservice.setListData, "this.Mainservice.setListData")
          this.Mainservice.setListData.push(data)
        } else {
          if (this.searchSring != '') {
            let index = this.userDataDisplay.findIndex((data: any) => data['uuid'] === this.editDetails['data']['uuid']);
            console.log(index)
            if (index > -1) {
              this.userDataDisplay[index] = formData;
            }
            let mainindex = this.Mainservice.setListData.findIndex((data: any) => data['uuid'] === this.editDetails['data']['uuid']);
            if (index > -1) {
              this.Mainservice.setListData[mainindex] = formData;
            }
          } else {
            console.log("coming here help line", this.Mainservice.setListData)
            if (headerdata == 'Help Line') {
              let index = this.Mainservice.setListData.findIndex((data: any) => data['id'] === this.editDetails['data']['id']);
              console.log(index, formData)
              if (index > -1) {
                this.Mainservice.setListData[0] = formData;
              }
            } else {
              let index = this.Mainservice.setListData.findIndex((data: any) => data['uuid'] === this.editDetails['data']['uuid']);
              console.log(index)
              if (index > -1) {
                this.Mainservice.setListData[index] = formData;
              }
            }
          }



        }
      }).catch((data) => {
        this.Mainservice.errorPopup = true
        this.Mainservice.pageloaderMainservice = false
      });

  }

  openModal() {
    this.trainingFrom.reset()
    this.joboffersForm.reset()
    this.learnAndUpskill.reset()
    this.editFlag = false;
    $("#addPopUp").modal('show');
  }
  show() {
    // console.log(this.trainingFrom.value.trainingFrequency);

  }
  onEditData(event: any) {
    console.log(event, "event update")
    this.editFlag = true;
    this.editDetails = event;
    $("#addPopUp").modal('show');
    console.log(this.editDetails)
    if (event['type'] == 'Training') {
      this.trainingFrom.patchValue({
        title: event['data']['title'],
        description: event['data']['description'],
        registrationLink: event['data']['registrationLink'],
        startdate: event['data']['startdate'],
        enddate: event['data']['enddate'],
        address: event['data']['address'],
        basic_requirement: event['data']['basic_requirement'],
        municipality: event['data']['municipality'],
        sector: event['data']['sector'],
      })
      console.log(this.trainingFrom.value, "training form value")
    }
    else if (event['type'] == 'Job Offers') {
      this.joboffersForm.patchValue({
        title: event['data']['title'],
        description: event['data']['description'],
        linkToApply: event['data']['linkToApply'],
        rolesAndResponsibility: event['data']['rolesAndResponsibility'],
        basicRequirements: event['data']['basicRequirements'],
        address: event['data']['address'],
        sector: event['data']['sector'],
      })
    }

    else if (event['type'] == 'Learnings - upskill') {

      this.learnAndUpskill.patchValue({
        courseName: event['data']['courseName'],
        description: event['data']['description'],
        resourceslink: event['data']['resourceslink'],
        courseLink: event['data']['courseLink'],
        sector: event['data']['sector'],
      })
    }


    else if (event['type'] == 'Help Line') {

      this.helpLine.patchValue({
        data: event['data']['data'],
        key: 'helplineMSG',
        id: 1
      })
    }
    console.log(event['type'], "help lne")
    $("#exampleModalCenter").modal('show');


  }
  onDeleteData(event: any) {
    let headerdata = ''
    if (event['type'] == 'Training') {
      headerdata = 'Trainings'
    }
    else if (event['type'] == 'Job Offers') {
      headerdata = 'Jobs'
    }
    else if (event['type'] == 'Learnings - upskill') {
      headerdata = 'Learnings'
    }
    else if (event['type'] == 'Help Line') {
      headerdata = 'helpline'
    }
    this.Mainservice.pageloaderMainservice = true
    this.http.post(`${environment.baseURL}/deleteTableData`, { TableName: headerdata, id: event.index }).toPromise()
      .then((data: any) => {

        this.Mainservice.setListData = this.Mainservice.setListData.filter((data: any) => {

          return data.uuid != event.index
        });

        this.userDataDisplay = this.userDataDisplay.filter((data: any) => {

          return data.uuid != event.index
        });

        console.log(this.Mainservice.setListData, "this.TrainingListData")
        this.Mainservice.setListData = this.Mainservice.setListData;

        this.Mainservice.pageloaderMainservice = false
      }).catch((data) => {
        this.Mainservice.errorPopup = true
        this.Mainservice.pageloaderMainservice = false
      })


  }

  abortaddFun() {
    $("#addPopUp").modal('hide');
  }

  changeEventCall(event: any) {


    event = event.toLowerCase()
    if (event != '') {
      let tempArray: any[] = []
      this.Mainservice.setListData.forEach((elementData: any) => {
        let index = false
        Object.values(elementData).some((item: any) => {
          if (item) {
            if (item.toString().toLowerCase().indexOf(event) > -1) {
              return (index = true)
            }
            else { return }
          } else {
            return
          }
        })
        if (index) {
          tempArray.push(elementData)
        }
      });
      this.userDataDisplay = [...tempArray]
    } else {
      this.userDataDisplay = [...this.Mainservice.setListData]
    }



  }
}


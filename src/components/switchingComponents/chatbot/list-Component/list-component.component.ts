import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Injectable, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
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
  public settings_ebook = {};
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
  validationPopup = false
  


  joboffersForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    linkToApply: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    rolesAndResponsibility: new FormControl('', Validators.required),
    basicRequirements: new FormControl(''),
    jobCountry: new FormControl('', Validators.required),
    lastDatetoApply: new FormControl('', [Validators.required,dateValidator]),
    sector: new FormControl(this.sector_data_jobs, Validators.required),
    howToApply: new FormControl('', Validators.required),
    jobDescriptionPDFLink:this.fb.group({
      link:new FormControl('', ),
      title:new FormControl('',),
    }),
    // trainingFrequency: new FormControl('',Validators.required),
  })


  trainingFrom = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    registrationLink: new FormControl('',Validators.required),
    startdate: new FormControl('', [Validators.required,dateValidator]),
    enddate: new FormControl('', [Validators.required,dateValidator]),
    address: new FormControl('', Validators.required),
    basic_requirement: new FormControl(''),
    municipality: new FormControl(this.muncipality_data, Validators.required),
    sector: new FormControl(this.sector_data_trainings, Validators.required),
    frequencyIntervel: new FormControl(2,),
    organizedBy: new FormControl('', Validators.required),
    mapLink: new FormControl(''),
    feeRegistration: new FormControl(''),
    lastDateToApply:new FormControl('',[ Validators.required,dateValidator]),
  otherInfo: new FormControl('', ),
  howToRegister: new FormControl('', )

  })

  resourcearray() {
    return new FormGroup({
      resourcelink: new FormControl('', ),
      resourceName: new FormControl('', )
    })
  }
  courselinkarray() {
    return new FormGroup({
      link: new FormControl('',Validators.required ),
    })
  }

  ebookresourcearray() {
    return new FormGroup({
      link: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    })
  }
  addresource() {

    let resourcearray = this.learnAndUpskill.get('resourceslink') as FormArray
    resourcearray.push(this.resourcearray())
  }

  addCourselink() {

    let resourcearray = this.learnAndUpskill.get('courseLink') as FormArray
    resourcearray.push(this.courselinkarray())
  }
 
  getResource(index: any) {
    let resourcearray = this.learnAndUpskill.get('resourceslink') as FormArray
    return resourcearray.length - 1
  }
  getCourseLink(index: any) {
    let resourcearray = this.learnAndUpskill.get('courseLink') as FormArray
    return resourcearray.length - 1
  }

  deleteResource(index: number) {
    console.log("delete resource check")
    let resourcearray = this.learnAndUpskill.get('resourceslink') as FormArray
      if (index == 0 && resourcearray.value.length==1) {
      resourcearray.controls[index].get('resourcelink')?.setValue('')
      resourcearray.controls[index].get('resourceName')?.setValue('')
    } else {
      resourcearray.removeAt(index)
    }

  }
  deleteCourseLink(index: number) {
    let resourcearray = this.learnAndUpskill.get('courseLink') as FormArray
    if (index == 0  && resourcearray.value.length==1) {
      resourcearray.controls[index].get('link')?.setValue('')
    
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
    formData.append('folderName', 'Learnings');

    // Make a POST request to your API endpoint
    this.http.post(`${environment.baseURL}/uploadfiles`, formData).toPromise().then(
      (response: any) => {
        console.log(response, "response")
        //  let resp= resourcearray.at(index)

        resourcearray.controls[index].get('resourcelink')?.setValue(response.data.Location)
        resourcearray.controls[index].get('resourceName')?.setValue(response.data.key)
        console.log(this.learnAndUpskill,
          "this.learnAndUpskill")
        this.Mainservice.pageloaderMainservice = false
      }).catch((error) => {
        console.error('Error uploading file', error);
        this.Mainservice.pageloaderMainservice = false
      });
  }
  resetFileInput(data:any) {
      const fileInput = document.getElementById(data) as HTMLInputElement | null;
    if (fileInput) {
          fileInput.value = '';
    }
  }
  setfileebook( event: any) {
    console.log("coming here")
    this.Mainservice.pageloaderMainservice = true
    let resourcearray = this.ebooks.get('resourceslink')?.get('link')?.setValue('xyz')
    let selectfile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectfile);
    formData.append('folderName', 'Ebook');

    // Make a POST request to your API endpoint
    this.http.post(`${environment.baseURL}/uploadfiles`, formData).toPromise().then(
      (response: any) => {
        console.log(response, "response")
        //  let resp= resourcearray.at(index)
        this.ebooks.get('resourceslink')?.get('link')?.setValue(response.data.Location)
        this.ebooks.get('resourceslink')?.get('title')?.setValue(response.data.key)
              this.Mainservice.pageloaderMainservice = false
      }).catch((error) => {
        console.error('Error uploading file', error);
        this.Mainservice.pageloaderMainservice = false
      });
  }
  setfileJobs( event: any) {
    console.log("coming here")
    this.Mainservice.pageloaderMainservice = true
    let selectfile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectfile);
    formData.append('folderName', 'Jobs');

    // Make a POST request to your API endpoint
    this.http.post(`${environment.baseURL}/uploadfiles`, formData).toPromise().then(
      (response: any) => {
        console.log(response, "response")
     
        this.joboffersForm.get('jobDescriptionPDFLink')?.get('link')?.setValue(response.data.Location  )
        this.joboffersForm.get('jobDescriptionPDFLink')?.get('title')?.setValue(response.data.key  )
     
        console.log( this.joboffersForm,"resource")
   
       
        //  let resp= resourcearray.at(index)
        // resource?.set
  
        this.Mainservice.pageloaderMainservice = false
      }).catch((error) => {
        console.error('Error uploading file', error);
        this.Mainservice.pageloaderMainservice = false
      });
  }
  ebooks = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    downloadLink: new FormControl('',Validators.required),
    noPages: new FormControl('', Validators.required),
    publisherName: new FormControl('', Validators.required),
    resourceslink:this.fb.group({
      link:new FormControl('', ),
      title:new FormControl('', ),
    }),
    language: new FormControl(this.ebooks_resource_language, Validators.required),
   
    // resourceslink: new FormControl([{data:'https:1234'}], Validators.required),
  })
  learnAndUpskill = new FormGroup({
    courseName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    // resourceslink: new FormControl([{data:'https:1234'}], Validators.required),
    resourceslink: this.fb.array([this.resourcearray()]),
    courseLink:  this.fb.array([this.courselinkarray()]),
    sector: new FormControl(this.sector_data_skills, Validators.required),
    moduleName:new FormControl('', Validators.required)
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
    this.Mainservice.setSortFilerData={active:'',status:false,filterData: []}
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

    this.settings_ebook = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect',
      allowSearchFilter: false,
      limitSelection: 1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'search',
      noDataAvailablePlaceholderText: 'No data',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

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


  EbooksListData: any[] = []
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
    this.pageloadder = true
    let headerVal = ''
    this.Mainservice.setSortFilerData.active='';
    this.Mainservice.setSortFilerData.status=false;
    if (this.Mainservice.header == 'chatbot') {
      //makeHttpRequest
      if (this.Mainservice.sidebardata.values == 'Training') {
        this.Mainservice.setSortFilerData={active:'',status:false,filterData: []}
        headerVal = 'Trainings'
        this.setListData = this.TrainingListData;
        this.Mainservice.setListData = this.TrainingListData
      }
      if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
        this.Mainservice.setSortFilerData={active:'',status:false,filterData: []}
        headerVal = 'Learnings'
        this.setListData = this.CourselListData;
        this.Mainservice.setListData = this.CourselListData


      }
      if (this.Mainservice.sidebardata.values == 'Job Offers') {
        this.Mainservice.setSortFilerData={active:'',status:false,filterData: []}
        headerVal = 'Jobs'
        this.setListData = this.JobOpportunityListData;
        this.Mainservice.setListData = this.JobOpportunityListData

      }
      if (this.Mainservice.sidebardata.values == 'EBooks') {
        this.Mainservice.setSortFilerData={active:'',status:false,filterData: []}
        headerVal = 'EBooks'
        this.setListData = this.EbooksListData;
        this.Mainservice.setListData = this.EbooksListData

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
    else if (this.Mainservice.sidebardata.values == 'EBook') {
      return this.ebooks.controls;
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
    let formData :any = {}
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
        if(formData?.jobDescriptionPDFLink?.title == '' ||  formData?.jobDescriptionPDFLink?.title == null){
          formData.jobDescriptionPDFLink={}
        }
      }
      else {
        formData = this.joboffersForm.value
        if(formData?.jobDescriptionPDFLink?.title == '' || formData?.jobDescriptionPDFLink?.title == null){
          formData.jobDescriptionPDFLink={}
        }
       
      }
      $("#addPopUp").modal('hide');
      console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values)
    }
    else if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
      console.log(this.learnAndUpskill.value)
      headerdata = 'Learnings'
      if (this.editFlag) {
        behaviour = 'ModifyTableData'
        formData = this.learnAndUpskill.value
        console.log(formData.resourceslink[0].resourcelink,"formData?.resourceslink[0]?.resourceslink")
        if(formData.resourceslink[0].resourcelink==''|| formData.resourceslink[0].resourcelink==null){
          formData.resourceslink=[]
        }
        console.log(formData,"formData")
      }
      else {
        formData = this.learnAndUpskill.value
        this.CourselListData.push(this.learnAndUpskill.value);
        if(formData.resourceslink[0].resourcelink==''|| formData.resourceslink[0].resourcelink==null){
          formData.resourceslink=[]
        }
      }

      $("#addPopUp").modal('hide');
      console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values)
    }
    else if (this.Mainservice.sidebardata.values == 'EBooks') {
      headerdata = 'EBooks'
      if (this.editFlag) {
        behaviour = 'ModifyTableData'
        formData = this.ebooks.value
        if(formData?.resourceslink?.title == '' ||  formData?.resourceslink?.title == null){
          formData.resourceslink={}
        }
      }
      else {
        formData = this.ebooks.value
        this.CourselListData.push(this.ebooks.value);
        if(formData?.resourceslink?.title == '' ||  formData?.resourceslink?.title == null){
          formData.resourceslink={}
        }
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

      return

  }

  openModal() {
    this.trainingFrom.reset()
    this.joboffersForm.reset()
    this.learnAndUpskill.reset()
    this.ebooks.reset()
    this.editFlag = false;
    $("#addPopUp").modal('show');
  }
  show() {
    // console.log(this.trainingFrom.value.trainingFrequency);

  }
  onEditData(event: any) {
    console.log("coming here")
    
    console.log(event, "event update")
    this.editFlag = true;
    this.editDetails = event;
    $("#addPopUp").modal('show');
    console.log(this.editDetails)
    if (event['type'] == 'Training') {
      this.trainingFrom.reset()
      const Lastdate = new Date(event['data']['lastDateToApply']).toISOString().split('T')[0];
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
        organizedBy: event['data']['organizedBy'],
        mapLink: event['data']['mapLink'],
        feeRegistration: event['data']['feeRegistration'],
        lastDateToApply:Lastdate,
      otherInfo: event['data']['otherInfo'],
      howToRegister: event['data']['howToRegister']
    
      })
      console.log(this.trainingFrom.value, "training form value")
    }
    else if (event['type'] == 'Job Offers') {
      this.joboffersForm.reset()
      const Lastdate = new Date( event['data']['lastDatetoApply']).toISOString().split('T')[0];
      this.joboffersForm.patchValue({
        title: event['data']['title'],
        description: event['data']['description'],
        linkToApply: event['data']['linkToApply'],
        rolesAndResponsibility: event['data']['rolesAndResponsibility'],
        basicRequirements: event['data']['basicRequirements'],
        address: event['data']['address'],
        sector: event['data']['sector'],
        jobCountry: event['data']['jobCountry'],
        lastDatetoApply: Lastdate,
        howToApply: event['data']['howToApply'],
    jobDescriptionPDFLink:{
      link:event['data']['jobDescriptionPDFLink']['link'],
      title:event['data']['jobDescriptionPDFLink']['title'],
    },
      })
    }

    else if (event['type'] == 'Learnings - upskill') {
      let resourcelinkvalue=this.learnAndUpskill.get('resourceslink') as FormArray;

      this.learnAndUpskill.get('resourceslink')?.value.forEach((data:any,index:number)=>{
      
          resourcelinkvalue.removeAt(resourcelinkvalue.length-1) 
        
      })
      console.log( this.learnAndUpskill.get('resourceslink')?.value," this.learnAndUpskill.get('resourceslink')?.value")
     
      let courseLinkValue=this.learnAndUpskill.get('courseLink')as FormArray
      
      this.learnAndUpskill.get('courseLink')?.value.forEach((data:any,index:number)=>{
       
          courseLinkValue.removeAt(courseLinkValue.length-1) 
        
      })
      this.learnAndUpskill.reset()
      console.log(event,"values")
      for (let index = 0; index < event['data']['courseLink'].length; index++) {
        this.addCourselink() 
      }
    
      for (let index = 0; index < event['data']['resourceslink'].length; index++) {
        this.addresource() 
      }
      
      let resourcelink:any
      if(event['data']['resourceslink'].length==0){
        this.addresource() 
        console.log("comming here arockia")
         resourcelink=[{resourceName:'', resourcelink:''}]
      }else{
        resourcelink=event['data']['resourceslink']
      }
      
      this.learnAndUpskill.patchValue({
        courseName: event['data']['courseName'],
        description: event['data']['description'],
        resourceslink:resourcelink ,
        courseLink: event['data']['courseLink'],
        sector: event['data']['sector'],
        moduleName:event['data']['moduleName']
      })
      console.log( this.learnAndUpskill," this.learnAndUpskill")
    }
    else if (event['type'] == 'EBooks') {
      console.log(event,"event")
      this.ebooks.patchValue({
        title: event['data']['title'],
        description: event['data']['description'],
        downloadLink: event['data']['downloadLink'],
        language: event['data']['language'],
        noPages: event['data']['noPages'],
        publisherName: event['data']['publisherName'],
        resourceslink:{
          link:event['data']['resourceslink']['link'],
          title:event['data']['resourceslink']['title'],
        },
      })
      console.log(this.ebooks,"ebook")
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
    else if (event['type'] == 'EBooks') {
      headerdata = 'EBooks'
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

  deletejobDescriptionPDFLink(){
    this.joboffersForm.get('jobDescriptionPDFLink')?.get('title')?.setValue('')
    this.joboffersForm.get('jobDescriptionPDFLink')?.get('link')?.setValue('')
  }

  deleteResourceLinkEbook(){
    this.ebooks.get('resourceslink')?.get('title')?.setValue('')
    this.ebooks.get('resourceslink')?.get('link')?.setValue('')
  }

  onSortData(sort:any) {
    let data =[...this.Mainservice.setListData];
    const index = data.findIndex((x:any) => x['level'] == 1);
    // if (sort.active && sort.direction !== '') {
      console.log(sort.direction,"sortingdirection")
    if (sort.active ) {
      if (index > -1) {
        data.splice(index, 1);
      }
      this.Mainservice.setSortFilerData.active=sort.active
      this.Mainservice.setSortFilerData.status=sort.direction
      
    if(this.Mainservice.sidebardata.values == 'EBooks'){
      data = data.sort((a: any, b: any) => {
        const isAsc = sort.direction;
        return this.compare(a[sort.active],a[sort.active],isAsc)
      });
    } else if(this.Mainservice.sidebardata.values == 'Learnings - upskill'){
      console.log("coming at end")
      data = data.sort((a: any, b: any) => {
        const isAsc = sort.direction;
        return this.compare(a[sort.active],b[sort.active],isAsc)
      });
    }  else if(this.Mainservice.sidebardata.values == 'Training'){
      data = data.sort((a: any, b: any) => {
        const isAsc = sort.direction;
        return this.compare(a[sort.active],b[sort.active],isAsc)
      });
    }  else if(this.Mainservice.sidebardata.values == 'Job Offers'){
      data = data.sort((a: any, b: any) => {
        const isAsc = sort.direction;
        return this.compare(a[sort.active],b[sort.active],isAsc)
      });
    }
    //  else if(this.Mainservice.sidebardata.values == 'Job Offers'){
    //   data = data.sort((a: any, b: any) => {
    //     const isAsc = sort.direction;
    //     // switch (sort.active) {         
    //     //   case 'jobCountry':            
    //     //     return this.compare(a.jobCountry, b.jobCountry, isAsc);
    //     //   case 'title':
    //     //     return this.compare(a.title, b.title, isAsc);
    //     //   default:
    //     //     return 0;
    //     // }
    //     return this.compare(a[sort.active],a[sort.active],isAsc)
    //   });
    // }
     
      this.userDataDisplay = data;
      this.Mainservice.setListData=data;
      console.log(this.userDataDisplay,"data.. modified")
    }

  }

  private compare(a:any, b:any, isAsc:any) {
    console.log(isAsc,"endvalue ......................")
    const comparison = a < b ? -1 : 1;
  return (isAsc ? 1 : -1) * comparison;
  }

  filterEventfun(event:any){
  }
}

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const date = new Date(control.value);
  if (isNaN(date.getTime())) {
    return { invalidDate: true };
  }
  return null;
}
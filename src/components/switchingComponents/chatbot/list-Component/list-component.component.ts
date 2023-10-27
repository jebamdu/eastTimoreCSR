import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Injectable, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { mainservice } from 'src/components/main.service';
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
  @Input() dummydivfromsidebar:boolean|undefined
  public loadContent: boolean = false;
  public name = 'Cricketers';
  public muncipality_data: any = [];
  public sector_data: any = [];
  public settings = {};
  public sector_settings = {};
  public errorPopup:boolean=false
  public pageloadder:boolean=false;
  public selectedItems = [];


  //
  listData: any[] = [];
  Mainservice: any;
  public setListData: any = [];
  editFlag: boolean = false;
  editDetails: any = '';
  EditDatauuid:any


  joboffersForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    linkToApply: new FormControl(''),
    address: new FormControl('', Validators.required),
    rolesAndResponsibility: new FormControl(''),
    basicRequirements: new FormControl('', Validators.required),
    sector: new FormControl(this.sector_data, Validators.required),
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
    sector: new FormControl(this.sector_data, Validators.required),
    frequencyIntervel: new FormControl(2, Validators.required),
  })

  resourcearray(){
    return new FormGroup({
      resourcelink:new FormControl('',Validators.required),
      resourceName:new FormControl('',Validators.required)
    })
  }
  addresource(){
 
    let resourcearray=this.learnAndUpskill.get('resourceslink')as FormArray
    resourcearray.push(this.resourcearray())
  }
  getResource(index:any){
    let resourcearray= this.learnAndUpskill.get('resourceslink')as FormArray
    return resourcearray.length-1
  }
  deleteResource(index:number){
    let resourcearray=this.learnAndUpskill.get('resourceslink')as FormArray
    if(index==0){
      resourcearray.controls[index].get('resourcelink')?.setValue('')
      resourcearray.controls[index].get('resourceName')?.setValue('')
    }else{
      resourcearray.removeAt(index)
    }
   
  }
  setfile(index:number,event:any){
    console.log("coming here")
    this.Mainservice.pageloaderMainservice=true
    let resourcearray=this.learnAndUpskill.get('resourceslink')as FormArray
    let selectfile= event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectfile);

    // Make a POST request to your API endpoint
    this.http.post('http://localhost:3000/uploadfiles', formData).toPromise().then(
      (response:any) => {
        console.log(response,"response")
      //  let resp= resourcearray.at(index)
     
     resourcearray.controls[index].get('resourcelink')?.setValue(response.data.Location)
     resourcearray.controls[index].get('resourceName')?.setValue(response.data.key)
        this.Mainservice.pageloaderMainservice=false
      } ).catch((error)=>{
        console.error('Error uploading file', error);
        this.Mainservice.pageloaderMainservice=false
      });
  }
  learnAndUpskill = new FormGroup({
    courseName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    // resourceslink: new FormControl([{data:'https:1234'}], Validators.required),
    resourceslink:this.fb.array([ this.resourcearray()]),
    courseLink: new FormControl(''),
    sector: new FormControl(this.sector_data, Validators.required),
  })

  helpLine = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ContactNumber: new FormControl([], Validators.required),

  })

  constructor(private fb: FormBuilder,Mainservice: mainservice, private ngZone: NgZone, private cdr: ChangeDetectorRef,private http: HttpClient) {
    this.Mainservice = Mainservice;


  }

  ngOnChanges(SimpleChanges: any) {


  }

  ngOnInit(): void {
    this.pageloadder=true
    this.muncipality_data = [ 'Lautem',  "Dili",   "Aileu" ];
    this.sector_data = [ 'Engineering' ,  "Electronics" ,  "Automobiles" ]


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

  errorPopupClose(){
    this.Mainservice.errorPopup=false
  }
  //--------------------------------------------

  TrainingListData: any[] = [
    {
      id: 1,
      name: 'Logical Thinking',
      description:
        'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
      registrationLink:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link',
      startDate: '2022-02-10',
      endDate: '2022-03-09',
      address: '7/1,soosai nagar3rd street,vilangudi,Madurai-18',
      municipality: [{ id: 1, name: 'Lautem' }],
      sector: [
        { id: 1, name: 'computer science' },
        { id: 2, name: 'Maths' },
      ],
      trainingFrequency: 'once',
    },
    {
      id: 2,
      name: 'Design Thinking',
      description:
        'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
      registrationLink:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link',
      startDate: '2022-02-10',
      endDate: '2022-03-09',
      address: '7/1,soosai nagar3rd street,vilangudi,Madurai-18',
      municipality: [{ id: 1, name: 'Lautem' }],
      sector: [
        { id: 1, name: 'computer science' },
        { id: 2, name: 'Maths' },
      ],
      trainingFrequency: 'once',
    },
    {
      id: 3,
      name: 'ComputerTrainings',
      description:
        'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
      registrationLink:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link',
      startDate: '2022-02-10',
      endDate: '2022-03-09',
      address: '7/1,soosai nagar3rd street,vilangudi,Madurai-18',
      municipality: '',
      sector: [
        { id: 1, name: 'computer science' },
        { id: 2, name: 'Maths' },
      ],
      trainingFrequency: 'once',
    },
  ];


  CourselListData: any[] = [

    {
      id: 1,
      courseName: 'Mathematical Courses',
      description:
        'Maths course dumy can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking',
      courseLink: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.',
      Resources: [{ id: 1, name: 'Algeebra', s3link: '' }, { id: 2, name: 'Charts', s3link: '' }, { id: 3, name: 'statstics', s3link: '' }],
      sector: { id: 2, name: 'Maths' }
    },
    {
      id: 2,
      courseName: 'Verbal Courses',
      description:
        'verbal dummy can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
      courseLink: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.',
      Resources: [{ id: 1, name: '', s3link: '' }, { id: 3, name: '', s3link: '' },
      ],
      sector: { id: 2, name: 'English' }

    },
    {
      id: 3,
      courseName: 'Logical Courses',
      description:
        'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
      courseLink: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.',
      Resources: [{ id: 1, name: '', s3link: '' }, { id: 2, name: '', s3link: '' }, { id: 3, name: '', s3link: '' }],
      sector: { id: 2, name: 'Logical' }
    },]

  JobOpportunityListData: any[] = [
    {
      id: 1,
      title: 'SoftWare Engineer',
      description:
        'Software Engineer responsibilities include: · Executing full lifecycle software development · Programming well-designed, testable, efficient code · Producing',
      sector: [{ id: 1, sector: 'Engineering' },],
      linkToApply: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.',
      RolesandResponsibility: 'Designing and maintaining software systems.',
      BasicRequirements: 'bachelor degree. Graduate college with an undergraduate degree in computer science',
      Address: 'Nilampathinjamugal-Rajagiri Valley Road Near Infopark,Nilampathinjamugal Kakkanad, Kochi, Kerala 682039.'
    },

    {
      id: 2,
      title: 'Medical Representative',
      description:
        'Medical Representative responsibilities include: · Executing full lifecycle software development · Programming well-designed, testable, efficient code · Producing.',
      sector: [{ id: 5, sector: 'Pharma' },],
      linkToApply: 'īhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.',
      RolesandResponsibility: 'Hospital and mainteinence.',
      BasicRequirements: 'bachelor degree. Graduate college with an undergraduate degree in medical',
      Address: 'Nilampathinjamugal-Rajagiri Valley Road Near Infopark,Nilampathinjamugal Kakkanad, Kochi, Kerala 682039.'
    },
  ]

  HelpLineListData: any[] = [{
    id: 1,
    title: 'Police',
    description: 'The police are a constituted body of persons empowered by a state, with the aim to enforce the law, to ensure the safety, health, and possessions', ContactNumber: [{ id: 1, number: '100' }]
  },
  {
    id: 2,
    title: 'Ambulance',
    description: 'The police are a constituted body of persons empowered by a state, with the aim to enforce the law, to ensure the safety, health, and possessions', ContactNumber: [{ id: 2, number: '108' }]
  }]

  SetDataListRequestPopup(){
       console.log("as esxpected Arockia") 
    this.pageloadder=true
      setTimeout(()=>{  
        this.setListDataRequest()
      },0)
  
  }
  setListDataRequest() {
    console.log("coming here...", this.Mainservice.header, this.Mainservice.sidebardata);
    console.log( this.pageloadder,"must false")

    this.pageloadder=true
    let headerVal=''
    if (this.Mainservice.header == 'chatbot') {
      //makeHttpRequest
      if (this.Mainservice.sidebardata.values == 'Training') {
        headerVal='Trainings'
        this.setListData = this.TrainingListData;
        this.Mainservice.setListData = this.TrainingListData
      }
      if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
        headerVal='Learnings'
        this.setListData = this.CourselListData;
        this.Mainservice.setListData = this.CourselListData


      }
      if (this.Mainservice.sidebardata.values == 'Job Offers') {
        headerVal='Jobs'
        this.setListData = this.JobOpportunityListData;
        this.Mainservice.setListData = this.JobOpportunityListData

      }
      if (this.Mainservice.sidebardata.values == 'Help Line') {
        this.setListData = this.HelpLineListData;
        this.Mainservice.setListData = this.HelpLineListData

      }

      this.cdr.markForCheck();
      this.Mainservice.pageloaderMainservice=true
      this.http.get('http://localhost:3000/getData?headers='+headerVal).toPromise()
      .then((data:any)=>{
        console.log(data,"data")
        this.Mainservice.pageloaderMainservice=false
        this.Mainservice.setListData=data
      }).catch((data)=>{
        this.Mainservice.errorPopup=true
        this.Mainservice.pageloaderMainservice=false
        console.log(  this.pageloadder,"task completed Arockia")
      });
   
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
    this.Mainservice.pageloaderMainservice=true
    let headerdata=''
    let behaviour='insertTableData'
    let formData={}
    if (this.Mainservice.sidebardata.values == 'Training') {
      headerdata='Trainings'
      
      
      if (this.editFlag) {
        behaviour='ModifyTableData'
        formData=this.trainingFrom.value
      }
      else {
        formData=this.trainingFrom.value
      }
      $("#addPopUp").modal('hide');
      console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values);
    }
    else if (this.Mainservice.sidebardata.values == 'Job Offers') {
      headerdata='Jobs'
   

      if (this.editFlag) {
        behaviour='ModifyTableData'
        formData=this.joboffersForm.value
       }
      else {
       formData=this.joboffersForm.value
      }
      $("#addPopUp").modal('hide');
       console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values)
    }
    else if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
      headerdata='Learnings'
      if (this.editFlag) {
        behaviour='ModifyTableData'
        formData=this.learnAndUpskill.value
      }
      else {
        formData=this.learnAndUpskill.value
        this.CourselListData.push(this.learnAndUpskill.value);
       }

      $("#addPopUp").modal('hide');
      console.log(this.Mainservice.setListData, 'uuu', this.Mainservice.sidebardata.values)
    }
    else if (this.Mainservice.sidebardata.values == 'Help Line') {

      if (this.editFlag) {
        let index = this.HelpLineListData.findIndex((data: any) => data['id'] === this.editDetails['data']['id']);
        if (index > -1) {
          this.HelpLineListData[index] = this.helpLine.value;
        }
      }
      else {
        this.HelpLineListData.push(this.helpLine.value);
        this.HelpLineListData[this.HelpLineListData.length - 1]['id'] = this.HelpLineListData.length;

      }

   

      $("#addPopUp").modal('hide');
      this.Mainservice.setListData = this.HelpLineListData;
    }

    let bodyparams={}
    if(behaviour=='insertTableData'){
      bodyparams={TableName:headerdata,TableData:formData}
    }else{
      bodyparams={TableName:headerdata,TableData:formData,id:this.editDetails.data.uuid}
    }
    this.http.post('http://localhost:3000/'+behaviour,bodyparams).toPromise()
    .then((data:any)=>{
      console.log(data,"data")
      this.Mainservice.pageloaderMainservice=false
      // this.Mainservice.setListData=data
      if(behaviour=='insertTableData'){
        console.log(this.Mainservice.setListData,"this.Mainservice.setListData")
      this.Mainservice.setListData.push(data)
      }else{
        let index = this.Mainservice.setListData.findIndex((data: any) => data['uuid'] === this.editDetails['data']['uuid']);
       console.log(index)
        if (index > -1) {
          this.Mainservice.setListData[index] = formData;
        }
      }
    }).catch((data)=>{
      this.Mainservice.errorPopup=true
      this.Mainservice.pageloaderMainservice=false
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
      console.log(this.trainingFrom.value,"training form value")
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
        title: event['data']['title'],
        description: event['data']['description'],
        ContactNumber: event['data']['ContactNumber'],
      })
    }

    $("#exampleModalCenter").modal('show');


  }
  onDeleteData(event: any) {
    let headerdata=''
    if (event['type'] == 'Training') {
      headerdata='Trainings'
    }
    else if (event['type'] == 'Job Offers') {
      headerdata='Jobs'
    }
    else if (event['type'] == 'Learnings - upskill') {
      headerdata='Learnings'
    }
    else if (event['type'] == 'Help Line') {
      headerdata='helpline'
    }
    this.Mainservice.pageloaderMainservice=true
    this.http.post('http://localhost:3000/deleteTableData',{TableName:headerdata,id:event.index}).toPromise()
    .then((data:any)=>{
      if (event['type'] == 'Training') {
        this.Mainservice.setListData =  this.Mainservice.setListData.filter((data:any) => {
  
           return data.uuid != event.index
        });
        console.log( this.Mainservice.setListData,"this.TrainingListData")
        this.Mainservice.setListData=  this.Mainservice.setListData;
  
      }
      else if (event['type'] == 'Job Offers') {
         this.Mainservice.setListData =  this.Mainservice.setListData.filter((data:any) => {
          return data.uuid != event.index
        });

      }
      else if (event['type'] == 'Learnings - upskill') {
         this.Mainservice.setListData =  this.Mainservice.setListData.filter((data:any) => {
          return data.uuid != event.index
        });
           }
      else if (event['type'] == 'Help Line') {
  
         this.Mainservice.setListData =  this.Mainservice.setListData.filter((data:any) => {
         return data.uuid != event.index
        });
        
      }
      this.Mainservice.pageloaderMainservice=false
       }).catch((data)=>{
      this.Mainservice.errorPopup=true
      this.Mainservice.pageloaderMainservice=false
    })
  

  }

  abortaddFun() {
    $("#addPopUp").modal('hide');
  }
}

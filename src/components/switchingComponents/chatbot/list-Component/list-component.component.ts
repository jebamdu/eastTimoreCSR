import { ChangeDetectorRef, Component, DoCheck, NgZone, OnInit, ViewChild } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { mainservice } from 'src/components/main.service';
declare var $: any;
@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.less'],
})
export class ListComponentComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect: any;

  public loadContent: boolean = false;
  public name = 'Cricketers';
  public muncipality_data: any = [];
  public sector_data: any = [];
  public settings = {};
  public sector_settings = {};

  public selectedItems = [];


  //
  listData: any[] = [];
  Mainservice: any;
  public setListData: any = [];
  editFlag: boolean = false;
  editDetails: any = '';


  joboffersForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    linkToApply: new FormControl(''),
    Address: new FormControl('', Validators.required),
    RolesandResponsibility: new FormControl(''),
    BasicRequirements: new FormControl('', Validators.required),
    sector: new FormControl(this.sector_data, Validators.required),
    // trainingFrequency: new FormControl('',Validators.required),
  })


  trainingFrom = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    registrationLink: new FormControl(''),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    basic_requirement: new FormControl(''),
    municipality: new FormControl(this.muncipality_data, Validators.required),
    sector: new FormControl(this.sector_data, Validators.required),
    trainingFrequency: new FormControl('', Validators.required),
  })

  learnAndUpskill = new FormGroup({
    courseName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    resources: new FormControl([], Validators.required),
    courseLink: new FormControl(''),
    sector: new FormControl(this.sector_data, Validators.required),
  })

  helpLine = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ContactNumber: new FormControl([], Validators.required),
   
  })

  constructor(Mainservice: mainservice, private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    this.Mainservice = Mainservice;


  }

  ngOnChanges(SimpleChanges: any) {


  }

  ngOnInit(): void {
    this.muncipality_data = [{ id: 1, name: 'Lautem' }, { id: 2, name: "Dili" }, { id: 3, name: "Aileu" }];
    this.sector_data = [{ id: 1, name: 'Engineering' }, { id: 2, name: "Electronics" }, { id: 3, name: "Automobiles" }]


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
      sector:{ id: 2, name: 'Maths' }
    },
    {
      id: 2,
      courseName: 'Verbal Courses',
      description:
        'verbal dummy can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
      courseLink:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.',
      Resources: [{ id: 1, name: '', s3link: '' }, { id: 3, name: '', s3link: '' },
     ],
     sector:{ id: 2, name: 'English' }

    },
    {
      id: 3,
      courseName: 'Logical Courses',
      description:
        'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
      courseLink: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.',
      Resources: [{ id: 1, name: '', s3link: '' }, { id: 2, name: '', s3link: '' }, { id: 3, name: '', s3link: '' }],
      sector:{ id: 2, name: 'Logical' }
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

  setListDataRequest() {
    console.log("coming here...", this.Mainservice.header, this.Mainservice.sidebardata);

    if (this.Mainservice.header == 'chatbot') {
      //makeHttpRequest
      if (this.Mainservice.sidebardata.values == 'Training') {
        this.setListData = this.TrainingListData;
        this.Mainservice.setListData = this.TrainingListData
      }
      if (this.Mainservice.sidebardata.values == 'Learnings - upskill') {
        this.setListData = this.CourselListData;
        this.Mainservice.setListData = this.CourselListData


      }
      if (this.Mainservice.sidebardata.values == 'Job Offers') {
        this.setListData = this.JobOpportunityListData;
        this.Mainservice.setListData = this.JobOpportunityListData

      }
      if (this.Mainservice.sidebardata.values == 'Help Line') {
        this.setListData = this.HelpLineListData;
        this.Mainservice.setListData = this.HelpLineListData

      }

      this.cdr.markForCheck();

      console.log(this.Mainservice.sidebardata, 'expected');


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
    if (this.Mainservice.sidebardata.values == 'Training') {
      let muncipality = this.trainingFrom.value.municipality.map((data: any) => {
        return data.name;
      })
      let sector = this.trainingFrom.value.sector.map((data: any) => {
        return data.name;
      })
      if (this.editFlag) {
        let index = this.TrainingListData.findIndex((data: any) => data['id'] === this.editDetails['data']['id']);
        if (index > -1) {
          this.TrainingListData[index] = this.trainingFrom.value;
        }
      }
      else {
        this.TrainingListData.push(this.trainingFrom.value);
        this.TrainingListData[this.TrainingListData.length - 1]['municipality'] = muncipality;
        this.TrainingListData[this.TrainingListData.length - 1]['sector'] = sector;

      }
      $("#addPopUp").modal('hide');
      this.Mainservice.setListData = this.TrainingListData;
      console.log(this.Mainservice.setListData, 'uuu',this.Mainservice.sidebardata.values);
    }
    else if (this.Mainservice.sidebardata.values == 'Job Offers') {

      let sector = this.joboffersForm.value.sector.map((data: any) => {
        return data.name;
      })

      if (this.editFlag) {
        let index = this.JobOpportunityListData.findIndex((data: any) => data['id'] === this.editDetails['data']['id']);
        if (index > -1) {
          this.JobOpportunityListData[index] = this.joboffersForm.value;
        }
      }
      else {
        this.JobOpportunityListData.push(this.joboffersForm.value);
        this.JobOpportunityListData[this.JobOpportunityListData.length - 1]['sector'] = sector;
        this.JobOpportunityListData[this.JobOpportunityListData.length - 1]['id'] = this.JobOpportunityListData.length;

      }
      $("#addPopUp").modal('hide');
      this.Mainservice.setListData = this.JobOpportunityListData;
      console.log(this.Mainservice.setListData, 'uuu',this.Mainservice.sidebardata.values)
    }
    else if(this.Mainservice.sidebardata.values == 'Learnings - upskill'){
      let sector = this.learnAndUpskill.value.sector.map((data: any) => {
        return data.name;
      })
      if (this.editFlag) {
        let index = this.CourselListData.findIndex((data: any) => data['id'] === this.editDetails['data']['id']);
        if (index > -1) {
          this.CourselListData[index] = this.learnAndUpskill.value;
        }
      }
      else {
        this.CourselListData.push(this.learnAndUpskill.value);
        this.CourselListData[this.CourselListData.length - 1]['sector'] = sector;
        this.CourselListData[this.CourselListData.length - 1]['id'] = this.CourselListData.length;

      }

      $("#addPopUp").modal('hide');
      this.Mainservice.setListData = this.CourselListData;
      console.log(this.Mainservice.setListData, 'uuu',this.Mainservice.sidebardata.values)
    }
    else if(this.Mainservice.sidebardata.values == 'Help Line'){
   
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
  

  }
  openModal() {
    this.editFlag = false;
    $("#addPopUp").modal('show');
  }
  show() {
    // console.log(this.trainingFrom.value.trainingFrequency);

  }
  onEditData(event: any) {
    this.editFlag = true;
    this.editDetails = event;
    console.log(this.editDetails)
    if (event['type'] == 'Training') {
      this.trainingFrom.patchValue({
        name: event['data']['name'],
        description: event['data']['description'],
        registrationLink: event['data']['registrationLink'],
        startDate: event['data']['startDate'],
        endDate: event['data']['namendDatee'],
        address: event['data']['address'],
        basic_requirement: event['data']['basic_requirement'],
        municipality: event['data']['municipality'],
        sector: event['data']['sector'],
      })
    }
    else if (event['type'] == 'Job Offers') {
      this.joboffersForm.patchValue({
        title: event['data']['title'],
        description: event['data']['description'],
        linkToApply: event['data']['linkToApply'],
        RolesandResponsibility: event['data']['RolesandResponsibility'],
        BasicRequirements: event['data']['BasicRequirements'],
        Address: event['data']['Address'],
        sector: event['data']['sector'],
      })
    }

    else if (event['type'] == 'Learnings - upskill') {

      this.learnAndUpskill.patchValue({
        courseName:event['data']['courseName'],
    description:event['data']['description'],
    resources:event['data']['resources'],
    courseLink:event['data']['courseLink'],
    sector:event['data']['sector'] ,
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
    if (event['type'] == 'Training') {
      this.TrainingListData.splice(event['index'], 1);
      this.Mainservice.setListData = this.TrainingListData;

    }
    else if (event['type'] == 'Job Offers') {
      this.JobOpportunityListData.splice(event['index'], 1);
      this.Mainservice.setListData = this.JobOpportunityListData;
    }
    else if (event['type'] == 'Learnings - upskill') {
      this.CourselListData.splice(event['index'], 1);
      this.Mainservice.setListData = this.CourselListData;
    }
    else if (event['type'] == 'Help Line') {
      this.HelpLineListData.splice(event['index'], 1);
      this.Mainservice.setListData = this.HelpLineListData;
    }

  }

  abortaddFun(){
    $("#addPopUp").modal('hide');
  }
}

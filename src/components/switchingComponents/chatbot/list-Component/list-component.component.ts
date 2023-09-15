import { ChangeDetectorRef, Component, DoCheck, NgZone, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainservice } from 'src/components/main.service';
declare var $: any;
@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.less'],
})
export class ListComponentComponent implements OnInit,DoCheck {
  dropdownList:any = [];
  selectedItems:any= [];
  dropdownSettings:any = {};



  //
  listData: any[] = [];
  Mainservice: any;
  public setListData: any = [];
 
  Municipality=[{id:1,name:'munxyz'},{id:2,name:"munyyyy"},{id:3,name:"munzzz"}]
sector:any[]=[{id:1,name:'secxyz'},{id:2,name:"secyyyy"},{id:3,name:"seczzz"}]

  trainingFrom = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    registrationLink: new FormControl(''),
    startDate: new FormControl('',Validators.required),
    endDate: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    municipality: new FormControl('',Validators.required),
    sector: new FormControl([],Validators.required),
    trainingFrequency: new FormControl(null,Validators.required),
  })

  constructor(Mainservice: mainservice,private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    this.Mainservice = Mainservice;
  }
  ngOnChanges(SimpleChanges : any){


  }

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    $("#exampleModalCenter").modal('show');
    this.Mainservice.sidebardata={id: 1, values: 'Training'}
    this.setListDataRequest();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
      startDate: '16.07.2022',
      endDate: ' 20.08.2022',
      address: '7/1,soosai nagar3rd street,vilangudi,Madurai-18',
      municipality: '',
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
      startDate: '16.07.2022',
      endDate: ' 20.08.2022',
      address: '7/1,soosai nagar3rd street,vilangudi,Madurai-18',
      municipality: '',
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
      startDate: '16.07.2022',
      endDate: ' 20.08.2022',
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
      name: 'Mathematical Courses',
      description:
        'Maths course dumy can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking',
      resourceLink: [{id:1,link:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link'},{id:2,link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.'}],
      Resources: [{ id: 1, name: 'Algeebra', s3link: '' }, { id: 2, name: 'Charts', s3link: '' }, { id: 3, name: 'statstics', s3link: '' }],

    },
    {
      id: 2,
      name: 'Verbal Courses',
      description:
        'verbal dummy can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
        resourceLink: [{id:1,link:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link'},{id:2,link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.'}],
        Resources: [{ id: 1, name: '', s3link: '' }, { id: 3, name: '', s3link: '' }],

    },
    {
      id: 3,
      name: 'Logical Courses',
      description:
        'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',
        resourceLink: [{id:1,link:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link'},{id:2,link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link.'}],
        Resources: [{ id: 1, name: '', s3link: '' }, { id: 2, name: '', s3link: '' }, { id: 3, name: '', s3link: '' }],

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
      Address: [{ id: 1, address: 'Nilampathinjamugal-Rajagiri Valley Road Near Infopark,Nilampathinjamugal Kakkanad, Kochi, Kerala 682039.' }]
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
      Address: [{ id: 1, address: 'Nilampathinjamugal-Rajagiri Valley Road Near Infopark,Nilampathinjamugal Kakkanad, Kochi, Kerala 682039.' }]
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
    console.log("coming here...",this.Mainservice.header,this.Mainservice.sidebardata);
    
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
      
      console.log(this.Mainservice.sidebardata,'expected');

      
    }


  }
  ngDoCheck(){

  }
}

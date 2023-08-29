import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.less']
})
export class TrainingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   TrainingListData:any[]=[{id:1,name:'Logical Thinking',description:'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',registrationLink:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link',startDate:'16.07.2022',endDate:' 20.08.2022',address:'7/1,soosai nagar3rd street,vilangudi,Madurai-18',municipality:'',sector:[{id:1,name:'computer science'},{id:2,name:'Maths'}],trainingFrequency:'once'
  },
  {id:2, name:'Design Thinking',description:'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',registrationLink:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link',startDate:'16.07.2022',endDate:' 20.08.2022',address:'7/1,soosai nagar3rd street,vilangudi,Madurai-18',municipality:'',sector:[{id:1,name:'computer science'},{id:2,name:'Maths'}],trainingFrequency:'once'
  },
  {id:3,name:'ComputerTrainings',description:'Logical thinking can also be defined as the act of analysing a situation and coming up with a sensible solution. It is similar to critical thinking. Logical thinking uses reasoning skills to objectively study any problem, which helps make a rational conclusion about how to proceed.',registrationLink:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link',startDate:'16.07.2022',endDate:' 20.08.2022',address:'7/1,soosai nagar3rd street,vilangudi,Madurai-18',municipality:'',sector:[{id:1,name:'computer science'},{id:2,name:'Maths'}],trainingFrequency:'once'
  }]
}

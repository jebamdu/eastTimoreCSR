import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  constructor() { }
  userData:any
  ngOnInit(): void {
    this.userData=[
      {id:1,name:'Arockia',PhoneNumber:'6383800823',lastActive:'22/07/23',municipality:'Dili',age:26 },
      {id:1,name:'kumar',PhoneNumber:'9876567897',lastActive:'19/07/23',municipality:'Ainaro',age:22 },
      {id:1,name:'Ramesh',PhoneNumber:'0987678907',lastActive:'16/07/23',municipality:'Bobonaro',age:20 },
      {id:1,name:'Siva kumar',PhoneNumber:'5678987654',lastActive:'22/07/23',municipality:'Dili',age:20 },
      {id:1,name:'ramaswamy',PhoneNumber:'4567876543',lastActive:'21/07/23',municipality:'Ainaro',age:19 },
      {id:1,name:'Sarath',PhoneNumber:'98765778899',lastActive:'20/07/23',municipality:'DilAinaroi',age:23 },
      {id:1,name:'Vetri',PhoneNumber:'9844445567',lastActive:'16/07/23',municipality:'Ainaro',age:18 }
    ]
  }

}

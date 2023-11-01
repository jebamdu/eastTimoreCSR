import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient) { }
  userData:any
  userDataDisplay:any
  errorPopup:boolean=false
  pageloadder:boolean=false;
  search_str:string=''
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
    this.pageloadder=true
    this.http.get('http://localhost:3000/getData?headers=Users').toPromise().then((data:any)=>{
      data.forEach((element:any) => {
        let dateOfBirth = new Date(element.yob.toString())
        element.yob=this.yobFun(dateOfBirth)
      });  
    this.userData=data
      this.userDataDisplay=data
    console.log(data,"data")
    this.pageloadder=false
    }).catch((data)=>{
      this.errorPopup=true
      console.log(data,"arockia error")
      this.pageloadder=false    
     
    });
  }
  transormDate(dateString: string): Date|null{
 // Assuming dateString is in the at YY/MM/DD
 const [year, month, day] = dateString.split('/').map(part => parseInt(part, 10) + 2000); // Add 2000 to the year
 return new Date(year, month - 1, day); // Months are zero-based in JavaScript

  }
  errorPopupClose(){
    this.errorPopup=false
  }

  yobFun(dateOfBirth:any){
   const today = new Date();
      const birthDate = new Date(dateOfBirth);
  
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age
   
  }

  searchstring(event:any){
    
    event=event.toLowerCase()
    if(event!=''){
      let tempArray: any[]=[]
      this.userData.forEach((elementData:any) => {
       let index=false
       Object.values(elementData).some((item:any)=>{
        if(item){
          if(item.toString().toLowerCase().indexOf(event)>-1){
            return(index=true)
          }
          else{return }
        }else{
          return 
        }
       })
       if(index){
        tempArray.push(elementData)
       }
      });
      this.userDataDisplay=[...tempArray]
    }else{
      this.userDataDisplay=[...this.userData]
    }


  }

}

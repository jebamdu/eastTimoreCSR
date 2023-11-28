import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { mainservice } from 'src/components/main.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient,public Mainservice:mainservice) { }
  userData:any
  userDataDisplay:any
  errorPopup:boolean=false
  pageloadder:boolean=false;
  search_str:string=''
  ngOnInit(): void {
    this.Mainservice.setSortFilerData={active:'',status:false,filterData: []}
    this.userData=[
    ]
    this.pageloadder=true
    this.http.get(`${environment.baseURL}/getData?headers=Users`).toPromise().then((data:any)=>{
      data.forEach((element:any) => {
        let dateOfBirth = new Date(element.yob?.toString())
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

  onSortData(sort:any) {
    let data =[...this.userDataDisplay];
    const index = data.findIndex((x:any) => x['level'] == 1);
    // if (sort && sort.direction !== '') {
      
    if (sort ) {
      if (index > -1) {
        data.splice(index, 1);
      }
      this.Mainservice.setSortFilerData.active=sort
      this.Mainservice.setSortFilerData.status=true
      data = this.userDataDisplay.sort((a: any, b: any) => {
        const isAsc = true;
        switch (sort) {
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'yob':
            return this.compare(a.yob, b.yob, isAsc);
          case 'municipality':
            return this.compare(a.municipality, b.municipality, isAsc);
          case 'eduQualification':
            return this.compare(a.eduQualification, b.eduQualification, isAsc);
          case 'gender':
            return this.compare(a.gender, b.gender, isAsc);
          default:
            return 0;
        }
      });
    
     
      this.userDataDisplay = data;
      this.userData=data;
    }

  }

  private compare(a:any, b:any, isAsc:any) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { mainservice } from '../main.service';
import { ListComponentComponent } from '../switchingComponents/chatbot/list-Component/list-component.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})

export class SidebarComponent implements OnChanges,OnInit {
  @Input() headerTab:string | undefined 
  @Output() newItemEvent = new EventEmitter<string>();
  public sidebarId:number=1
  public UsersSidebarData=[{id:1,values:'Reports',img:'',navigateValue:'user/reports'},{id:2,values:'User View',img:'',navigateValue:'user/userlist'}]
  public ChatBotSideBarData=[{id:1,values:'Training',img:'',navigateValue:'chatbot/traininglist'},{id:2,values:'Job Offers',img:'',navigateValue:''},{id:3,values:'Learnings - upskill',img:'',navigateValue:''},{id:4,values:'Help Line',img:'',navigateValue:''},{id:5,values:'Welcome Message',img:'',navigateValue:''},{id:6,values:'Template Message',img:'',navigateValue:''}]
  public FlowBuilderSideBarData=[{id:1,values:'Training',img:'',navigateValue:'flowbuilder/traininglist'},{id:2,values:'Job Offers',img:'',navigateValue:''},{id:3,values:'Learnings - upskill',img:'',navigateValue:''}]
  public sidebarRawData:any
  private mainserviceTab
  private listService


  constructor(public router:Router,Mainservice:mainservice,listService:ListComponentComponent) {
    this.listService=listService
    this.mainserviceTab=Mainservice
   }
  ngOnChanges(changes: SimpleChanges) {
  
    
    this.sidebarId=1
   const headerTab = changes['headerTab'];
   console.log(headerTab.currentValue,"current value");
    if(headerTab.currentValue=='user'){
this.sidebarRawData=this.UsersSidebarData
this.router.navigate(['/MainComponent/user/reports'])
    }
    else if(headerTab.currentValue=='chatbot'){
      console.log("routing yo trainiglist");
      
      this.sidebarRawData=this.ChatBotSideBarData
      this.router.navigate(['MainComponent/chatbot/traininglist'])
    }
    else if(headerTab.currentValue=='flowbuiulder'){
      this.sidebarRawData=this.FlowBuilderSideBarData
      this.router.navigate(['MainComponent/flowbuilder/traininglist'])
    }
  }

  ngOnInit(): void {
    
  }

  sidebarActivate(id:number){
    this.sidebarId=id
  }

  sideBarBtnColor(id:number){

    return{
      'sideBarBtnActivate col-12 px-4 py-3':this.sidebarId==id,
      'col-12 px-4 d-flex align-items-center py-3':this.sidebarId!=id

    }
  }

  fundisabled(id:any){
    if(id==5||id==6){
      return 'isDivDisabled'
    }
    return''
  }
  navigateDataComponents(id:any,values:string){
  const header=this.mainserviceTab.header
  if(header=='chatbot'){
    this.mainserviceTab.sidebardata={id:id,values:values}
   
          this.listService.SetDataListRequestPopup()
       }
       else if(header=='user'){
        console.log(values,"values")
        if(values=='User View'){
          this.router.navigate(['/MainComponent/user/userlist'])
        }
        else if(values=='Reports'){
          this.router.navigate(['/MainComponent/user/reports'])
        }
    
       }

       this.sidebarActivate(id) 
       
}

}

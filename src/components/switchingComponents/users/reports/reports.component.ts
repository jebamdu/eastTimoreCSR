import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit,OnDestroy {

  constructor(private http: HttpClient) { }
  public chart: any;
  errorPopup:boolean=false
  pageloadder:boolean=false;
  Showerror:boolean=false;

  bagroundcolor= ['yellow', 'aqua', 'pink', 'lightgreen', 'lightblue', 'gold','#cc65fe','#36a2eb']
  datasetValue:any={}
  
  ngOnInit(): void {
       this.pageloadder=true
    this.http.post('http://localhost:3000/Reports',{}).toPromise().then((data:any)=>{
    console.log(data,"data")
    this.pageloadder=false
    this.errorPopup=false
    
    let labels: any[]=[]
    let count: any[]=[]
    let bgroundcolor: string[]=[]
    if (this.chart) {
      console.log(  this.chart,"charts")
      this.chart.destroy();
    }
    data.forEach((element:any,index:number) => {
      labels.push(element.municipality)
      count.push(element.totalCount)
      bgroundcolor.push(this.bagroundcolor[index+1])
    
    });

    this.datasetValue={
      labels:labels,
      datasets: [{
               label: "No of users have registered by district",
               data: count,
               backgroundColor:bgroundcolor,
               
               borderWidth: 2,
            }],
    }
    this.createChart();
    }).catch((data)=>{
      this.errorPopup=true
      this.Showerror=true
      console.log(data,"arockia error")
      this.pageloadder=false    
     
    });
   
  }

  errorPopupClose(){
    this.errorPopup=false
  }
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: this.datasetValue,
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  
  ngOnDestroy(){
    this.Showerror=false
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit,OnDestroy {
  public today:any=''
  constructor(private http: HttpClient) { 
    const datePipe = new DatePipe('en-US');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd'); // Format the date as needed
  
  }
  public chart: any;
  errorPopup:boolean=false
  pageloadder:boolean=false;
  Showerror:boolean=false;
  reporsData=[]
  seleteddate=new  FormGroup({
    startDate:new FormControl('2023-10-01',Validators.required),
    endDate:new FormControl(this.today,Validators.required)
  })

  bagroundcolor= ['yellow', 'aqua', 'pink', 'lightgreen', 'lightblue', 'gold','#cc65fe','#36a2eb']
  datasetValue:any={}
  chartOptions:any
  ngOnInit(): void {
    this.seleteddate.patchValue({
      startDate:'2023-10-01',
      endDate:this.today
    })
    console.log(this.today,"todays date")
    this.dateWiseFilter()
   
  }

  errorPopupClose(){
    this.errorPopup=false
  }
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: this.datasetValue,
      options: this.chartOptions
      
    });
  }
  
  ngOnDestroy(){
    this.Showerror=false
  }


  dateWiseFilter(){
    this.pageloadder=true
    this.http.post('http://localhost:3000/Reports',this.seleteddate.value).toPromise().then((data:any)=>{
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
    this.reporsData=[]
    if(data.length>0){
      this.reporsData=data
      data.forEach((element:any,index:number) => {
        labels.push(element.municipality)
        count.push(element.totalCount)
        bgroundcolor.push(this.bagroundcolor[index+1])
      
      });
      this.chartOptions = {
        plugins: {
          legend: {
            position: 'right',
            align: 'ceter', 
            labels: {
              padding: 20, // Adjust the padding between legend items
             
            },
          }
        }, aspectRatio:2.5,
      };
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
    }
  
    console.log(this.reporsData,"reportsss")
 
    }).catch((data)=>{
      this.errorPopup=true
      this.Showerror=true
      console.log(data,"arockia error")
      this.pageloadder=false    
     
    });
  }


  
}

import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit {

  constructor() { }
  public chart: any;
  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        labels: ["Dili", "Baucau", "Liquica", "Ermera", "Lautem", "Bobonaro",'Ainaro','Viqueque'],
        datasets: [{
           label: "No of users have registered by district",
           data: [20, 40, 30, 35, 30, 20,50,25],
           backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'lightblue', 'gold','#cc65fe','#36a2eb'],
           
           borderWidth: 2,
        }],
     },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  
}

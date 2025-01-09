import { Component, OnInit,Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-piecharts',
  templateUrl: './piecharts.component.html',
  styleUrls: ['./piecharts.component.scss']
})
export class PiechartsComponent implements OnInit {

    
    @Input() title :any = "";
    @Input() data: any = [];
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options;
    constructor() {}
  
    ngOnInit(): void 
    {
    
      this.chartOptions = {
       chart: {
           plotBackgroundColor: null,
           plotBorderWidth: null,
           plotShadow: false,
           type: 'pie'
       },
       title: this.title,
       tooltip: {
           pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
       },
       accessibility: {
           point: {
               valueSuffix: '%'
           }
       },
       plotOptions: {
           pie: {
               allowPointSelect: true,
               cursor: 'pointer',
               dataLabels: {
                   enabled: true,
                   format: '<b>{point.name}</b>: {point.percentage:.1f} %'
               }
           }
       },
       
       series: [
           {
             type: 'pie', // Specify the chart type again here
             name: 'Data',
             data: this.data,
           },
         ],
      
       };
    //});
    }
   

}























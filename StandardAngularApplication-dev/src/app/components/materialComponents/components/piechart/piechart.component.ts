import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

    pieSeriesData: any = [];
    pieTitle: any = "";
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options;
    constructor(private service: ApiService) {}
  
    ngOnInit(): void 
    {
     //this.pieChartData()
     this.service.getApi(environment.pieChart).subscribe((i: any) => {
        if (Array.isArray(i) && i.length > 0) {
      //console.log("this is api responce",i);
      this.pieTitle=i[0].title;
      //console.log("this is title",this.pieTitle);
      this.pieSeriesData=i[0].data;
      //console.log("this is seriesData",this.pieSeriesData);
      this.chartOptions = {
       chart: {
           plotBackgroundColor: null,
           plotBorderWidth: null,
           plotShadow: false,
           type: 'pie'
       },
       title: this.pieTitle,
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
             data: this.pieSeriesData,
           },
         ],
      
       };
    }}
    );
    }
   
  
}











import {Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
   Highcharts = Highcharts;
   chartOptions : {};
  barTitle: any = "";
  barCategories: any[] = [];
  barSeriesData: any[] = [];
   
   

   constructor(private service: ApiService) {}
 
   ngOnInit(): void {
    
    this.service.getApi(environment.barChart).subscribe((i: any) => {
      console.log("this is api responce",i);
      this.barTitle=i[0].title;
      console.log("this is title",this.barTitle);
      this.barCategories=i[0].categories;
      console.log("this is categories",this.barCategories);
      this.barSeriesData=i[0].datas;
      console.log("this is seriesData",this.barSeriesData);
      this.chartOptions= {
        chart: {
          type: 'column'
        },
        title: {
          text: this.barTitle
        },
        xAxis: {
          categories:this.barCategories
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Assists'
          }
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
          column: {
            stacking: 'percent'
          }
        },
        series: [
            {
              type: 'bar', // Specify the chart type again here
              name: 'Data',
              data: this.barSeriesData,
            },
          ],
          
      };
     
    }
   
    
    );
   }
   
  
  

}







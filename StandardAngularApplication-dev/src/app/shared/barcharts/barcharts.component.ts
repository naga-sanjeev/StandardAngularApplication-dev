import { Component, OnInit,Input } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-barcharts',
  templateUrl: './barcharts.component.html',
  styleUrls: ['./barcharts.component.scss']
})
export class BarchartsComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions : {};
  @Input() title: any = "";
  @Input() Categories: any[] = [];
  @Input() SeriesData: any []= [];
  
  

   constructor() {}
 
    ngOnInit(): void {
      this.chartOptions= {
        chart: {
          type: 'column'
        },
        title: {
          text: this.title
        },
        xAxis: {
          categories:this.Categories
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
              data: this.SeriesData,
            },
          ],
          
      };
      

    }
  

}
















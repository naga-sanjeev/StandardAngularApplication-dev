// import { Component, OnInit } from '@angular/core';
// import * as Highcharts from 'highcharts';
// @Component({
//   selector: 'app-tabs',
//   templateUrl: './tabs.component.html',
//   styleUrls: ['./tabs.component.scss']
// })
// export class TabsComponent implements OnInit {

//   //constructor() { }

//   title = 'charts';

//   ngOnInit(): void { 
//     // @ts-ignore
//     Highcharts.chart('container', {
//       chart: {
//           type: 'column'
//       },
//       title: {
//           text: 'UEFA CL most assists by season'
//       },
//       xAxis: {
//           categories: ['2021/22', '2020/21', '2019/20', '2018/19', '2017/18']
//       },
//       yAxis: {
//           min: 0,
//           title: {
//               text: 'Assists'
//           }
//       },
//       tooltip: {
//           pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
//           shared: true
//       },
//       plotOptions: {
//           column: {
//               stacking: 'percent'
//           }
//       },
//       series: [{
        
//           name: 'Kevin De Bruyne',
//           data: [4, 4, 2, 4, 4]
//       }, {
//           name: 'Joshua Kimmich',
//           data: [0, 4, 3, 2, 3]
//       }, {
//           name: 'Sadio Mané',
//           data: [1, 2, 2, 1, 2]
//       }]
//   });
  
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {


  tabsData: any[] = [];
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    
 this.service.getApi(environment.tabData).subscribe((i: any) => {
        
        this.tabsData=i;
        console.log("this is apis responce",this.tabsData);
        
      });


      
  }
  
}



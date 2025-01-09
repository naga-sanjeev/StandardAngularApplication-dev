import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
    
  cardTitle: any = "";
  cardSubtitle :any = "";
  cardContent :any = "";
    

    constructor(private service: ApiService) {}

  ngOnInit(): void {

    this.service.getApi(environment.cardData).subscribe((i: any) => {
        console.log("this is api responce",i); 
        this.cardTitle=i[0].title;
        console.log("this is title",this.cardTitle);
        this.cardSubtitle=i[0].subtitle;
        console.log("this is categories",this.cardSubtitle);
        this.cardContent=i[0].content;
        console.log("this is seriesData",this.cardContent);
        
      });
  }

}





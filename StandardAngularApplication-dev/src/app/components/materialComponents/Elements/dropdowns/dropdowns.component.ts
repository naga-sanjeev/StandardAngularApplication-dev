import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {
  selectedOption: any;
  dropdownPlaceholder :string;
  dropdownOptions:any[] [];

constructor(private service: ApiService) {}

ngOnInit(): void {

  this.service.getApi(environment.dropdownData).subscribe((i: any) => {
      //console.log("this is api responce",i); 
      this.dropdownPlaceholder=i[0].dropdownPlaceholder;
      //console.log("this is place holder",this.dropdownPlaceholder);
      
      this.dropdownOptions=i[0].dropdownOptions;
      //console.log("this is options",this.dropdownOptions);
      
    });
}

}

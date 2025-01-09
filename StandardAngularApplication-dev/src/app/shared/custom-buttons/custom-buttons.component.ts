import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-custom-buttons',
  templateUrl: './custom-buttons.component.html',
  styleUrls: ['./custom-buttons.component.scss']
})
export class CustomButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() buttonColor: string = 'primary'; // Default to 'primary' color
  @Input() buttonText: string = 'Button Text'; // Default button text
}




import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() placeholder: string;
  @Input() options: { label: string; value: any }[];
  @Input() selectedValue: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}

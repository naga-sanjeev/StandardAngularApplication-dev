import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  //@Input() label: string;
  @Input() content:  any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

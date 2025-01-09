import { Component, OnInit } from '@angular/core';
//import { HighlightDirective } from 'app/highlight.directive';
@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  hidden = false;
  longText="Button with a badge on the left.This for testing the custom pipes in my application";
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}

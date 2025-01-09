import { Component, Inject, Input,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  @Input() modalTitle: string = 'Dialog with elements'; // Default title for the modal
  @Input() modalContent: string = 'This dialog showcases the title, close, content and actions elements'; // Default content for the modal

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  
}

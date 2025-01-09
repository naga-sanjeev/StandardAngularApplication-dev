import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalsComponent } from 'app/shared/modals/modals.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalsComponent, {
      data: {
        modalTitle: 'Custom Modal Title', // Customize the title if needed
        modalContent: 'Custom Modal Content', // Customize the content if needed
      },
    });
  }

  ngOnInit(): void {
  }

}

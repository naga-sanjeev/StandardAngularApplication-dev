import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
import { ModalsComponent } from 'app/shared/modals/modals.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockMatDialog: MatDialog;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog when calling openDialog()', () => {
    component.openDialog();
    // Ensure that the open method of MatDialog is called with the correct data
    expect(mockMatDialog.open).toHaveBeenCalledWith(
      ModalsComponent,
      {
        data: {
          modalTitle: 'Custom Modal Title',
          modalContent: 'Custom Modal Content',
        },
      }
    );
  });
});

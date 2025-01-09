
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableListComponent } from './table-list.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'app/shared/services/api.service';
import { of, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { event } from 'jquery';
import { UtilService } from 'app/shared/services/util.service';
import { PageEvent } from '@angular/material/paginator';
describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let apiService: ApiService;
  let utilService: UtilService;
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open','close','success']);
    TestBed.configureTestingModule({
      declarations: [TableListComponent],
      imports: [HttpClientModule,MatSnackBarModule,MatDialogModule,BrowserAnimationsModule], // Add HttpClientModule to imports
      providers:[MatSnackBar,
        TableListComponent,
        ApiService,
        UtilService,
        { provide: MatSnackBar, useValue: spy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    apiService = TestBed.inject(ApiService);
    utilService = TestBed.inject(UtilService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open dialog when openDialog is called', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open'); // Spy on the MatDialog service
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled(); // Check if the open method of MatDialog is called
});

it('should call openSnackBar with the correct parameters for success message', () => {
  const service = TestBed.inject(TableListComponent);
  const message = 'This is a success message';
  service.success(message);
  // Expectations
  expect(snackBarSpy.open).toHaveBeenCalledWith(message, '', {
    duration: 2000,
    panelClass: [],
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
});
it('should call openSnackBar for error message', () => {
  const service = TestBed.inject(TableListComponent);
  const message = 'This is a error message';
  service.error(message);
  // Expectations
  expect(snackBarSpy.open).toHaveBeenCalledWith(message, '', {
    duration: 2000,
    panelClass: [],
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
});
it('ngOnInit method have to call', () => {
  spyOn(component, 'ngOnInit'); // Add a spy for your data retrieval function
  component.ngOnInit();
  expect(component.ngOnInit).toHaveBeenCalled();
});
it('getTableData method have to call', () => {
  spyOn(component, 'getTableData'); // Add a spy for your data retrieval function
  component.getTableData(); // Trigger getTableData
  expect(component.getTableData).toHaveBeenCalled();// Check if the getTableData method was called
});
it('onDeleteItem method have to call', () => {
  spyOn(component, 'onDeleteItem'); // Add a spy for your data retrieval function
  component.onDeleteItem(1);
  expect(component.onDeleteItem).toHaveBeenCalled();
});
it('ngOnDestroy method have to call', () => {
  spyOn(component, 'ngOnDestroy'); // Add a spy for your data retrieval function
  component.ngOnDestroy();
  expect(component.ngOnDestroy).toHaveBeenCalled();
});
it('openSnackBar method have to call', () => {
  spyOn(component, 'openSnackBar'); // Add a spy for your data retrieval function
  component.openSnackBar('success','onclick','test',2000);
  expect(component.openSnackBar).toHaveBeenCalled();
});

it('error method have to call', () => {
  spyOn(component, 'error'); // Add a spy for your data retrieval function
  component.error('error');
  expect(component.error).toHaveBeenCalled();
});
it('success method have to call', () => {
  spyOn(component, 'success'); // Add a spy for your data retrieval function
  component.success('success');
  expect(component.success).toHaveBeenCalled();
});
it('should delete item successfully', () => {
  const id = 123; // Mock ID
  spyOn(apiService, 'deleteApi').and.returnValue(of('Deleted')); // Simulate success response

  component.onDeleteItem(id);

  expect(apiService.deleteApi).toHaveBeenCalledWith(environment.deleteTableData, id);
  expect(component.message).toBe('Deleted Successfully');
  expect(component.toastColor).toBe('success_SnackBar');
  expect(component.serviceError).toBeFalsy(); // No error should be set
  // Add further expectations if there's more behavior to verify
});

it('should handle delete item error', () => {
 
  const id = 123; // Mock ID
  const errorResponse = { responseHead: { statusCode: 404, statusDesc: 'Not Found' } };
  spyOn(apiService, 'deleteApi').and.returnValue(throwError(errorResponse)); // Simulate error response
  spyOn(utilService, 'getIntlErrorMessage').and.returnValue('Error message');

  component.onDeleteItem(id);

  expect(apiService.deleteApi).toHaveBeenCalledWith(environment.deleteTableData, id);
  expect(component.message).toBeFalsy(); // No success message on error
  expect(component.toastColor).toBeFalsy(); // No success color on error
  expect(component.serviceError).toBe('Error message');
  // Add further expectations if there's more behavior to verify
});
it('should update currentPage and totalRows on page change', () => {
    // Create a sample PageEvent
    const pageEvent: PageEvent = {
      pageIndex: 2, // Change this value to simulate different page indices
      pageSize: 20, // Change this value to simulate different page sizes
      length: 100, // You can set any appropriate value for your testing
    };

    // Trigger the pageChanged method with the sample PageEvent
    component.pageChanged(pageEvent);

    // Assert that the properties have been updated correctly
    expect(component.currentPage).toEqual(pageEvent.pageIndex);
    expect(component.totalRows).toEqual(pageEvent.pageSize);
  });

  it('should filter data in source', () => {
    const inputElement = document.createElement('input');
    const event = new Event('input');

    // Simulate user input value
    (inputElement as HTMLInputElement).value = 'ExampleFilter';
    spyOnProperty(event, 'target', 'get').and.returnValue(inputElement);

    component.applyFilter(event);

    // Expect source filter to be set to lowercase 'examplefilter'
    expect(component.source.filter).toBe('examplefilter');
  });

  
  it('should reset totalRows and pageSize', () => {
    const inputElement = document.createElement('input');
    inputElement.value = 'ExampleFilter'; // Set an initial value to simulate user input
  
    const event = new Event('input');
    spyOnProperty(event, 'target').and.returnValue(inputElement); // Mock event.target
  
    component.applyFilter(event);
  
    // Expectations related to totalRows and pageSize reset
    expect(component.totalRows).toBe(0);
    expect(component.pageSize).toBe(5);
  });
  
});


import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'environments/environment';
import { ApiService } from 'app/shared/services/api.service';
import { TableColumn } from './TableColumn';
import { UtilService } from 'app/shared/services/util.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { data } from 'jquery';
import { UserRegistrationComponent } from 'app/shared/user-registration/user-registration.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

export class TableListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  source: any = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  claimsLength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  isLoading: boolean;
  tableData: any;
  serviceError: any;
  status: boolean = true
  message = ''
  reqBody: any;
  toastColor: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedOption: any;

  constructor(private service: ApiService, private util: UtilService,private readonly snackBar: MatSnackBar,public dialog: MatDialog) { }

  tableColumns: Array<TableColumn> = [
    {
      name: 'ID',
      dataKey: 'id',
      position: 'left',
      isSortable: true,
      select: true
      
    },
    {
      name: 'User Name',
      dataKey: 'userName',
      isSortable: true,
      select: true
      
    },
    {
      name: 'First Name',
      dataKey: 'firstName',
      isSortable: true,
      select: false
      
    },
    {
      name: 'Last Name',
      dataKey: 'lastName',
      isSortable: true,
      select: false
      
    },
    {
      name: 'Phone Number',
      dataKey: 'phoneNumber',
      isSortable: true,
      select: true
      
    },
    {
      name: 'Alternate Number',
      dataKey: 'alternativeNumber',
      isSortable: true,
      select: false
      
    },
    {
      name: 'Email',
      dataKey: 'email',
      isSortable: true,
      select: true
      
    },
    {
      name: 'Age',
      dataKey: 'age',
      isSortable: true,
      select: false
      
    },
    {
      name: 'actions',
      dataKey: '',
      isSortable: true,
      select: true
    },
    
    
  ];
  dropdownOptions: Array<TableColumn> = [];
 
  ngOnInit() {
    this.getTableData();
  }

  getTableData(){
    this.subscription = this.service.getApi(environment.listOfUsers).subscribe((data: any) => {
      console.log("This is table data",data.respones);
      this.tableData = data.respones;
    },
      (err: any) => {
        if (err.responseHead) {
          this.serviceError = this.util.getIntlErrorMessage("TABLE_LIST", err.responseHead.statusCode, err.responseHead.statusDesc);
        }
      }
    );
  }

  onDeleteItem(id: number) {
    console.log("url", environment.deleteTableData);
    console.log("id", id);
  
  this.subscription = this.service.deleteApi(environment.deleteTableData, id).subscribe(
    (data) => {
      console.log("This is delete data", data);
      this.message = 'Deleted Successfully'
        this.toastColor = 'success_SnackBar'
        this.success(this.message)
      this.getTableData(); // Refresh the table data after deletion
    },
    (err: any) => {
      if (err.responseHead) {
        this.serviceError = this.util.getIntlErrorMessage("TABLE_LIST", err.responseHead.statusCode, err.responseHead.statusDesc);
      }
    }
  );
}
openDialog(updatedItem = {}) {
  this.dialog.open(UserRegistrationComponent,{data:  updatedItem});
  console.log("this is updated data fromm table",updatedItem);
}

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.totalRows = event.pageSize;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.source.filter = filterValue.trim().toLowerCase();
    if (this.source.paginator) {
      this.source.paginator.firstPage();
    }
    this.totalRows = 0;
    this.pageSize = 5;
  }

  // ngOnDestroy(): void {
  //   // Unsubscribe when the component is destroyed
  //   this.subscription.unsubscribe();
  //   throw new Error('Method not implemented.');
  // }
  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}

  openSnackBar(message: string, action: string, className = '', duration = 2000) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  error(message: string) {
    console.log(message);
    this.openSnackBar(message, '', 'error-snackbar');
  }

  success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }
 
}

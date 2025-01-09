import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Actions, TableColumn } from 'app/table-list/TableColumn';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import { indexOf } from "lodash";
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  checked = true;
  public selectedColumn = "";

  public defaultNoOfCols = 2;
  public selectedColumns: TableColumn[] = [];

  public displayedColumns: string[];
  public tableDataSource = new MatTableDataSource([]);
  public lastColIndex = 0;
  private originalTableData: Array<any>;
  public searchedString: string = '';
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(null),
  });
 
  @Input() placeholder: string;
  @Input() options: { label: string; value: any }[];
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  @Input() tableColumns: TableColumn[] = [];
  @Input() dropdownOptions: TableColumn[] = [];
  @Input() tableActions: Array<Actions> = [];
  @Input() tableTitle: string;
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }
  @Input() hideTableTitle: boolean = false;
  @Input() isPageable = true;
  @Input() isFilterable = true;
  @Input() isSortable = true;
  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() tableDateRangeEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<number>(); // Emit event with item ID to delete
  @Output() updateItem = new EventEmitter<any>(); // Emit event with updated item
  @Output() addItem = new EventEmitter<any>(); // Emit event with new item
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
 
  constructor() { }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    // this.selectedColumns = this.tableColumns.filter((e) => e.select);
    // console.log("this.selected", this.selectedColumns);

    this.tableColumns.forEach((e) => {
      e.select ? this.selectedColumns.push(e) : this.dropdownOptions.push(e)
    })
    this.selectedColumns.push({
      name: "Select Col",
      type: "dropdown"
    })
    this.displayedColumns =  this.selectedColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    // this.displayedColumns = columnNames;

    //this.lastColIndex = this.defaultColumns.length -1;
    // this.selectedColumn=this.dropdownOptions[0].dataKey;
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
    const endDate = new Date();
    this.range = new FormGroup({
      start: new FormControl(startDate),
      end: new FormControl(endDate),
    });
    this.dateRangeChange(
      moment(startDate).format('DD-MMM-YYYY'),
      moment(endDate).format('DD-MMM-YYYY')
    );
  }

  handleCheckboxChange(){
    const lasIndex = this.selectedColumns.length - 1;
    this.selectedColumns.splice(lasIndex, 1);
    
    this.dropdownOptions.forEach((e) => {
      const index = indexOf(this.selectedColumns, e);
      if(e.select && index == -1){
        this.selectedColumns.push(e);
       // this.trigger.openMenu();
      }
      else if(!e.select && index > -1){
        this.selectedColumns.splice(index, 1);
        //this.trigger.openMenu();
      }
    })

    this.selectedColumns.push({
      name: "Select Col",
      type: "dropdown"
    })
    
    this.displayedColumns =  this.selectedColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
  }

  dateRangeChange(dateRangeStart, dateRangeEnd) {
    this.tableDateRangeEmitter.emit({
      start: dateRangeStart,
      end: dateRangeEnd,
    });
  }

  // sortTable(sortParameters: Sort) {
  //   // defining name of data property, to sort by, instead of column name
  //   sortParameters.active = this.tableColumns.find(
  //     (column) => column.name === sortParameters.active
  //   ).dataKey;
  //   this.sort.emit(sortParameters);
  //   const sortedData = this.sortData(sortParameters);
  //   this.setTableDataSource(sortedData);
  // }

  // sortData(sortParameters: Sort) {
  //   const keyName = sortParameters.active;
  //   if (sortParameters.direction === 'asc') {
  //     return this.originalTableData.sort((a: any, b: any) => {
  //       if (typeof a[keyName] == 'number') return a[keyName] - b[keyName];
  //       if (typeof a[keyName] == 'string')
  //         return a[keyName].localeCompare(b[keyName]);
  //     });
  //   } else if (sortParameters.direction === 'desc') {
  //     return this.originalTableData.sort((a: any, b: any) => {
  //       if (typeof b[keyName] == 'number') return b[keyName] - a[keyName];
  //       if (typeof b[keyName] == 'string')
  //         return b[keyName].localeCompare(a[keyName]);
  //     });
  //   }
  // }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.originalTableData = data;
    console.log(this.originalTableData);   
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchedString = filterValue.trim(); // Searched String is used for highlight
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }


  onDelete(id: number) {
    this.deleteItem.emit(id); // Emit the delete event with the item ID
  }
  
  onUpdate(item: any) {
    console.log("this iteam vaule",item)
    item.isEditing = true;
    this.updateItem.emit(item); // Emit the update event with the updated item
  }
  onAddItem() {
    
    //isEditing = false;
    this.addItem.emit(); // Emit the add event with the new item
  }
  
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.tableDataSource.data.length;
  //   return numSelected === numRows;
  // }
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.tableDataSource.data);
  // }
  // checkboxLabel(row?: any): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row.position + 1
  //   }`;
  // }
 // Inside the TableComponent
getTableDataForTesting() {
  return this.originalTableData;
}

}

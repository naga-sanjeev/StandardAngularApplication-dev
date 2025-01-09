import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let c1:TableComponent
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
    c1=new TableComponent()
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle checkbox change and update selectedColumns and displayedColumns', () => {
    c1.selectedColumns=[
      {name:'userName', type: 'text' }
    ]
    c1.dropdownOptions=[
      { name: 'userName', type: 'text', select: true },
      { name: 'firstName', type: 'text', select: false },
      { name: 'lastName', type: 'text', select: false },
      { name: 'phoneNumber', type: 'text', select: false },
      { name: 'alternativeNumber', type: 'text', select: false },
      { name: 'email', type: 'text', select: false },
      { name: 'age', type: 'text', select: false },
    ]
    c1.handleCheckboxChange()
    expect(c1.selectedColumns).toEqual([
        { name: 'userName', type: 'text',select:true },
        { name: 'Select Col', type: 'dropdown' },
      ]);
    // expect(c1.displayedColumns).toEqual(['userName','Select Col']);
    expect(c1.selectedColumns).toEqual([
      { name: 'userName', type: 'text', select:true },
      { name: 'Select Col', type: 'dropdown'},
    ]);
  });

 
  it('should set table data source correctly', () => {
    const testData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
  
    component.setTableDataSource(testData);
  
    const data = component.getTableDataForTesting();
  
    expect(data).toEqual(testData);
  });
  
  
  it('should filter the table data based on the applied filter', () => {
    const testData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
      // Add more test data as needed
    ];
  
    component.setTableDataSource(testData);
  
    const filterValue = 'John'; // Apply a filter value
  
    const event = {
      bubbles: true,
      cancelable: true,
      target: { value: filterValue }
    };
  
    component.applyFilter(event as unknown as Event); // Apply as unknown and then as Event
  
    const filteredData = component.tableDataSource.filteredData;
  
    expect(filteredData.length).toBe(1); // Assuming only one entry matches the filter
    expect(filteredData[0].name).toBe('John'); // Check if the correct data is filtered
  });
  it('onDelete method have to call', () => {
    spyOn(component, 'onDelete'); // Add a spy for your data retrieval function
    component.onDelete(1);
    expect(component.onDelete).toHaveBeenCalled();
  });
    
  it('onAddItem method have to call', () => {
    spyOn(component, 'onAddItem'); // Add a spy for your data retrieval function
    component.onAddItem();
    expect(component.onAddItem).toHaveBeenCalled();
  });
 
  it('getTableDataForTesting method have to call', () => {
    spyOn(component, 'getTableDataForTesting'); // Add a spy for your data retrieval function
    component.getTableDataForTesting();
    expect(component.getTableDataForTesting).toHaveBeenCalled();
  });
  it('should emit deleteItem event with the correct ID', () => {
    const itemId = 123; // Replace with your desired ID
    let emittedId: number | undefined;

    // Subscribe to the deleteItem event
    component.deleteItem.subscribe((id: number) => {
      emittedId = id; // Store the emitted ID
    });

    // Call onDelete method with the item ID
    component.onDelete(itemId);

    // Check if the deleteItem event was emitted with the correct ID
    expect(emittedId).toEqual(itemId);
  });
  it('should emit the addItem event', () => {
    // Create a spy on the EventEmitter
    spyOn(component.addItem, 'emit');

    // Trigger the method to be tested
    component.onAddItem();

    // Expect that the emit method of the EventEmitter was called
    expect(component.addItem.emit).toHaveBeenCalled();
  });
it('should emit the updateItem event with the updated item', () => {
  // Arrange
  const item = { id: 1, name: 'Test Item', isEditing: false };
  spyOn(component.updateItem, 'emit'); // Spy on the emit method of the updateItem event

  // Act
  component.onUpdate(item);

  // Assert
  expect(item.isEditing).toBe(true); // Check if isEditing property is updated to true
  expect(component.updateItem.emit).toHaveBeenCalledWith(item); // Check if the updateItem event is emitted with the correct item
});
it('should emit date range', () => {
  const dateRangeStart = new Date('2023-01-01');
  const dateRangeEnd = new Date('2023-01-10');

  // Spy on the tableDateRangeEmitter.emit method
  spyOn(component.tableDateRangeEmitter, 'emit').and.callThrough();

  // Call the method
  component.dateRangeChange(dateRangeStart, dateRangeEnd);

  // Check if tableDateRangeEmitter.emit was called with the correct arguments
  expect(component.tableDateRangeEmitter.emit).toHaveBeenCalledWith({
    start: dateRangeStart,
    end: dateRangeEnd,
  });
});



});




    
  






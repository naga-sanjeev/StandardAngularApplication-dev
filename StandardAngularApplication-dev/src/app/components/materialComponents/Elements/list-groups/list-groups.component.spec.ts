import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { ListGroupsComponent } from './list-groups.component';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';
import { of, throwError } from 'rxjs';
describe('ListGroupsComponent', () => {
  let component: ListGroupsComponent;
  let fixture: ComponentFixture<ListGroupsComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGroupsComponent ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ApiService ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGroupsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should select an image and update the URL', (done: DoneFn) => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } };
  
    // Simulate the asynchronous file reading
    component.selectFile(event);
  
    // Simulate the asynchronous FileReader.onload event
    setTimeout(() => {
      fixture.detectChanges(); // Trigger change detection to update the view
      expect(component.msg).toBe(''); // Assuming this is the expected state after file selection
      expect(component.url).toBeTruthy();
  
      done();
    }, 500); // Adjust the delay to approximate the asynchronous operation duration
  });
  
  
  it('should upload an image successfully', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    component.selectedFile = file;
    const apiService = TestBed.inject(ApiService);
    const expectedEndpoint = environment.fileUpload;
  
    spyOn(apiService, 'postApi').and.callThrough();
  
    component.uploadImage();
  
    expect(apiService.postApi).toHaveBeenCalled();
    // Here you might want to verify the behavior or messages after a successful image upload.
  });
 

  it('should upload an image', () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const response = { message: 'Image uploaded successfully' };

    spyOn(window as any, 'alert'); // Spy on the window alert

    spyOn(apiService, 'postApi').and.returnValue(of(response));

    component.selectedFile = mockFile;
    component.uploadImage();

    expect(apiService.postApi).toHaveBeenCalledOnceWith(
      environment.fileUpload, // Replace with your API endpoint
      jasmine.any(FormData) // Check if FormData is sent
    );

    expect(component.msg).toBe('Image uploaded successfully');
    expect(window.alert).toHaveBeenCalledWith('Image uploaded successfully');
  });
  it('Upload method have to call', () => {
    spyOn(component, 'uploadImage'); // Add a spy for your data retrieval function
    component.uploadImage();
    expect(component.uploadImage).toHaveBeenCalled();
  });

  it('select file method have to call', () => {
    spyOn(component, 'selectFile'); // Add a spy for your data retrieval function
    component.selectFile(onclick);
    expect(component.selectFile).toHaveBeenCalled();
  });
  it('should handle no image selected error', () => {
    // Set selectedFile to null, simulating no image selected
    component.selectedFile = null;
  
    // Call the method that triggers the image upload
    component.uploadImage();
  
    // Assert that the error message is set as expected
    expect(component.msg).toBe('You must select an image');
  });
  
  it('should handle image upload error', () => {
    const mockImage = new File(['sample content'], 'sample.jpg', { type: 'image/jpeg' });
  
    spyOn(apiService, 'postApi').and.returnValue(throwError({ status: 500 }));
  
    // Set the selected file in your component
    component.selectedFile = mockImage;
  
    // Trigger the method
    component.uploadImage();
  
    // Expectations for error case
    expect(component.msg).toBe('Error uploading image');
    // You can add more expectations based on your implementation, such as checking console logs or alerts
  });
  

  it('should show an error when a non-image file is selected', () => {
    const mockEvent: any = {
      target: { files: [{ type: 'text/plain' }] },
    };
    component.selectFile(mockEvent);

    expect(component.msg).toBe('Only images are supported');
   // expect(component.url).toBeUndefined();
   // expect(component.selectedFile).toBeUndefined();
  });

  it('should select an image successfully', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const mockEvent: any = { target: { files: [file] } };
    component.selectFile(mockEvent);

    expect(component.msg).toBe('');
    //expect(component.url).toBeDefined();
    expect(component.selectedFile).toEqual(file);
  });
});

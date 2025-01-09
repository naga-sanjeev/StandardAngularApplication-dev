import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>; 
  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService,{ provide: Router, useValue: mockRouter }], // Add the ApiService as a provider
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unexpected requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle 401 Unauthorized error', () => {
    // Arrange
    const errorResponse = {
      error: { status: '401', message: 'Unauthorized' },
    };
    const handleError = service.handleError<string>();

    // Act
    const result = handleError(errorResponse);

    // Assert
    result.subscribe(
      () => { },
      (error) => {
        // Assert that the router navigation is called with the expected URL
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
        // Assert that the error is handled and the result is returned as an observable
        expect(error).toBe('your-default-value'); // Replace with your expected default value
      }
    );
  });

  it('should make a GET request', () => {
    const endpoint = '/api/data';
    const responseData = { message: 'Data retrieved' };

    service.getApi(endpoint).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(endpoint);
    expect(req.request.method).toBe('GET');
    req.flush(responseData);
  });

  it('should make a POST request', () => {
    const endpoint = '/api/data';
    const requestData = { name: 'John' };
    const responseData = { message: 'Data posted' };

    service.postApi(endpoint, requestData).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(endpoint);
    expect(req.request.method).toBe('POST');
    req.flush(responseData);
  });

  it('should make a PUT request', () => {
    const endpoint = '/api/data';
    const requestData = { id: 1, name: 'Updated John' };
    const responseData = { message: 'Data updated' };

    service.putApi(endpoint, 1, requestData).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(`${endpoint}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(responseData);
  });

  it('should make a DELETE request', () => {
    const endpoint = '/api/data';
    const id = 1;
    const responseData = { message: 'Data deleted' };

    service.deleteApi(endpoint, id).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(`${endpoint}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(responseData);
  });

});

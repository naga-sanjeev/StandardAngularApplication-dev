
import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty string when no message is found', () => {
    const identifier = 'nonExistentIdentifier';
    const statusCode = '404';
    const result = service.getIntlErrorMessage(identifier, statusCode);
    expect(result).toEqual('');
  });

  it('should return an empty string when the message is not available in the specified language', () => {
    const identifier = 'existingIdentifier';
    const statusCode = '500';
    const result = service.getIntlErrorMessage(identifier, statusCode);
    expect(result).toEqual('');
  });


  it('should return empty string if identifier or statusCode is not found', () => {
    const result = service.getIntlErrorMessage('nonexistentIdentifier', '404');
    expect(result).toEqual('');
  });

  it('should return statusDesc if identifier and statusCode are found but language is missing', () => {
    const statusDesc = 'Custom Status Description';
    const result = service.getIntlErrorMessage('existingIdentifier', '404', statusDesc);
    expect(result).toEqual(statusDesc);
  });

 
});


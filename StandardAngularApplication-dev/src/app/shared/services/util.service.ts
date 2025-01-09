import { Injectable } from '@angular/core';
import { messages } from '../constants/error-messages';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getIntlErrorMessage(identifier: string, statusCode: string, statusDesc?: string): string {
    const lang = 'en';
    if (!messages[identifier] || !messages[identifier][statusCode] || !messages[identifier][statusCode][lang]) {
      return statusDesc || '';
    }
    return messages[identifier][statusCode][lang];
  }

}

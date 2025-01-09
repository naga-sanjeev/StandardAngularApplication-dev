import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  email: any;
  pswd: any;
  logres: any;
  cartCount: any;

  constructor(private http: HttpClient, private router: Router) { }

  getApi(endpoint: string) {
    return this.http.get(endpoint).pipe(
      map((uresponse: any) => {
        return uresponse;
      }),
      catchError(this.handleError<any>('error'))
    );
  }

  deleteApi(endpoint: string, id: number): Observable<any> {
    return this.http.delete(`${endpoint}/${id}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError<any>('error'))
    );
  }
  

  postApi(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(endpoint, data).pipe(
      map((uresponse: Response) => {
        return uresponse;
      }),
      catchError(this.handleError<any>('Login'))
    );
  }

  putApi(endpoint: string, id: number,data: any): Observable<any> {
    return this.http.put(`${endpoint}/${id}`,data).pipe(
      map((uresponse: any) => {
        return uresponse;
      }),
      catchError(this.handleError<any>('Login'))
    );
  }

   handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      try {
        if (
          error.error.status === '401' &&
          error.error.message === 'Unauthorized'
        ) {
          this.router.navigate(['/']);
        }
      } catch (error) {
      }
      return of(result as T);
    };
  }

} 

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from your storage (e.g., Local Storage or a cookie).
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      // Clone the request and add the Authorization header.
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
         
        },
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

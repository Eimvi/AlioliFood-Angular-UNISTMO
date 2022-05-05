import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorAuthService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqClone: HttpRequest<any>;
    const jwToken:string = localStorage.getItem('token')!;

    if(!jwToken){
      reqClone = req.clone({
      });
    }else{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwToken}`
      });
      reqClone = req.clone({
        headers
      });
    }

    return next.handle( reqClone );
  }
}

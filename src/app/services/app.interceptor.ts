import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add your API key to the request headers here
    const apiKey = '61c0d9a6c20c206af96c423d5d876355';
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-rapidapi-key': `${apiKey}`,
      },
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

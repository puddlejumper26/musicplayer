import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      withCredentials: true, //Cross-domain requests
    })).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): never {
    throw error.error;
  }
}

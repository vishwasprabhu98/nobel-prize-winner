/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { CommonService } from "../services/common.service/common.service";
import { inject } from "@angular/core";

export class Interceptor implements HttpInterceptor {
  commonService = inject(CommonService)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((e) => {
        this.handleError(e)
        return throwError(() => new Error(e));
      })
    )
  }

  handleError(e: any) {
    if (e?.error?.message) {
      this.commonService.openErrorDialog(e.error?.message)
    } else {
      switch(e.status) {
        case 404: 
          this.commonService.openErrorDialog('URL is not found')
          break;
        default: 
          this.commonService.openErrorDialog('Some API issue found')
          break;
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserTokenService } from '../auth/user-token.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KHttpInterceptorService implements HttpInterceptor {

  private token_string: string | undefined;
  constructor(
    private router: Router,
    //public toastController: ToastController,
    private usrTokenSvc: UserTokenService
  ) {
    //this.token_string='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiVVNFUl9DTElFTlRfUkVTT1VSQ0UiLCJVU0VSX0FETUlOX1JFU09VUkNFIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicm9sZV9hZG1pbiJdLCJleHAiOjE1NjIyMzk3OTEsImF1dGhvcml0aWVzIjpbInJvbGVfYWRtaW4iLCJjYW5fdXBkYXRlX3VzZXIiLCJjYW5fcmVhZF91c2VyIiwiY2FuX2NyZWF0ZV91c2VyIiwiY2FuX2RlbGV0ZV91c2VyIl0sImp0aSI6IjdhNTI3YTYwLTkyYmEtNGNjYS05MzYwLTk4MjMzODVhNjUzNSIsImVtYWlsIjoid2lsbGlhbUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJVU0VSX0NMSUVOVF9BUFAifQ.ctveAEn7gybAiF_gZxkHev-25Zt5nNPejnmShYiq2ItJNZpUw3Dr8brAcWTv46GWsR3PzxFc3e12y5emlfI3yvHvmQz94GGgMUD9Fg3EviPeULKkBHTuTBc1j9ulvNW8fQTSuRUv2bKWrXA7ZgUKVpPahdmUPlSl7_nS3UEwCRPP72GgLSgQzm4Ia2j9PJl5bMAGhDtwzjAuzy69hLemdy8GxKPtc3aDjbHEAjW9RMyNkWkbulMRS8rNMCbbvw3FlSG7leGdaCEQYEiFfF7bDkBNhM6e9RC-C5xEnuoyrovWjUAjHvA_4dmuXobbDzGV3xsCKecLmwATXk6hE9uhDQ';
    //console.log('TokenInterceptor::TokenInterceptor() - calling def constructor ...');
  }

  /*intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('enter to interceptor ....');
    return next.handle(request);
  }*/

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // For Non POST AUTH + OPTIONS HTTP

    if (!request.url.endsWith('/oauth/login') && !request.url.includes('public')) {
      request = this.addHeaderInformation(request);
    }

    // For ALL REQUEST

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: any) => { return this.handleError(error); })
    );

    //    throw new Error("Method not implemented.");
  }
  private addHeaderInformation(request: HttpRequest<any>) {
    if (this.usrTokenSvc != null)
      this.token_string = this.usrTokenSvc.getAccessToken();

    if (this.token_string != null) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.token_string,
          'Access-Control-Allow-Origin': '*',
        }
      });



      /* 
        if (!request.headers.has('Content-Type')) {
          //console.log('TokenInterceptor::intercept() - setting Content-Type ...');
          request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
          });
        }
         if (!request.headers.has('Accept')){  
          request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
          });
        }*/
    } else {
      // setting the token

    }
    return request;
  }
  private addHeader(request: HttpRequest<any>) {

    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',

      }
    });

    return request;
  }
  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        if (error.error.success === false) {


        } else {
          //console.log(error);
          this.router.navigate(['home']);
        }

      } else {
        if (this.usrTokenSvc.isTokenExpired()) {

          this.router.navigate(['ogin-page']);
        } else if (this.usrTokenSvc.getAccessToken() != null) {
          //display server down page
          if (this.usrTokenSvc.isUserConnected())
            this.router.navigate(['not-found']);
          else
            this.router.navigate(['ogin-page']);
        } else {

          // do not do any thing 
          // Keep network-error-handler.service handle the exception.
        }

      }
    } else {

      console.log(error);
      //display server down page
      this.router.navigate(['not-found']);
    }
    return throwError(error);
  }
  /* async presentToast(msg) {
     const toast = await this.toastController.create({
       message: msg,
       duration: 2000,
       position: 'top'
     });
     toast.present();
   }*/
}

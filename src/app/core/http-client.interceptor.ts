import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
    constructor() {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const URL = req.url;

        //  Clone the request to add the new header.
        const authReq = req.clone(
            {
                headers: req.headers.set('Content-Type', 'application/json'),
                url: `http://localhost:3000/${URL}`
            }
        );

        // send the newly created request
        return next.handle(authReq)
            .do((event: HttpResponse<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('---> status:', event.status);
                    // console.log('---> filter:', req.params.get('filter'));
                }
            })
            .finally(() => {
                // console.log('finally request');
            })
            .catch((error, caught) => {
                // intercept the respons error and displace it to the console
                console.log('Error Occurred');
                // return the error to the method that called it
                return Observable.throw(error);
            });
    }
}

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    //const req = request.clone({
    //    headers: request.headers.set('X-DEBUG', 'TESTING'),
   // });
   
    console.log('Intercepted request...');
    console.log('HTTP Request:', request);
    return next(request).pipe(
        tap({
            next: (event) => {
                console.log('HTTP Response:', event);
                if (event.type === HttpEventType.Response) {
                    console.log('Received full HTTP response');
                    console.log('HTTP Response Status:', event.status);
                    console.log('HTTP Response Body:', event.body);
                }
            }
        })
    );
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(
        withInterceptors([loggingInterceptor])
    )],
}).catch((err) => console.error(err));

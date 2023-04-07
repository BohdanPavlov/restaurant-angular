import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, throwError } from 'rxjs';
import { AuthInterceptor } from './auth-interceptor.service';
import { PersistenceService } from 'src/app/auth/services/persistence.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let persistenceServiceSpy: jasmine.SpyObj<PersistenceService>;
  let httpHandlerSpy: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PersistenceService', ['get']);
    const handlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: PersistenceService, useValue: spy },
        { provide: HttpHandler, useValue: handlerSpy },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    persistenceServiceSpy = TestBed.inject(
      PersistenceService
    ) as jasmine.SpyObj<PersistenceService>;
    httpHandlerSpy = TestBed.inject(HttpHandler) as jasmine.SpyObj<HttpHandler>;
  });

  it('should add the authorization header with the token when the token is available', () => {
    const token = 'some-access-token';
    const httpRequest = new HttpRequest('GET', '/api/data');
    const modifiedRequest = httpRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    persistenceServiceSpy.get.and.returnValue(token);
    httpHandlerSpy.handle.and.returnValue(new Observable<HttpEvent<any>>());

    interceptor.intercept(httpRequest, httpHandlerSpy);

    expect(persistenceServiceSpy.get).toHaveBeenCalledWith('accessToken');
    expect(httpHandlerSpy.handle).toHaveBeenCalledWith(modifiedRequest);
  });

  it('should handle the HTTP error response', done => {
    const token = 'some-access-token';
    const httpRequest = new HttpRequest('GET', '/api/data');
    const modifiedRequest = httpRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    const errorResponse = new HttpErrorResponse({ status: 401 });
    persistenceServiceSpy.get.and.returnValue(token);
    httpHandlerSpy.handle.and.returnValue(throwError(errorResponse));

    const obs = interceptor.intercept(httpRequest, httpHandlerSpy);

    obs.subscribe({
      next: () => fail('The request should have failed'),
      error: (error: Error) => {
        expect(persistenceServiceSpy.get).toHaveBeenCalledWith('accessToken');
        expect(httpHandlerSpy.handle).toHaveBeenCalledWith(modifiedRequest);
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Injectable} from '@angular/core'

import { PersistenceService } from 'src/app/auth/services/persistence.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceService.get('accessToken')
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return next.handle(request)
  }
}

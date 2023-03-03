import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AuthRequestDataInterface
} from 'src/app/auth/types/auth-request-data.interface';
import { environment } from 'src/environments/environment';
import {
  AuthResponseInterface
} from 'src/app/auth/types/auth-response.interface';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public auth(data: AuthRequestDataInterface, authMode: string): Observable<AuthResponseInterface> {
    const path = environment.apiBase + authMode;
    return this.http.post<AuthResponseInterface>(path, data)
  }
}

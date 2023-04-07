import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthRequestDataInterface } from 'src/app/auth/types/auth-request-data.interface';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  public constructor(private http: HttpClient) {}

  public auth(
    data: AuthRequestDataInterface,
    authMode: string
  ): Observable<AuthResponseInterface> {
    const path: string = environment.apiBase + authMode;
    return this.http.post<AuthResponseInterface>(path, data);
  }
}

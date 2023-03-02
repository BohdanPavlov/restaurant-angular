import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthRequestDataInterface
} from 'src/app/auth/types/authRequestData.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  AuthResponseInterface
} from 'src/app/auth/types/authResponse.interface';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public auth(data: AuthRequestDataInterface, authMode: string): Observable<AuthResponseInterface> {
    const path = environment.apiBase + authMode;
    return this.http.post<AuthResponseInterface>(path, data)
  }
}

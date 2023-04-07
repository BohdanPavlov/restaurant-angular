import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthRequestDataInterface } from 'src/app/auth/types/auth-request-data.interface';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('auth', () => {
    const authMode = 'login';
    const mockData: AuthRequestDataInterface = {
      email: 'test@test.com',
      password: 'testpassword',
    };
    const mockResponse: AuthResponseInterface = {
      accessToken: 'testtoken',
      user: {
        email: 'test@test.com',
        username: 'testuser',
        avatar: null,
        id: 1,
      },
    };

    it('should send a POST request to the correct API endpoint with the provided data', () => {
      authService.auth(mockData, authMode).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiBase}${authMode}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockData);

      req.flush(mockResponse);
    });
  });
});

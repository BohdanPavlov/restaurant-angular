import { TestBed } from '@angular/core/testing';

import { PersistenceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistenceService],
    });
    service = TestBed.inject(PersistenceService);
    service.set('testToken', 'test');
  });

  afterEach(() => {
    localStorage.removeItem('testToken');
  });

  it('should return a token from the localStorage', () => {
    const token = service.get('testToken');
    expect(token).toBe('test');
  });
  it('should set a token to the localStorage', () => {
    localStorage.removeItem('testToken');
    const token = 'test';
    service.set('testToken', token);
    expect(service.get('testToken')).toBe('test');
  });
});

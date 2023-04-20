import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { PersistenceService } from 'src/app/auth/services/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = this.persistenceService.get('accessToken');
    return token ? this.router.createUrlTree(['/login']) : true;
  }
}

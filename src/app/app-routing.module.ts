import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAuthorizedGuard } from 'src/app/auth/guards/not-authorized.guard';
import { AuthComponent } from 'src/app/auth/pages/auth/auth.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/menu', pathMatch: 'full',
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(
      m => m.MenuModule),
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: '**',
    redirectTo: '/menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

import { AuthComponent } from 'src/app/auth/pages/auth/auth.component';
import { NewsComponent } from 'src/app/news/pages/news/news.component';

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
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: '/menu',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

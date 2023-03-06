import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { MenuComponent } from 'src/app/menu/pages/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}

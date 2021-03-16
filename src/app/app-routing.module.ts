import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ImoveisComponent } from './imoveis/imoveis.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/helper/auth.guard';

const routes: Routes = [
  { path: '', component: ImoveisComponent },
  { path: 'admin', canActivate: [AuthGuard], component: AdminComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ListarImoveisComponent } from './listar-imoveis/listar-imoveis.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { ImovelComponent } from './imovel/imovel.component';

const routes: Routes = [
  { path: '', redirectTo: '/imoveis', pathMatch: 'full' },
  { path: 'imoveis', component: ListarImoveisComponent },
  { path: 'imovel/:id', component: ImovelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', canActivate: [AuthGuard], component: AdminComponent },
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

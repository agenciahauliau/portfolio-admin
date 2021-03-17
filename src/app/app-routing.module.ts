import { NgModule } from '@angular/core';
import { AuthGuard } from './helpers/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
  },
  {
    path: 'admin/imoveis',
    component: ListarImoveisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/imovel/:id',
    component: ExibirImovelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/criar-imovel',
    canActivate: [AuthGuard],
    component: CriarImovelComponent,
  },
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

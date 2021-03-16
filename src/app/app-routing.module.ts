import { NgModule } from '@angular/core';
import { AuthGuard } from './helpers/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';

const routes: Routes = [
  { path: '', redirectTo: '/imoveis', pathMatch: 'full' },
  { path: 'imoveis', component: ListarImoveisComponent },
  { path: 'imovel/:id', component: ExibirImovelComponent },
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

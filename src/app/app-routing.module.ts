import { NgModule } from '@angular/core';
import { AuthGuard } from './helpers/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';
import { ExibirGaleriaComponent } from './galeria/exibir-galeria/exibir-galeria.component';
import { ListarGaleriasComponent } from './galeria/listar-galerias/listar-galerias.component';
import { CriarGaleriaComponent } from './galeria/criar-galeria/criar-galeria.component';
import { UploadImagensComponent } from './galeria/upload-imagens/upload-imagens.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
  },
  {
    path: 'admin/imoveis',
    canActivate: [AuthGuard],
    component: ListarImoveisComponent,
  },
  {
    path: 'admin/imovel/:id',
    canActivate: [AuthGuard],
    component: ExibirImovelComponent,
  },
  {
    path: 'admin/criar-imovel',
    canActivate: [AuthGuard],
    component: CriarImovelComponent,
  },
  {
    path: 'admin/galerias',
    canActivate: [AuthGuard],
    component: ListarGaleriasComponent,
  },
  {
    path: 'admin/galeria/:id',
    canActivate: [AuthGuard],
    component: ExibirGaleriaComponent,
  },
  {
    path: 'admin/criar-galeria',
    canActivate: [AuthGuard],
    component: CriarGaleriaComponent,
  },
  {
    path: 'admin/upload',
    canActivate: [AuthGuard],
    component: UploadImagensComponent,
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

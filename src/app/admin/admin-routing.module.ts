import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { AdminComponent } from '../admin/admin.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';
import { ListarGaleriasComponent } from './galerias/listar-galerias/listar-galerias.component';
import { ExibirGaleriaComponent } from './galerias/exibir-galeria/exibir-galeria.component';
import { CriarGaleriaComponent } from './galerias/criar-galeria/criar-galeria.component';
import { UploadImagensComponent } from './galerias/upload-imagens/upload-imagens.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'imoveis',
            component: ListarImoveisComponent,
          },
          {
            path: 'imovel/:id',
            component: ExibirImovelComponent,
          },
          {
            path: 'criar-imovel',
            component: CriarImovelComponent,
          },
          {
            path: 'galerias',
            component: ListarGaleriasComponent,
          },
          {
            path: 'galeria/:id',
            component: ExibirGaleriaComponent,
          },
          {
            path: 'criar-galeria',
            component: CriarGaleriaComponent,
          },
          {
            path: 'upload',
            component: UploadImagensComponent,
          },
          {
            path: '',
            redirectTo: 'imoveis',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

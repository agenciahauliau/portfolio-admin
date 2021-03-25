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
import { EditarImovelComponent } from './imoveis/editar-imovel/editar-imovel.component';
import { EditarGaleriaComponent } from './galerias/editar-galeria/editar-galeria.component';

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
            path: 'admin/imovel/:id',
            component: ExibirImovelComponent,
          },
          {
            path: 'admin/criar-imovel',
            component: CriarImovelComponent,
          },
          {
            path: 'admin/editar-imovel/:id',
            component: EditarImovelComponent,
          },
          {
            path: 'admin/galerias',
            component: ListarGaleriasComponent,
          },
          {
            path: 'admin/galeria/:id',
            component: ExibirGaleriaComponent,
          },
          {
            path: 'admin/criar-galeria',
            component: CriarGaleriaComponent,
          },
          {
            path: 'admin/editar-galeria/:id',
            component: EditarGaleriaComponent,
          },
          {
            path: 'admin/upload',
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

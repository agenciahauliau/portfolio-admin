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
import { ListarLeadsComponent } from './leads/listar-leads/listar-leads.component';
import { ExibirLeadComponent } from './leads/exibir-lead/exibir-lead.component';
import { CriarLeadComponent } from './leads/criar-lead/criar-lead.component';
import { EditarLeadComponent } from './leads/editar-lead/editar-lead.component';

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
            path: 'editar-imovel/:id',
            component: EditarImovelComponent,
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
            path: 'editar-galeria/:id',
            component: EditarGaleriaComponent,
          },
          {
            path: 'upload',
            component: UploadImagensComponent,
          },
          {
            path: 'leads',
            component: ListarLeadsComponent,
          },
          {
            path: 'lead/:id',
            component: ExibirLeadComponent,
          },
          {
            path: 'criar-lead',
            component: CriarLeadComponent,
          },
          {
            path: 'editar-lead/:id',
            component: EditarLeadComponent,
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

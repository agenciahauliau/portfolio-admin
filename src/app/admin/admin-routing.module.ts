import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';

import { AdminComponent } from '../admin/admin.component';

import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';
import { EditarImovelComponent } from './imoveis/editar-imovel/editar-imovel.component';

import { BibliotecaComponent } from './biblioteca/biblioteca.component';

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
            path: 'biblioteca',
            component: BibliotecaComponent,
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';

import { AdminComponent } from '../admin/admin.component';

import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { AprovarImoveisComponent } from './imoveis/aprovar-imovel/aprovar-imoveis.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';
import { EditarImovelComponent } from './imoveis/editar-imovel/editar-imovel.component';

import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { ExibirArquivoComponent } from './biblioteca/exibir-arquivo/exibir-arquivo.component';
import { EditarArquivoComponent } from './biblioteca/editar-arquivo/editar-arquivo.component';

import { ListarLeadsComponent } from './leads/listar-leads/listar-leads.component';
import { ExibirLeadComponent } from './leads/exibir-lead/exibir-lead.component';
import { EditarLeadComponent } from './leads/editar-lead/editar-lead.component';

import { ExibirPostComponent } from './blog/exibir-post/exibir-post.component';
import { EditarPostComponent } from './blog/editar-post/editar-post.component';
import { CriarPostComponent } from './blog/criar-post/criar-post.component';
import { ListarPostsComponent } from './blog/listar-posts/listar-posts.component';

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
            path: 'imoveis/aprovar',
            component: AprovarImoveisComponent,
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
            path: 'biblioteca/:id',
            component: ExibirArquivoComponent,
          },
          {
            path: 'editar-arquivo/:id',
            component: EditarArquivoComponent,
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
            path: 'posts',
            component: ListarPostsComponent,
          },
          {
            path: 'post/:id',
            component: ExibirPostComponent,
          },
          {
            path: 'criar-post',
            component: CriarPostComponent,
          },
          {
            path: 'editar-post/:id',
            component: EditarPostComponent,
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

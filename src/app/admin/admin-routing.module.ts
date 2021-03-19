import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { AdminComponent } from '../admin/admin.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';

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

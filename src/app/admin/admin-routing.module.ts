import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { AdminComponent } from '../admin/admin.component';
import { ExibirImovelComponent } from '../imoveis/exibir-imovel/exibir-imovel.component';
import { ListarImoveisComponent } from '../imoveis/listar-imoveis/listar-imoveis.component';
import { CriarImovelComponent } from '../imoveis/criar-imovel/criar-imovel.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
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
            path: 'imovel/criar',
            component: CriarImovelComponent,
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

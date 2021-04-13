import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { EditarImovelComponent } from './imoveis/editar-imovel/editar-imovel.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';
import { CriarGaleriaComponent } from './galerias/criar-galeria/criar-galeria.component';
import { ExibirGaleriaComponent } from './galerias/exibir-galeria/exibir-galeria.component';
import { EditarGaleriaComponent } from './galerias/editar-galeria/editar-galeria.component';
import { ListarGaleriasComponent } from './galerias/listar-galerias/listar-galerias.component';
import { UploadImagensComponent } from './galerias/upload-imagens/upload-imagens.component';
import { ListarLeadsComponent } from './leads/listar-leads/listar-leads.component';
import { CriarLeadComponent } from './leads/criar-lead/criar-lead.component';
import { ExibirLeadComponent } from './leads/exibir-lead/exibir-lead.component';
import { EditarLeadComponent } from './leads/editar-lead/editar-lead.component';
@NgModule({
  declarations: [
    AdminComponent,
    ListarImoveisComponent,
    ExibirImovelComponent,
    EditarImovelComponent,
    CriarImovelComponent,
    CriarGaleriaComponent,
    ExibirGaleriaComponent,
    EditarGaleriaComponent,
    ListarGaleriasComponent,
    UploadImagensComponent,
    ListarLeadsComponent,
    CriarLeadComponent,
    ExibirLeadComponent,
    EditarLeadComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AdminModule {}

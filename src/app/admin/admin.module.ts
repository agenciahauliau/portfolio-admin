import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent } from './footer/footer.component';

import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { EditarImovelComponent } from './imoveis/editar-imovel/editar-imovel.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';

import { BibliotecaComponent } from './biblioteca/biblioteca.component';

import { ListarLeadsComponent } from './leads/listar-leads/listar-leads.component';
import { CriarLeadComponent } from './leads/criar-lead/criar-lead.component';
import { ExibirLeadComponent } from './leads/exibir-lead/exibir-lead.component';
import { EditarLeadComponent } from './leads/editar-lead/editar-lead.component';
@NgModule({
  declarations: [
    AdminComponent,
    FooterComponent,
    ListarImoveisComponent,
    ExibirImovelComponent,
    EditarImovelComponent,
    CriarImovelComponent,
    BibliotecaComponent,
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
    EditorModule,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCurrencyModule } from 'ngx-currency';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { AprovarImoveisComponent } from './imoveis/aprovar-imovel/aprovar-imoveis.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { EditarImovelComponent } from './imoveis/editar-imovel/editar-imovel.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';

import { BibliotecaComponent } from './biblioteca/biblioteca.component';

import { ListarLeadsComponent } from './leads/listar-leads/listar-leads.component';
import { ExibirLeadComponent } from './leads/exibir-lead/exibir-lead.component';
import { EditarLeadComponent } from './leads/editar-lead/editar-lead.component';

import { ExibirPostComponent } from './blog/exibir-post/exibir-post.component';
import { EditarPostComponent } from './blog/editar-post/editar-post.component';
import { CriarPostComponent } from './blog/criar-post/criar-post.component';
import { ListarPostsComponent } from './blog/listar-posts/listar-posts.component';
import { TruncatePipe } from '../helpers/truncate.pipe';
import { SortDirective } from '../helpers/sort.directive';
import { ExibirArquivoComponent } from './biblioteca/exibir-arquivo/exibir-arquivo.component';
import { EditarArquivoComponent } from './biblioteca/editar-arquivo/editar-arquivo.component';
@NgModule({
  declarations: [
    AdminComponent,
    ListarImoveisComponent,
    AprovarImoveisComponent,
    ExibirImovelComponent,
    EditarImovelComponent,
    CriarImovelComponent,
    BibliotecaComponent,
    ListarLeadsComponent,
    ExibirLeadComponent,
    EditarLeadComponent,
    ExibirPostComponent,
    EditarPostComponent,
    CriarPostComponent,
    ListarPostsComponent,
    TruncatePipe,
    SortDirective,
    ExibirArquivoComponent,
    EditarArquivoComponent,
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
    NgxViacepModule,
    NgxPaginationModule,
    NgxCurrencyModule,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class AdminModule {}

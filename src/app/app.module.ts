import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { GraphQLModule } from './services/graphql.module';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LoginComponent } from './auth/login/login.component';
import { ListarImoveisComponent } from './imoveis/listar-imoveis/listar-imoveis.component';
import { ExibirImovelComponent } from './imoveis/exibir-imovel/exibir-imovel.component';
import { EditarImovelComponent } from './imoveis/editar-imovel/editar-imovel.component';
import { CriarImovelComponent } from './imoveis/criar-imovel/criar-imovel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CriarGaleriaComponent } from './galeria/criar-galeria/criar-galeria.component';
import { ExibirGaleriaComponent } from './galeria/exibir-galeria/exibir-galeria.component';
import { EditarGaleriaComponent } from './galeria/editar-galeria/editar-galeria.component';
import { UploadImagensComponent } from './galeria/upload-imagens/upload-imagens.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CabecalhoComponent,
    LoginComponent,
    ListarImoveisComponent,
    ExibirImovelComponent,
    EditarImovelComponent,
    CriarImovelComponent,
    CriarGaleriaComponent,
    ExibirGaleriaComponent,
    EditarGaleriaComponent,
    UploadImagensComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

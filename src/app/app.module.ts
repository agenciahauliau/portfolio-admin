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
import { ImoveisComponent } from './imoveis/imoveis.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CabecalhoComponent,
    LoginComponent,
    ImoveisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

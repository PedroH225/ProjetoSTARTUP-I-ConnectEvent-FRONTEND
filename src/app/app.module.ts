import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './principal/login/login.component';
import { RegisterComponent } from './principal/register/register.component';
import { HomePageComponent } from './principal/home-page/home-page.component';
import { AreaUsuarioComponent } from './principal/area-usuario/area-usuario.component';
import { CardComponent } from './principal/home-page/card/card.component';
import { FilterComponent } from './principal/home-page/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { CardPageComponent } from './principal/card-page/card-page.component';

import { HttpClientModule } from '@angular/common/http';
import { EsqueceuSenhaComponent } from './principal/esqueceu-senha/esqueceu-senha.component';
import { CriarEventoComponent } from './principal/area-usuario/criar-evento/criar-evento.component';
import { EventosAnunciadosComponent } from './principal/area-usuario/eventos-anunciados/eventos-anunciados.component';
import { FeedbacksComponent } from './principal/area-usuario/feedbacks/feedbacks.component';
import { EstatisticasComponent } from './principal/area-usuario/estatisticas/estatisticas.component';
import { EventosConfirmadosComponent } from './principal/area-usuario/eventos-confirmados/eventos-confirmados.component';
import { ListaDeAmigosComponent } from './principal/area-usuario/lista-de-amigos/lista-de-amigos.component';
import { ConfiguracoesComponent } from './principal/area-usuario/configuracoes/configuracoes.component';
import { ImageUploaderComponent } from './principal/area-usuario/criar-evento/image-uploader/image-uploader.component';
import { GeolocalizacaoComponent } from './principal/area-usuario/geolocalizacao/geolocalizacao.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    PrincipalComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    AreaUsuarioComponent,
    CardComponent,
    FilterComponent,
    CardPageComponent,
    EsqueceuSenhaComponent,
    CriarEventoComponent,
    EventosAnunciadosComponent,
    FeedbacksComponent,
    EstatisticasComponent,
    EventosConfirmadosComponent,
    ListaDeAmigosComponent,
    ConfiguracoesComponent,
    ImageUploaderComponent,
    GeolocalizacaoComponent,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

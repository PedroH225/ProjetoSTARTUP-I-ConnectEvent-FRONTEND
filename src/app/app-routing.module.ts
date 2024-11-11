import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PrincipalComponent } from './principal/principal.component';
import { HomePageComponent } from './principal/home-page/home-page.component';
import { LoginComponent } from './principal/login/login.component';
import { RegisterComponent } from './principal/register/register.component';
import { AreaUsuarioComponent } from './principal/area-usuario/area-usuario.component';
import { CardComponent } from './principal/home-page/card/card.component';
import { CardPageComponent } from './principal/card-page/card-page.component';
import { EsqueceuSenhaComponent } from './principal/esqueceu-senha/esqueceu-senha.component';
import { ConfiguracoesComponent } from './principal/area-usuario/configuracoes/configuracoes.component';
import { CriarEventoComponent } from './principal/area-usuario/criar-evento/criar-evento.component';
import { EstatisticasComponent } from './principal/area-usuario/estatisticas/estatisticas.component';
import { EventosAnunciadosComponent } from './principal/area-usuario/eventos-anunciados/eventos-anunciados.component';
import { EventosConfirmadosComponent } from './principal/area-usuario/eventos-confirmados/eventos-confirmados.component';
import { FeedbacksComponent } from './principal/area-usuario/feedbacks/feedbacks.component';
import { ListaDeAmigosComponent } from './principal/area-usuario/lista-de-amigos/lista-de-amigos.component';
import { authGuard } from '../services/guards/auth.guard';
import { GeolocalizacaoComponent } from './principal/area-usuario/geolocalizacao/geolocalizacao.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'navBar',
    component: NavBarComponent,
    children: [],
  },
  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
      {
        path: 'homePage',
        component: HomePageComponent,
        children: [{ path: 'card', component: CardComponent }],
      },
      { path: 'cardPage/:id', component: CardPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'areaUsuario',
        component: AreaUsuarioComponent,

        canActivate: [authGuard],
        children: [
          // inicio do 'path que auxilia o desenvolvimento
          // { path: '', redirectTo: 'criarEvento', pathMatch: 'full' }, // Redireciona para criarEvento ao carregar areaUsuario
          // fim do 'path' que auxilia o desenvolvimento
          { path: 'configuracoes', component: ConfiguracoesComponent },
          { path: 'criarEvento', component: CriarEventoComponent },
          { path: 'editarEvento/:id', component: CriarEventoComponent },
          { path: 'estatisticas', component: EstatisticasComponent },
          { path: 'eventosAnunciados', component: EventosAnunciadosComponent },
          {
            path: 'eventosConfirmados',
            component: EventosConfirmadosComponent,
          },
          { path: 'feedbacks', component: FeedbacksComponent },
          { path: 'listaDeAmigos', component: ListaDeAmigosComponent },
          { path: 'geolocalizacao', component: GeolocalizacaoComponent },
        ],
      },
      { path: 'esqueceuSenha', component: EsqueceuSenhaComponent },
    ],
  },
  { path: 'footer', component: FooterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

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
      { path: 'areaUsuario', component: AreaUsuarioComponent },
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

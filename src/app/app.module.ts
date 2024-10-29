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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

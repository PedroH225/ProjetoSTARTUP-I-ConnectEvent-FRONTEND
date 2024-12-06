import { Component, Input, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { Router } from '@angular/router';
import {
  NgbAccordionConfig,
  NgbAccordionModule,
} from '@ng-bootstrap/ng-bootstrap';
import { WallpaperService } from '../../../../src/services/wallpaper.service';

@Component({
  selector: 'app-area-usuario',
  templateUrl: './area-usuario.component.html',
  styleUrl: './area-usuario.component.scss',
})
export class AreaUsuarioComponent implements OnInit {
  wallpaperUrl: string = 'assets/wallpapers/default.jpg';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private wallpaperService: WallpaperService,
    config: NgbAccordionConfig
  ) {
    config.closeOthers = true;
  }

  ngOnInit() {
    this.wallpaperService.currentWallpaper.subscribe(
      (wallpaper) => (this.wallpaperUrl = wallpaper)
    );
  }

  logout() {
    if (confirm('Tem certeza que deseja sair?')) {
      this.autenticacaoService.logout();
      this.router.navigate(['/principal/homePage']);
    }
  }

  updateWallpaper(newWallpaper: string) {
    this.wallpaperUrl = newWallpaper;
  }
}

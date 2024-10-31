import { CanActivateFn } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AutenticacaoService);

  return authService.autenticacao$.pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        // Redireciona para a tela de login se não estiver autenticado
        router.navigate(['/principal/login']);
      }
    })
  );
};

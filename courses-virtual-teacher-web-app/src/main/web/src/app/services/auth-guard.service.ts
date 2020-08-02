import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

/**
 * Guard qui permet de vérifier si l'utilisateur est connecté avant d'accéder aux pages
 * Si non on redirige l'utilisateur vers la page de connexion
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorageService.isLogin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
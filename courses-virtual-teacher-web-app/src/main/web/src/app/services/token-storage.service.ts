import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

/**
 * Service qui permet d'accéder à la session pour enregistrer le user et le token de l'API associé
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * Déconnecte le user en vidant la session
   */
  public signOut(): void {
    window.sessionStorage.clear();
  }

  /**
   * Enregistre le token de l'API
   * @param token 
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Récupère le token
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Enregistre le user
   * @param user 
   */
  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Récupère le user
   */
  public getUser(): User {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  /**
  * Vérifie si le user est connecté ou non
  */
  public isLogin(): boolean {
    return sessionStorage.getItem(USER_KEY) != null && sessionStorage.getItem(TOKEN_KEY) != null;
  }
}

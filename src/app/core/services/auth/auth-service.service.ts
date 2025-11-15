import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <-- Importante para SSR
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { enviroment } from '../../../../enviroment/enviroment';
import { RegisterInterfaz } from '../../interfaces/auth/register-interfaz';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: any;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private http = inject(HttpClient);
  private apiUrl = enviroment.apiUrl;
  private platformId = inject(PLATFORM_ID); // <-- Inyectamos el Platform ID

  // Inicializamos con 'false' y lo actualizamos en el constructor si estamos en el navegador
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    // Solo intentamos acceder a localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.loggedIn.next(this.hasToken());
    }
  }

  login(credentials: { usMail: string, usPassword: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.saveToken(response.access_token);
        if (response.roles && response.roles.length > 0) {
          this.saveUserRole(response.roles[0]);
        }
        this.loggedIn.next(true);
      })
    );
  }

  register(data: RegisterInterfaz): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    this.removeToken();
    this.removeUserRole();
    this.loggedIn.next(false);
  }

  // --- Métodos protegidos para localStorage ---

  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  private saveUserRole(role: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', role);
    }
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  private removeUserRole(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userRole');
    }
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
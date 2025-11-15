import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthServiceService);
    const router = inject(Router);
    const token = authService.getToken(); 

    // declara urls que no necesitan token
    const publicEndpoints = ['/login', '/register'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => req.url.includes(endpoint));

    if (!token || isPublicEndpoint) {
        
        return next(req);
    }

    
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    // Enviamos la petición clonada y manejamos posibles errores
    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Si el error es 401 (No autorizado), el token es inválido o ha expirado.
                // Cerramos la sesión y redirigimos al login.
                authService.logout();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
}
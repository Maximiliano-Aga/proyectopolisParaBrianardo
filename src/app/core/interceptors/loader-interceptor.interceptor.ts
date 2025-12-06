import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader/loader-service.service';

/** Interceptor funcional que maneja el estado de carga (loader). */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  // 1. Antes de enviar la petición: Mostrar el loader
  loaderService.show();

  // 2. Al finalizar (éxito o error): Ocultar el loader
  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    })
  );
};
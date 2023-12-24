import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const requestsInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedRequest = req.clone({
    setHeaders: {
      'Authorization': environment.bearer
    }
  });
  return next(modifiedRequest);
};

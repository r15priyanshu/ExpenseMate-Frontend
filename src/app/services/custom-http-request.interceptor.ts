import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalConstants } from '../constants/global-constants';
import { LoginAndRegisterService } from './login-and-register.service';

export const customHttpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const loginAndRegisterService = inject(LoginAndRegisterService)

  //Below List Will Be Used For Exact URL Match, Which Should Not Be Intercepted.
  const urlsNotToBeIntercepted = [GlobalConstants.LOGIN_URL,GlobalConstants.REGISTER_URL]
  if(urlsNotToBeIntercepted.includes(req.url)){
    return next(req)
  }

  //Any URL Including.'/public', Should Also Not Be Intercepted.
  if(req.url.includes("/public")){
    return next(req)
  }

  console.log('Intercepting Request For : ',req.url)
  const token = loginAndRegisterService.getToken()
  console.log('Token Added To The Request Header For : ',req.url)
  const modifiedRequest = req.clone({
    setHeaders:{
      'Authorization':`Bearer ${token}`
    }
  })

  return next(modifiedRequest);
};

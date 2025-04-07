import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginAndRegisterService } from '../services/login-and-register.service';

export const authGuard: CanActivateFn = (route, state) => {
  const allowedRoles: string[] = route.data['allowedRoles']; 
  const loginAndRegisterService = inject(LoginAndRegisterService);
  const router = inject(Router);

  console.log(`AuthGuard : Checking access for : ${state.url} : Allowed Roles : ${allowedRoles}`);

  const { isUserLoggedIn , loggedInUserDetails } = loginAndRegisterService.AuthDetailsBehaviourSubject.value;
  if (isUserLoggedIn && loggedInUserDetails !== null && loggedInUserDetails.role?.roleName && allowedRoles.includes(loggedInUserDetails.role?.roleName)) {
    console.log(`AuthGuard : Allowed !! Is User Logged In : ${isUserLoggedIn} !! Found Role : ${loggedInUserDetails.role.roleName}`);
    return true;
  } else {
    console.log(`AuthGuard : Not Allowed !! Is User Logged In : ${isUserLoggedIn} !! Found Role : ${loggedInUserDetails?.role?.roleName}`);
    router.navigate(['/login']);
    return false;
  }
};

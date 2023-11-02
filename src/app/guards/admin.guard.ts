import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);
  const { userUsed } = authService;

  console.log('guard', userUsed);
  try{
  if (userUsed['tipo']!='admin') {
    router.navigateByUrl('/main');
    return false;
  }}
  catch (error){
    router.navigateByUrl('/main');
  }
  
  return true;
};

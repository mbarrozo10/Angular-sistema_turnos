import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);
  const { userUsed } = authService;
  const rol= route.data 
  console.log(rol)
  console.log('guard', userUsed);
  try{
  if (userUsed['tipo']!=rol['role']) {
    router.navigateByUrl('/main');
    return false;
  }}
  catch (error){
    router.navigateByUrl('/main');
  }
  
  return true;
};

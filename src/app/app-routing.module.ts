import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const routes: Routes = [
  {path:"", redirectTo: "login", pathMatch: 'full'},
  {path:"login", loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path:"main", loadChildren: () => import('./main/main.module').then(m => m.MainModule),...canActivate(() => redirectUnauthorizedTo(['/login']))},
  {path:"registrar", loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

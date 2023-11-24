import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    {path:"admin", loadChildren: () => import('./admin-usuarios/admin-usuarios.module').then(m => m.AdminUsuariosModule), canActivate:[adminGuard],data:{role:'admin'}},
    {path:"perfil", loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)},
    {path:"turnos", loadChildren: () => import('./turnos/turnos.module').then(m => m.TurnosModule)},
    {path:"home", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path:"pacientes", loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule), canActivate:[adminGuard],data:{role:'especialista'}}],

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

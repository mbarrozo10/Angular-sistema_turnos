import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosComponent } from './turnos.component';
import { adminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [{
  path: '', component: TurnosComponent, children: [
    {path: 'especialista', loadChildren: () => import('./vista-especialista/vista-especialista.module').then(m => m.VistaEspecialistaModule), canActivate:[adminGuard],data:{role:'especialista'}},
    {path: 'paciente', loadChildren: () => import('./vista-paciente/vista-paciente.module').then(m => m.VistaPacienteModule), canActivate:[adminGuard],data:{role:'user'}},
    {path: 'nuevo', loadChildren: () => import('./nuevo-turno/nuevo-turno.module').then(m => m.NuevoTurnoModule), canActivate:[adminGuard],data:{role:'user'}}

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }

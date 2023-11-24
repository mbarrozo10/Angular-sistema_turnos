import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoTurnoComponent } from './nuevo-turno.component';

const routes: Routes = [{
  path: '', component: NuevoTurnoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoTurnoRoutingModule { }

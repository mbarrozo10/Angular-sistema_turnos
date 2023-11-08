import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaEspecialistaComponent } from './vista-especialista.component';

const routes: Routes = [{
  path: '', component: VistaEspecialistaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaEspecialistaRoutingModule { }

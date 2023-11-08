import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaPacienteComponent } from './vista-paciente.component';

const routes: Routes = [{
  path: '', component: VistaPacienteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaPacienteRoutingModule { }

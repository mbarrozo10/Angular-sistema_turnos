import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistaPacienteRoutingModule } from './vista-paciente-routing.module';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VistaPacienteRoutingModule
  ]
})
export class VistaPacienteModule { }

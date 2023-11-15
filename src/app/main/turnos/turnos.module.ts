import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { VistaPacienteComponent } from './vista-paciente/vista-paciente.component';
import { VistaEspecialistaComponent } from './vista-especialista/vista-especialista.component';
import {MatStepperModule}from "@angular/material/stepper"
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { FechaPipe } from '../../pipes/fecha.pipe';

@NgModule({
  declarations: [
    VistaPacienteComponent,
    VistaEspecialistaComponent,
    FechaPipe

  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule
    ,MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule
  ]
})
export class TurnosModule { }

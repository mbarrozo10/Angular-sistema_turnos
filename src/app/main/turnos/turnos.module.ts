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
import { ListaModule } from './lista/lista.module';
import { ListaComponent } from './lista/lista.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NuevoTurnoComponent } from './nuevo-turno/nuevo-turno.component';
import { MatMenuModule } from '@angular/material/menu';
import { HoraPipe } from 'src/app/pipes/hora.pipe';
@NgModule({
  declarations: [
    VistaPacienteComponent,
    VistaEspecialistaComponent,
    ListaComponent,
    FechaPipe,
    NuevoTurnoComponent,
    HoraPipe
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
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    ListaModule,
    MatMenuModule
  ],
  exports: [],
  // providers: [FechaPipe]
})
export class TurnosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { FormsModule } from '@angular/forms';
import { AltaComponent } from './alta/alta.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PerfilComponent } from './perfil/perfil.component';
import { TurnosComponent } from './turnos/turnos.component';
import { FechaPipe } from '../pipes/fecha.pipe';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './turnos/lista/lista.component';
import { ListaModule } from './turnos/lista/lista.module';
import { PacientesComponent } from './pacientes/pacientes.component';
import { FechaDosPipe } from '../pipes/fecha-dos.pipe';

@NgModule({
  declarations: [
    AdminUsuariosComponent,
    AltaComponent,
    PerfilComponent,
    TurnosComponent,
    HomeComponent,
    PacientesComponent,
    // ListaComponent,
    FechaDosPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
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
    ListaModule
  ],
  // providers:[FechaPipe]
})
export class MainModule { }

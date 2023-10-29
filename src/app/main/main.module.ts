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

@NgModule({
  declarations: [
    AdminUsuariosComponent,
    AltaComponent
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
    MatButtonModule
  ]
})
export class MainModule { }

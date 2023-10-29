import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsuariosRoutingModule } from './admin-usuarios-routing.module';
import { AltaComponent } from '../alta/alta.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatGridTile} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    // AltaComponent
  ],
  imports: [
    CommonModule,
    AdminUsuariosRoutingModule,
    MatGridListModule
  ]
})
export class AdminUsuariosModule { }

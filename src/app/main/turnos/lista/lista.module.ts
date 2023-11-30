import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { FilaDirective } from 'src/app/directivas/fila.directive';


@NgModule({
  declarations: [
    FilaDirective
  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
  ]
})
export class ListaModule { }

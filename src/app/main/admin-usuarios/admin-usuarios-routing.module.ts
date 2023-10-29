import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuariosComponent } from './admin-usuarios.component';

const routes: Routes = [{
  path: '',component: AdminUsuariosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsuariosRoutingModule { }

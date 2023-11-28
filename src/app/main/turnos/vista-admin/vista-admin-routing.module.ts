import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaAdminComponent } from './vista-admin.component';

const routes: Routes = [{
  path:'', component: VistaAdminComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaAdminRoutingModule { }

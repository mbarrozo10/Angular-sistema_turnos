import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    {path:"admin", loadChildren: () => import('./admin-usuarios/admin-usuarios.module').then(m => m.AdminUsuariosModule)}],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

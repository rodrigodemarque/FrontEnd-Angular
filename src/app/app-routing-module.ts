import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Edit } from './components/edit/edit';


const routes: Routes = [
{ path : '', component : Home},
{ path: 'nova', component: Edit },
{ path: 'editar/:id', component: Edit }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

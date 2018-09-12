import { CreateAppartmentComponent } from './appartment/create-appartment/create-appartment.component';
import { AppartmentComponent } from './appartment/appartment.component';
import { ResidentViewComponent } from './residents/resident-view/resident-view.component';
import { ResidentCreateComponent } from './residents/resident-create/resident-create.component';
import { ResidentsComponent } from './residents/residents.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

const routes: Routes = [
  {path: '', component: ResidentsComponent},
  {path: 'residents', component: ResidentsComponent},
  {path: 'residents/new', component: ResidentCreateComponent},
  {path: 'residents/view/:id', component: ResidentViewComponent},
  {path: 'appartments', component: AppartmentComponent},
  {path: 'appartment/edit/:id', component: CreateAppartmentComponent},
  {path: 'appartment/new', component: CreateAppartmentComponent},
  {path: '**', redirectTo: '/residents', pathMatch: 'full' }
 ];


 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

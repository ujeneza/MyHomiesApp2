import { ResidentFilesComponent } from './residents/resident-files/resident-files.component';
import { ContractInfoComponent } from './residents/contract-info/contract-info.component';
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
  {path: 'contractInfo/new', component: ContractInfoComponent},
<<<<<<< HEAD
  {path: 'contractInfo/edit/:id', component: ContractInfoComponent},
  {path: 'residentFiles', component: ResidentFilesComponent},
=======
>>>>>>> 60a33c6450639d91c8651c288eaff3f29af7df71
  {path: '**', redirectTo: '/residents', pathMatch: 'full' }
 ];


 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

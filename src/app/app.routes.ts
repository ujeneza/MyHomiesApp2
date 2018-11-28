import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ResidentFilesComponent } from './residents/resident-files/resident-files.component';
import { ContractInfoComponent } from './residents/contract-info/contract-info.component';
import { CreateAppartmentComponent } from './appartment/create-appartment/create-appartment.component';
import { AppartmentComponent } from './appartment/appartment.component';
import { ResidentViewComponent } from './residents/resident-view/resident-view.component';
import { ResidentCreateComponent } from './residents/resident-create/resident-create.component';
import { ResidentsComponent } from './residents/residents.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ValidatorsComponent } from './design-tools/validators/validators.component';

const routes: Routes = [
  {path: '', component: ResidentsComponent, canActivate: [AuthGuard]},
  {path: 'residents', component: ResidentsComponent, canActivate: [AuthGuard]},
  {path: 'residents/new', component: ResidentCreateComponent, canActivate: [AuthGuard]},
  {path: 'residents/view/:id', component: ResidentViewComponent, canActivate: [AuthGuard]},
  {path: 'appartments', component: AppartmentComponent, canActivate: [AuthGuard]},
  {path: 'appartment/edit/:id', component: CreateAppartmentComponent, canActivate: [AuthGuard]},
  {path: 'appartment/new', component: CreateAppartmentComponent, canActivate: [AuthGuard]},
  {path: 'contractInfo/new', component: ContractInfoComponent, canActivate: [AuthGuard]},
  {path: 'contractInfo/edit/:id', component: ContractInfoComponent, canActivate: [AuthGuard]},
  {path: 'residentFiles', component: ResidentFilesComponent, canActivate: [AuthGuard]},
  {path: 'validators', component: ValidatorsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: '**', redirectTo: '/residents', pathMatch: 'full' }
 ];


 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}

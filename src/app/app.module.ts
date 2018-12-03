
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResidentCreateComponent } from './residents/resident-create/resident-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResidentViewComponent } from './residents/resident-view/resident-view.component';
import { CommonModule } from '@angular/common';


import {MAT_DATE_LOCALE} from '@angular/material';

  import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResidentsComponent } from './residents/residents.component';
import { FooterComponent } from './footer/footer.component';
import { AppartmentComponent } from './appartment/appartment.component';
import { CreateAppartmentComponent } from './appartment/create-appartment/create-appartment.component';
import { ResidentFilesComponent } from './residents/resident-files/resident-files.component';
import { ContractInfoComponent } from './residents/contract-info/contract-info.component';
import { UploadModule } from './upload/upload.module';
import { ResidentCardComponent } from './residents/resident-card/resident-card.component';
import { SnackBarComponent } from './design-tools/snack-bar/snack-bar.component';
import { ValidatorsComponent } from './design-tools/validators/validators.component';
import { SearchComponent } from './search/search.component';
import { DialogOverviewComponent } from './design-tools/dialog-overview/dialog-overview.component';
import { ErrorComponent } from './error/error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { ErrorInterceptor } from './error-interceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AppRoutingModule } from './app.routes';
import { QuestionableBooleanPipe } from './pipes/boolean-to-text';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResidentsComponent,
    ResidentCreateComponent,
    ResidentViewComponent,
    QuestionableBooleanPipe,
    FooterComponent,
    AppartmentComponent,
    CreateAppartmentComponent,
    ResidentFilesComponent,
    ContractInfoComponent,
    ResidentCardComponent,
    SnackBarComponent,
    ValidatorsComponent,
    SearchComponent,
    DialogOverviewComponent,
    ErrorComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    UploadModule,
    AngularMaterialModule
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
               {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
               { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
             ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }

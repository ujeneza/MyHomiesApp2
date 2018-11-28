import { AuthInterceptor } from './auth/auth-interceptor';
import { AppRoutingModule } from './app.routes';
import { QuestionableBooleanPipe } from './pipes/boolean-to-text';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatAutocompleteModule,

  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
  } from '@angular/material';

  import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResidentsComponent } from './residents/residents.component';
import { ResidentCreateComponent } from './residents/resident-create/resident-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResidentViewComponent } from './residents/resident-view/resident-view.component';
import { CommonModule } from '@angular/common';
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
import { from } from 'rxjs';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';


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
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    UploadModule,
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { AppRoutingModule } from './app.routes';
import { QuestionableBooleanPipe } from './pipes/boolean-to-text';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
  } from '@angular/material';

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
    UploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

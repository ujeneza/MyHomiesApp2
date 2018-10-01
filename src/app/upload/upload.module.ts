import { UploadService } from './upload.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MatButtonModule,
       MatDialogModule,
       MatListModule,
       MatProgressBarModule,
       MatAutocompleteModule,
       MatBadgeModule,
       MatBottomSheetModule,
       MatButtonToggleModule,
       MatCardModule,
       MatCheckboxModule,
       MatChipsModule,
       MatDatepickerModule,
       MatDividerModule,
       MatExpansionModule,
       MatGridListModule,
       MatIconModule,
       MatInputModule,
       MatMenuModule,
       MatNativeDateModule,
       MatPaginatorModule,
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
       MatFormFieldModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
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

  ],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService]
})
export class UploadModule { }

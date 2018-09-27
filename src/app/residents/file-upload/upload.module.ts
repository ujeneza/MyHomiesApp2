import { ContractInfoComponent } from './../contract-info/contract-info.component';
import { FileUploadComponent } from './file-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileService } from './../../services/file.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule],
  declarations: [FileUploadComponent, ContractInfoComponent],
  exports: [ContractInfoComponent],
  entryComponents: [FileUploadComponent], // Add the DialogComponent as entry component
  providers: [FileService]
})
export class UploadModule {}

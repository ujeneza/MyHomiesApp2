import { Subscription } from 'rxjs';
import { FileResident } from './../app-models/residant-data-models/file-resisent.models';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  fileResidents: FileResident[] = [];
  fileResidentsSub: Subscription;
  fileResident: FileResident;

  @Input()
  fieldNameFront: string;
  @Input()
  labelName: string;
  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService,
    public router: Router,
  ) {}

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { file: this.fileResident, name: this.fieldNameFront, label: this.labelName },
      width: '50%',
      height: '50%'
    });

  dialogRef.componentInstance.uploadService.getAllFileResidents();
    this.fileResidentsSub = this.uploadService
      .getFileResidentUpdateListener()
      .subscribe((fileResidents: FileResident[]) => {
        this.fileResidents = fileResidents;
      });
  }
 // Delete one fileResident
  onDelete(fileResidentId: string) {
    this.uploadService.deleteFileResident(fileResidentId);
  }

  // Download file

  downloadFileResident(filePath: string) {
    this.uploadService.downloadFileResident(filePath).subscribe(
      data => saveAs(data, filePath),
      err => {
        console.log('Problem while downloading the file.');
        console.error(err);
      }
    );
  }
  /*
 downloadFileResident(id: string) {
    this.uploadService
      .downloadFileResident(id)
      .subscribe(data => saveAs(data, id), error => console.error(error));
  } */

 /*  downloadFileResident(index) {
    const filePath = this.fileResidents[index].filePath;
    this.uploadService
      .downloadFileResident(filePath)
      .subscribe(data => saveAs(data, filePath), error => console.error(error));
  } */


}

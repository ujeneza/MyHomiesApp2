import { FileResident } from './../../app-models/residant-data-models/file-resisent.models';
import { Component, OnInit, ViewChild, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  fileResidents: FileResident[] = [];
  private fileResidentsSub: Subscription;
 @ViewChild('file') file;
 @Input()
 fieldNameFront: string;
 @Input() residentIdFile: string;

  public files: Set<File> = new Set();
  @Output() private childEvent = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              public uploadService: UploadService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }



  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
     console.log(this.data.name + 'log this.data');
    for (const key in files) {
      // tslint:disable-next-line:radix
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialogdelete() {
    this.closeDialog2();
  }

  closeDialog2() {
    this.uploadService.getAllFileResidents();
    this.fileResidentsSub = this.uploadService.getFileResidentUpdateListener().subscribe(
      (fileResidents: FileResident[]) => {
        this.fileResidents = fileResidents;
      }
    );
  }


  closeDialog() {
    this.childEvent.emit(this.file);
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      this.closeDialog2();
      return ( this.dialogRef.close());
    }


    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files, this.data.name, this.data.residentIdFile);
    console.log(this.progress);
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    const allProgressObservables = [];
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });

  }

}

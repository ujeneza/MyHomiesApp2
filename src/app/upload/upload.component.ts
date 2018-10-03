import { map } from 'rxjs/operators';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileResident } from './../app-models/residant-data-models/file-resisent.models';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  fileResidents: FileResident[] = [];
  fileResident: FileResident;
  private fileResidentsSub = Subscription;

  @Input()
  file: string;
  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { file: this.fileResident, name: 'Contract' },
      width: '50%',
      height: '50%'
    });
    dialogRef.afterClosed().subscribe(fileResidentData => {
      this.fileResidents = fileResidentData;
      console.log('The dialog was closed');
    });
  }
  // Get one resident:

  addFiles() {

  }
  getFileResidentId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.uploadService
      .getFileResident(id)
      .subscribe(fileResident => (this.fileResident = fileResident));
    console.log(id);
  }

  // Delete one fileResident
  onDelete(fileResidentId: string) {
    const id  = document.getElementById;
    console.log(id);
    this.uploadService.deleteFileResident(fileResidentId);
  }

 /*  onCloseDialog() {
    this.uploadService.getAllFileResidents();
    this.fileResidentsSub = this.uploadService
      .getFileResidentUpdateListener()
      .map()
      .subscribe((fileResidents: FileResident[]) => {
        this.fileResidents = fileResidents;
      });
  } */
}

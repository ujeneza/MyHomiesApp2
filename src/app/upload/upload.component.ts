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
  private fileResidentsSub: Subscription;

  @Input()
  file: string;
  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { file: 'contract', name: 'Contract' },
      width: '50%',
      height: '50%'
    });
  }

  onCloseDialog() {
    this.uploadService.getFileResidents();
    this.fileResidentsSub = this.uploadService.getFileResidentUpdateListener().subscribe(
      (fileResidents: FileResident[]) => {
        this.fileResidents = fileResidents;
      }
    );
  }
}

import { ActivatedRoute } from '@angular/router';
import { UploadService } from './../../upload/upload.service';
import { Subscription } from 'rxjs';
import { FileResident } from './../../app-models/residant-data-models/file-resisent.models';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-resident-files',
  templateUrl: './resident-files.component.html',
  styleUrls: ['./resident-files.component.scss']
})
export class ResidentFilesComponent implements OnInit {
  fieldNameFront: string;
  fileResidents: FileResident[] = [];
  fileResidentsSub: Subscription;

  constructor( public route: ActivatedRoute,
    public uploadService: UploadService) { }

  ngOnInit() {
    this.getAllFileResidents();
  }

  // get all files from the backend
  getAllFileResidents() {
    this.uploadService.getAllFileResidents();
    this.fileResidentsSub = this.uploadService
    .getFileResidentUpdateListener()
    .subscribe(
      (fileResidents: FileResident[]) => {
        this.fileResidents = fileResidents;
      }
    );
    console.log(this.fileResidents);
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

}

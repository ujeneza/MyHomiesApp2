import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from './../../upload/upload.service';
import { Subscription } from 'rxjs';
import { FileResident } from './../../app-models/residant-data-models/file-resisent.models';
import { Component, OnInit, Input } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-resident-files',
  templateUrl: './resident-files.component.html',
  styleUrls: ['./resident-files.component.scss']
})
export class ResidentFilesComponent implements OnInit {
  fieldNameFront: string;
  @Input() residentIdFile: string;
  fileResidents: FileResident[] = [];
  fileResidentsSub: Subscription;
  globalId: string;

  constructor(
    public route: ActivatedRoute,
    public uploadService: UploadService,
    private router: Router,

  ) {}

  ngOnInit() {
    this.getAllFileResidents();
    this.getResidentIdFile();
  }

  // get resident ID for filtering the documents
  getResidentIdFile() {
    const id = this.route.snapshot.paramMap.get('id');
    this.globalId = id;
  }

  // get all files from the backend
  getAllFileResidents() {
    this.uploadService.getAllFileResidents();
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

  residentDataControl() {
    this.router.navigate(['/residents']);
  }
}

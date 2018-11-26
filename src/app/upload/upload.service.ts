import { HttpHeaders } from '@angular/common/http';
import { FileResident } from './../app-models/residant-data-models/file-resisent.models';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Subject, Observable, identity } from 'rxjs';

const url = 'http://localhost:3000/api/file/';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private fileResidents: FileResident[] = [];
  private fileResidentsUpdate = new Subject<FileResident[]>();
  constructor(private http: HttpClient) {}

  public upload(files: Set<File>, fieldNameFront, residentIdFile): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('fieldNameFront', fieldNameFront);
      formData.append('residentIdFile', residentIdFile);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  // get all files
  getAllFileResidents() {
    this.http
      .get<{ message: string; fileResidents: any }>(url)
      .pipe(
        map(fileResidentData => {
          return fileResidentData.fileResidents.map(fileResident => {
            return {
              id: fileResident ._id,
              name: fileResident.name,
              lastModifiedDate: fileResident.lastModifiedDate,
              filePath: fileResident.filePath,
              fieldNameFront: fileResident.fieldNameFront,
              residentIdFile: fileResident.residentIdFile
            };
          });
        })
      )
      .subscribe(transformedFileResidents => {
        this.fileResidents = transformedFileResidents;
        this.fileResidentsUpdate.next([...this.fileResidents]);
        // this.router.navigate(['appartments']);
      });
  }

  // listener
  getFileResidentUpdateListener() {
    return this.fileResidentsUpdate.asObservable();
  }

/*   // get on file
  getFileResident(id: string) {
    return this.http.get<FileResident>(url + id);
  } */

  // Delete a file using ID

  deleteFileResident(fileResidentId: string) {
    this.http.delete(url + fileResidentId).subscribe(() => {
      const updatedFileResidents = this.fileResidents.filter(
        fileResident => fileResident.id !== fileResidentId
      );
      this.fileResidents = updatedFileResidents;
      this.fileResidentsUpdate.next([...this.fileResidents]);
    });
  }

  // delete file using ResidentID

  deleteFileResidentUsingResidentId(fileResidentId: string) {
    this.http.delete(url + 'residentFile/' + fileResidentId).subscribe(() => {
      const updatedFileResidents = this.fileResidents.filter(
        fileResident => fileResident.id !== fileResidentId
      );
      this.fileResidents = updatedFileResidents;
      this.fileResidentsUpdate.next([...this.fileResidents]);
    });
  }

  // download fileresident

  downloadFileResident(filePath): Observable <any> {
    const body = { filePath: filePath};
    return this.http.get('http://localhost:3000/api/file/' + body.filePath, {
      responseType : 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

 /*  downloadFileResident(id: string) {
    const body = { id: id};
    return this.http.post(url + 'downlaod', body, {
      responseType : 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  } */

/* downloadFileResident(filePath) {
    const body = { filePath: filePath};
    return this.http.post(url + 'downlaod', body, {
      responseType : 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  } */
}

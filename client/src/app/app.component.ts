import { Component, ViewChild } from '@angular/core';

import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import saveAs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private http: HttpClient
  ) { }

  fileNameToDownload: string = '';
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        console.log("FILE : ", files[key]);
        this.files.add(files[key]);

        const formData: FormData = new FormData();
        formData.append('file', files[key], files[key].name);

        const url = "http://localhost:3000/file/upload"
        const req = new HttpRequest('POST', url, formData, {
          reportProgress: true
        });

        this.http.request(req)
          .subscribe(res => {
            console.log("FILE ADD RESPONSE");
          });
      }
    }
  }

  title = 'client';
}

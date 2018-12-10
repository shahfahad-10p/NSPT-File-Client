import { Component, ViewChild } from '@angular/core';

import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { servers, endpoints } from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private http: HttpClient
  ) { }

  handleFileInput(file) {
    let selectedFile: File = file[0];
    let fr = new FileReader();

    fr.onloadend = (e) => {
      let fileToSend = fr.result;

      let payload = {
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        base64: fileToSend
      }

      this.http.post(`${servers.nameServerUrl}${endpoints.upload}`, payload)
        .subscribe(res => {
          console.log(res);
        });
    }

    fr.readAsDataURL(selectedFile);
  }

}

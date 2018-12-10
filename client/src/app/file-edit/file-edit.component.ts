import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { servers, endpoints} from '../common/constants';

@Component({
	selector: 'app-file-edit',
	templateUrl: './file-edit.component.html'
})
export class FileEditComponent {

	editFileContent: string;
	editFileName: string;

	constructor(
		private http: HttpClient
	) { }

	downloadFile(fileName: String) {
		if (!fileName) return;

		var body = { fileName: fileName };

		this.http.post(`${servers.nameServerUrl}${endpoints.download}`, body, {
			responseType: 'blob',
			headers: new HttpHeaders().append('Content-Type', 'application/json')
		}).subscribe(data => {
			saveAs(data, fileName);
		});
	}

	downloadTextFile(fileName: String) {
		if (!fileName) return;

		var body = { fileName: fileName };

		this.http.post(`${servers.nameServerUrl}${endpoints.downloadTextFile}`, body, {
			headers: new HttpHeaders().append('Content-Type', 'application/json')
		}).subscribe((data: any) => {
			this.editFileContent = data.file;
			this.editFileName = data.fileName;
		});
	}

	saveFile(fileName, fileContent) {

		var blob = new Blob([fileContent], {
			type: "text/plain;charset=utf-8"
		});

		let fr = new FileReader();
		fr.onloadend = (e) => {
			let fileToUpdate = fr.result;

			let payload = {
				fileName: this.editFileName,
				fileType: "text/plain",
				base64: fileToUpdate
			}

			this.http.post("http://localhost:3000/file/upload", payload)
				.subscribe(res => {
					console.log(res);
					this.editFileContent = this.editFileName = undefined;
				});
		}
		fr.readAsDataURL(blob);
	}

}

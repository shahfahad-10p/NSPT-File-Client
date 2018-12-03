import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-file-edit',
	templateUrl: './file-edit.component.html'
})
export class FileEditComponent {

	fileContent: string;

	constructor(
		private http: HttpClient
	) { }

	downloadFile(fileName: String) {
		if (!fileName) return;

		var body = { filename: fileName };

		this.http.post('http://localhost:3000/file/download', body, {
			responseType: 'blob',
			headers: new HttpHeaders().append('Content-Type', 'application/json')
		}).subscribe(data => {
			let fr = new FileReader();
			fr.readAsText(data);
			fr.onload = () => {
				setTimeout(() => {
					this.fileContent = fr.result;
					console.log('FILE CONTENT : ', this.fileContent);
				}, 100);

			}
			// saveAs(data, 'file.txt');
		});
	}

}

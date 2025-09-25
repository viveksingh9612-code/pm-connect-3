import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  baseUrl: string = "";
  
  constructor(private http: HttpClient) {
    this.baseUrl  = environment.baseApiUrl;
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match the backend field name

    return this.http.post(this.baseUrl + 'fileUpload/upload', formData);
  }

  updateFile(fileId: string, formData: FormData): Observable<any> {
    return this.http.put(this.baseUrl + `fileUpload/update/${fileId}`, formData);
  }

  updateProfilePicture(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + `fileUpload/upload-profile`, formData);
  }

  getFile(fileId: string, fileType: string): Observable<any> {
    return this.http.get(this.baseUrl + `fileUpload/file/${fileId}`+ '?type=' + fileType);
  }
}

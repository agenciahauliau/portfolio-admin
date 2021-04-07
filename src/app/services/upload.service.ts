import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  public upload(file: File): Observable<HttpEvent<any>> {
    let uploadURL = `${environment.API}files/upload`;
    const formData: FormData = new FormData();
    formData.append('files', file);
    const req = new HttpRequest('POST', uploadURL, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${environment.API}files`).pipe(
      map((event: any) => {
        console.log(event);
        return event;
      }),
    );
  }
}
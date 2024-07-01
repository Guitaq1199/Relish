import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  //This should be in the configuration file
  private baseUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getPhotos(title?: string, album?: string, userEmail?: string, offset?:number, limit?:number): Observable<any[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    if (album) {
      params = params.set('album.title', album);
    }
    if (userEmail) {
      params = params.set('album.user.email', userEmail);
    }
    if(offset){
      params = params.set('offset', offset);
    }
    if(limit){
      params = params.set('limit', limit);
    }

    const url = `${this.baseUrl}/Photo`;

    return this.http.get<any[]>(url, { params: params });
  }
}

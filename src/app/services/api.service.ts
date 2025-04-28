import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/units'; // Your backend URL

  constructor(private http: HttpClient) { }
  getUnits() {
    return this.http.get(this.apiUrl);
  }
}

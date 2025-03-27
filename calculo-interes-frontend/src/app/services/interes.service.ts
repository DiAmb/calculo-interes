import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InteresService {
  private apiURL = 'http://localhost:8080/api/interes/calcular';
  constructor(private http: HttpClient) {}
  calcularInteres(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL, data);
  }
}

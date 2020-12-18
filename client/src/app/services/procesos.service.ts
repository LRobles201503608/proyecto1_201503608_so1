import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  constructor(private http:HttpClient) { }

  GetValues() {
     return this.http.get("http://localhost:3000/procesos");
  }
}

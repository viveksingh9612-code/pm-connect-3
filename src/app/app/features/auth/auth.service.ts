import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl  = environment.baseApiUrl;
  }

  userLogin(username: string, password: string) {
    // Implement login logic here, e.g., make an HTTP request to your backend

    return this.http.post(this.baseUrl + 'user/login', { username, password })
  }

  // ...existing methods
}
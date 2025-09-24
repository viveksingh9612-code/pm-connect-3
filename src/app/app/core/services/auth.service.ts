import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getUserData() {
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.get(this.baseUrl + 'user/me', headers ? { headers } : {});
  }

  bulkSignUp(users: any[]) {
    console.log('Signing up users:', users);

    return this.http.post(this.baseUrl + 'user/bulk-signup', users);
  }

  getAllUsers() {
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.get(this.baseUrl + 'user/all', headers ? { headers } : {});
  }

  verifyToken() {
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.post(this.baseUrl + 'token/verify', {}, { headers });
  }

  addUserPreference(preferences: any) {
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.post(this.baseUrl + 'userPreference/', preferences, { headers });
  }

  getUserPreference() {
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.get(this.baseUrl + 'userPreference/', { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly APIUrl = 'https://localhost:7201/api';

  constructor(private http: HttpClient) {}

  // Helper: Gắn token vào headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Lấy danh sách tài khoản
  layDSTaiKhoan(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/User/get-users`, {
      headers: this.getAuthHeaders()
    });
  }

  // Thêm tài khoản
  themTaiKhoan(val: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/User/add-user`, val, {
      headers: this.getAuthHeaders()
    });
  }

  // Sửa tài khoản
  suaTaiKhoan(id: number,val: any): Observable<any> {
    const body = {
      username: val.username,
      password: val.password,
      role: val.role
    };
    return this.http.put<any>(`${this.APIUrl}/User/update-user/${id}`, body, {
      headers: this.getAuthHeaders(),
      
    });
  }

  // Xoá tài khoản
  xoaTaiKhoan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/User/delete-user/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/User/get-user-by-id/${id}`);
  }
}

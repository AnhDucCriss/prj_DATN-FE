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

  //#region quản lý tài khoản
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
  suaTaiKhoan(id: string,val: any): Observable<any> {
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
  xoaTaiKhoan(id: string): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/User/delete-user/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/User/get-user-by-id/${id}`);
  }
  //#endregion
  //#region quản lý bệnh nhân tài khoản


  layDSbenhnhan(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/patient/get-patients`, {
      headers: this.getAuthHeaders()
    });
  }

  // Thêm bệnh nhân
  themBenhNhan(val: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/patient/create`, val, {
      headers: this.getAuthHeaders()
    });
  }

  // Sửa tài khoản
  suabenhNhan(id: string,val: any): Observable<any> {
    const body = {
      username: val.username,
      password: val.password,
      role: val.role
    };
    return this.http.put<any>(`${this.APIUrl}/patient/update/${id}`, body, {
      headers: this.getAuthHeaders(),
      
    });
  }

  // Xoá tài khoản
  xoaBenhNhan(id: string): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/patient/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  getPatientById(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/patient/get-patient-by-id/${id}`);
  }
  //#endregion
  //#region quản lý nhân viên
  layDSNhanVien(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/Staff/get-all`, {
      headers: this.getAuthHeaders()
    });
  }

  // Thêm tài khoản
  themNhanVien(val: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/Staff/create`, val, {
      headers: this.getAuthHeaders()
    });
  }

  // Sửa tài khoản
  suaNhanVien(id: string,val: any): Observable<any> {
    const body = {
      fullName: val.fullName,
      gender: val.gender,
      phone: val.phone,
      email: val.email,
      position: val.position,
    };
    return this.http.put<any>(`${this.APIUrl}/Staff/update/${id}`, body, {
      headers: this.getAuthHeaders(),
      
    });
  }

  // Xoá tài khoản
  xoaNhanVien(id: string): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/Staff/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  getStaffById(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/Staff/get-by-id/${id}`);
  }
  //#endregion

}

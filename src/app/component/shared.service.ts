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


  getPatientList(pageNumber: any) {
    return this.http.post<any>(`${this.APIUrl}/patient/get-all`, pageNumber, {
      headers: this.getAuthHeaders()
    });
  }

  // Tìm kiếm bệnh nhân theo tên + phân trang
  searchPatient(filter: any) {
    return this.http.post<any>(`${this.APIUrl}/patient/search`, filter, {
      headers: this.getAuthHeaders()
    });
  }

  // Xóa bệnh nhân theo id
  deletePatient(id: string) {
    return this.http.delete<any>(`${this.APIUrl}/patient/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
 
  themBenhNhan(val: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/patient/create`, val, {
      headers: this.getAuthHeaders()
    });
  }

  // Sửa bệnh nhân
  suaBenhNhan(id: string,val: any): Observable<any> {
    const body = {
      fullName: val.fullName,
      gender: val.gender,
      age: val.age,
      phone: val.phone,
      address: val.address,
      email: val.email,
    };
    return this.http.put<any>(`${this.APIUrl}/patient/update/${id}`, body, {
      headers: this.getAuthHeaders(),
      
    });
  }
  
  getPatientById(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/patient/get-patient-by-id/${id}`, {
      headers: this.getAuthHeaders()
    });
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
    return this.http.get<any>(`${this.APIUrl}/Staff/get-by-id/${id}`, {
      headers: this.getAuthHeaders(),
      
    });
  }
  getStaffByName(body: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/Staff/search`, body, {
      headers: this.getAuthHeaders(),
      
    });
  }
  
  getStaff( page: number,) {
    const params = {
     
      pageNumber: page,

    };
    const headers = this.getAuthHeaders(); // thường là HttpHeaders
    return this.http.get<any>(`${this.APIUrl}/Staff/get-all?`, { params, headers }, );
  }
  
  //#endregion

  //#region Quản lý kho thuốc
  // Lấy danh sách thuốc với phân trang
  getMedicineList(page: number, pageSize: number = 10): Observable<any> {
    const body = {
      pageNumber: page,
      pageSize: pageSize
    };
  
    return this.http.post<any>(`${this.APIUrl}/Medicine/get-all`, body, {
      headers: this.getAuthHeaders(),
    });
  }
  
  suaThuoc(id: string, updatedThuoc: any): Observable<any> {
    return this.http.put<any>(`${this.APIUrl}/Medicine/update/${id}`, updatedThuoc, {
      headers: this.getAuthHeaders()
    });
  }

  // Tìm kiếm thuốc theo tên và hoạt chất
  searchMedicine(body: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/Medicine/search`, body, {
      headers: this.getAuthHeaders(),
      
    });
  }

  // Xoá thuốc theo ID
  deleteMedicine(id: string): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/Medicine/delete/${id}`, {
      headers: this.getAuthHeaders(),
      
    });
  }

  themThuoc(data: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/Medicine/create', data, {
      headers: this.getAuthHeaders(),
      
    });
  }
  getAllMedicineName(): Observable<any> {
    return this.http.get<any[]>(this.APIUrl + '/Medicine/get-all-name', {   
      headers: this.getAuthHeaders(),
    }
    )
  }
  //#endregion

  //#region Quản lý hồ sơ khám bệnh
  

  // Xoá hồ sơ theo ID
  deleteMedicalRecord(medicalRecordId: string): Observable<any> {
    return this.http.delete(`${this.APIUrl}/MedicalRecord/delete/${medicalRecordId}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // (Tuỳ chọn) Lấy chi tiết hồ sơ khám bệnh
  getById(id: string): Observable<any> {
    return this.http.get(`${this.APIUrl}/${id}`);
  }

  // (Tuỳ chọn) Tạo hồ sơ mới
  themHSKB(val: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/MedicalRecord/create`, val, {
      headers: this.getAuthHeaders()
    });
  }
  getMedicalRecordsByPatientId(patientId: string, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.post(`${this.APIUrl}/MedicalRecord/get-by-patientId/${patientId}`, {
      pageNumber,
      pageSize
    }, {
      headers: this.getAuthHeaders()
    });
  }

  searchMedicalRecordsByPatientId(patientId: string, body: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/MedicalRecord/search/${patientId}`, body, {
      headers: this.getAuthHeaders()
    });
  } 

  // (Tuỳ chọn) Cập nhật hồ sơ
  suaHSKhamBenh(id: string, data: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/MedicalRecord/update/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  //#endregion

  
  getPrescriptionByMRID(medicalReocordId: string): Observable<any> {
    return this.http.get(`${this.APIUrl}/Prescription/${medicalReocordId}`, {
      headers: this.getAuthHeaders()
    });
  }
  
  themDonThuoc(val: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/Prescription/create`, val, {
      headers: this.getAuthHeaders()
    });
  }

  updatePrescriptionDetails(data: any) {
    return this.http.post<any>(`${this.APIUrl}/Prescription/update-details`, data, {
      headers: this.getAuthHeaders()
    });
  }

  exportPrescription(medicalRecordId: string) {
    return this.http.get(`${this.APIUrl}/Prescription/export-pdf/${medicalRecordId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob' // 👈 bắt buộc để nhận file PDF
    });
  }

}

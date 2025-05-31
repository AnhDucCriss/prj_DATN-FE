import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MedicalRecordsData {
  totalRecords: number[];
  uniquePatients: number[];
  months: string[];
}

export interface SalesStats {
  totalStaff: number;
  totalDoctors: number;
  totalPatients: number;
  totalRecords: number;
}
export interface RevenueStatsResponse {
  totalRevenuePaid: number;
  totalRevenueUnpaid: number;
  totalInvoicesPaid: number;
  totalInvoicesUnpaid: number;
}
@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private apiUrl = 'https://localhost:7201/api'; 

  constructor(private http: HttpClient) { }

  getMedicalRecordsData(): Observable<MedicalRecordsData> {
    return this.http.get<MedicalRecordsData>(`${this.apiUrl}/Dashboard/medical-records-data`);
  }

  getStats(): Observable<SalesStats> {
    return this.http.get<SalesStats>(`${this.apiUrl}/Dashboard/stats`); // Sửa endpoint để khớp với controller
  }

  getRevenueStats(fromDate?: string, toDate?: string): Observable<RevenueStatsResponse> {
    let params = new HttpParams();
    
    if (fromDate && toDate) {
      params = params.set('fromDate', fromDate);
      params = params.set('toDate', toDate);
    } else if (fromDate && !toDate) {
      params = params.set('fromDate', fromDate);
    } else if (!fromDate && toDate) {
      params = params.set('toDate', toDate);
    }
    
    
    return this.http.get<RevenueStatsResponse>(`${this.apiUrl}/Dashboard/revenue-stats`, { params });
  }
}

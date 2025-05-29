import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
  RevenueStatsResponse, 
  RevenueStatsDisplay, 
  mapRevenueStatsToDisplay 
} from './top-selling-data';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

 revenueStats: RevenueStatsDisplay[] = [];
  loading: boolean = false;
  error: string = '';
  
  // Date filters
  fromDate: string = '';
  toDate: string = '';

  constructor(private http: HttpClient, private service: DashboardService) { }

  ngOnInit(): void {
    this.loadRevenueStats();
  }

  loadRevenueStats(): void {
    this.loading = true;
    this.error = '';

    // Tạo params cho API call
    let params: any = {};
    if (this.fromDate) {
      params.fromDate = this.fromDate;
    }
    if (this.toDate) {
      params.toDate = this.toDate;
    }

    // Gọi API
    this.service.getRevenueStats(params.fromDate,params.toDate)
      .subscribe({
        next: (response) => {
          this.revenueStats = mapRevenueStatsToDisplay(response);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading revenue stats:', error);
          this.error = 'Không thể tải dữ liệu thống kê doanh thu';
          this.loading = false;
        }
      });
  }

  onDateFilterChange(): void {
    this.loadRevenueStats();
  }

  clearDateFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.loadRevenueStats();
  }

}

import { Component, OnInit } from '@angular/core';
import { topcard } from './top-cards-data';
import { DashboardService, SalesStats } from '../../dashboard.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: topcard[] = [];

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.service.getStats().subscribe({
      next: (stats: SalesStats) => {
        this.topcards = [
          {
            bgcolor: 'success',
            icon: 'bi bi-person-badge',
            title: stats.totalStaff.toString(),
            subtitle: 'Tổng số nhân viên'
          },
          {
            bgcolor: 'danger',
            icon: 'bi bi-person-fill-add',
            title: stats.totalDoctors.toString(),
            subtitle: 'Tổng số bác sĩ'
          },
          {
            bgcolor: 'warning',
            icon: 'bi bi-person-fill-check',
            title: stats.totalPatients.toString(),
            subtitle: 'Tổng số bệnh nhân'
          },
          {
            bgcolor: 'info',
            icon: 'bi bi-file-medical-fill',
            title: stats.totalRecords.toString(),
            subtitle: 'Tổng số hồ sơ khám bệnh'
          }
        ];
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        // Có thể hiển thị thông báo lỗi cho người dùng
        this.topcards = []; // hoặc giữ dữ liệu mặc định
      }
    });
  }
}
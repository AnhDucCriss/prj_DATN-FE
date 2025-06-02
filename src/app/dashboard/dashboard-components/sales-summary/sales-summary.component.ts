import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid
} from 'ng-apexcharts';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService, MedicalRecordsData } from '../../dashboard.service';


export type medicalRecordsChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
};

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html'
})
export class SalesSummaryComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  private destroy$ = new Subject<void>();
  public isLoading = true;
  public hasError = false;

  public medicalRecordsChartOptions: Partial<medicalRecordsChartOptions> = {
    series: [],
    chart: {
      fontFamily: 'Nunito Sans,sans-serif',
      height: 300,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    grid: {
      strokeDashArray: 3,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      min: 0, // Thêm dòng này để đảm bảo trục Y bắt đầu từ 0
      forceNiceScale: true, // Thêm để tự động làm tròn scale
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      theme: 'dark'
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right'
    },
    colors: ['#28a745', '#17a2b8'],
    markers: {
      size: 4
    }
  };

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadMedicalRecordsData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMedicalRecordsData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.service.getMedicalRecordsData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MedicalRecordsData) => {
          this.updateChartData(data);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading medical records data:', error);
          this.hasError = true;
          this.isLoading = false;
          this.loadDefaultData();
        }
      });
  }

  private updateChartData(data: MedicalRecordsData): void {
    this.medicalRecordsChartOptions = {
      ...this.medicalRecordsChartOptions,
      series: [
        {
          name: "Tổng số hồ sơ khám",
          data: data.totalRecords,
        },
        
      ],
      xaxis: {
        ...this.medicalRecordsChartOptions.xaxis,
        categories: data.months,
      }
    };
  }

  private loadDefaultData(): void {
    // Tạo dữ liệu mặc định cho 6 tháng với format mới
    const currentDate = new Date();
    const months = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
    }

    const defaultData: MedicalRecordsData = {
      totalRecords: [45, 52, 38, 67, 73, 58],
      uniquePatients: [38, 45, 32, 55, 62, 49],
      months: months
    };
    this.updateChartData(defaultData);
  }

  public refreshData(): void {
    this.loadMedicalRecordsData();
  }
}
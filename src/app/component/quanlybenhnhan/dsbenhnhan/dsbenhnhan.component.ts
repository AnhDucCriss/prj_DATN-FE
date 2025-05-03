import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dsbenhnhan',
  templateUrl: './dsbenhnhan.component.html',
  styleUrls: ['./dsbenhnhan.component.scss']
})
export class DsbenhnhanComponent implements OnInit {
  constructor(private service: SharedService, private router: Router) {}

  DSBenhNhan: any = {
    items: [],
    totalRecords: 0,
    pageNumber: 1,
    pageSize: 10
  };

  tenBenhNhanTimKiem: string = '';
  soDTBenhNhan: string = '';
  totalRecords: number = 0;
  totalPages: number = 1;
  pageNumber: number = 1;
  pageSize: number = 10;
  pages: number[] = [];

  ngOnInit(): void {
    this.taiLaiDSBenhNhan(); // tải lần đầu
  }

  generatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  taiLaiDSBenhNhan(page: number = 1): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
  
      const body = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
  
      this.service.getPatientList(body).subscribe({
        next: (data) => {
          this.DSBenhNhan = data;
          this.totalRecords = data.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.generatePages();
        },
        error: (err) => {
          console.error('Lỗi tải danh sách bệnh nhân', err);
        }
      });
    }
  }

  timKiemBenhNhan(): void {
    const body = {
      patientName: this.tenBenhNhanTimKiem,
      phoneNumber: this.soDTBenhNhan,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this.service.searchPatient(body).subscribe({
      next: (res) => {
        this.DSBenhNhan = res;
        this.pageNumber = res.pageNumber;
        this.totalPages = Math.ceil(res.totalRecords / res.pageSize);
      },
      error: (err) => {
        console.error('Lỗi tìm kiếm bệnh nhân', err);
      }
    });
  }

  xoaBenhNhan(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xoá bệnh nhân này không?')) {
      this.service.deletePatient(id).subscribe(res => {
        alert(res.message);
        this.taiLaiDSBenhNhan(this.pageNumber);
      });
    }
  }

  convertGender(gender: number): string {
    return gender === 0 ? 'Nam' : gender === 1 ? 'Nữ' : 'Khác';
  }

  dangSua: boolean = false;
  benhNhanDangSua: any = null;

  chonBenhNhanDeSua(bn: any): void {
    this.benhNhanDangSua = bn;
    this.dangSua = true;
    console.log(this.benhNhanDangSua);
  }

  dongModalSua(): void {
    this.dangSua = false;
    console.log('Đóng modal sửa');
  }

  goToMedicalRecord(patientId: number) {
    this.router.navigate(['hoso-khambenh', patientId]);// Đường dẫn tuỳ bạn đặt trong routing
  }
}

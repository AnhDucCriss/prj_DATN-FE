import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-dshskhambenh',
  templateUrl: './dshskhambenh.component.html',
  styleUrls: ['./dshskhambenh.component.scss']
})
export class DshskhambenhComponent implements OnInit {
  patientId: string = '';
  fullName: string = '';

  // Danh sách hồ sơ
  danhSachHSKB: any = {
    items: [],
    totalPages: 0
  };

  // Phân trang
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  // Tìm kiếm
  doctorName: string = '';
  ngayKham: string = '';
  dangSua: boolean = false;
  HSDangSua: any = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SharedService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';

    this.route.queryParams.subscribe(params => {
      this.fullName = params['name'] || '';
    });

    this.taiLaiDanhSach();
  }

  taiLaiDanhSach(page: number = 1): void {
    this.pageNumber = page;
      
    this.service.getMedicalRecordsByPatientId(this.patientId, this.pageNumber,5)
      .subscribe(res => {
      this.danhSachHSKB.items = res.items;
      this.danhSachHSKB.totalRecords = res.totalRecords;
      this.totalPages = Math.ceil(res.totalRecords / res.pageSize);
    });
  }

  timKiemHSKB(): void {
    const body = {
      doctorName: this.doctorName,
      examinationDate: this.ngayKham ? new Date(this.ngayKham).toISOString() : null,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this.service.searchMedicalRecordsByPatientId(this.patientId,body).subscribe({
      next: (res) => {
        this.danhSachHSKB = res;
        this.pageNumber = res.pageNumber;
        this.totalPages = Math.ceil(res.totalRecords / res.pageSize);
      },
      error: (err) => {
        console.error('Lỗi tìm kiếm bệnh nhân', err);
      }
    });
  }

  suaHSKB(medicalRecordId: string, hs: any): void {
    this.HSDangSua = hs;
    this.dangSua = true;
    console.log(this.HSDangSua);
  }
  xemChiTiet(medicalRecordId: string): void {
    this.router.navigate([`/hoso-khambenh/chi-tiet`, medicalRecordId]);
  }

  xoaHSKB(medicalRecordId: string): void {
    if (confirm('Bạn có chắc muốn xoá hồ sơ này?')) {
      this.service.deleteMedicalRecord(medicalRecordId).subscribe(() => {
        alert('Xoá thành công');
        this.taiLaiDanhSach(this.pageNumber);
      });
    }
  }

  goToInvoice(hsId: string) {
    this.router.navigate(['hoadon', hsId])
  }
  goToPresciption(hsId: string) {
    this.router.navigate(['donthuoc', hsId])
  }

  dongModalSua(): void {
    this.dangSua = false;
    console.log('Đóng modal sửa');
  }

}

import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-dsthuoc',
  templateUrl: './dsthuoc.component.html',
  styleUrls: ['./dsthuoc.component.scss']
})
export class DsthuocComponent {
  constructor(private service: SharedService) {}

  DSThuoc: any = {
    items: [],
    totalRecords: 0,
    pageNumber: 1,
    pageSize: 10
  };

  tenThuocTimKiem: string = '';
  loaiThuocTimKiem: string = '';
  totalRecords: number = 0;
  totalPages: number = 1;
  pageNumber: number = 1;
  pageSize: number = 10;
  pages: number[] = [];

  ngOnInit(): void {
    this.loadThuoc();  // Tải danh sách thuốc ban đầu
  }

  generatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  loadThuoc(page: number = 1) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;

      this.service.getMedicineList(this.pageNumber).subscribe({
        next: (data) => {
          this.DSThuoc = data;
          this.totalRecords = data.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        },
        error: (err) => {
          console.error('Lỗi tải danh sách thuốc', err);
        }
      });
    }
  }

  timKiemThuoc(): void {
    const body = {
      medicineName: this.tenThuocTimKiem,
      category: this.loaiThuocTimKiem,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this.service.searchMedicine(body).subscribe({
      next: (res) => {
        this.DSThuoc = res;
        this.pageNumber = res.pageNumber;
        this.totalPages = Math.ceil(res.totalRecords / res.pageSize);
      },
      error: (err) => {
        console.error('Lỗi tìm kiếm thuốc', err);
      }
    });
  }

  xoaThuoc(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xoá thuốc này không?')) {
      this.service.deleteMedicine(id).subscribe(res => {
        alert(res.message);
        this.loadThuoc(this.pageNumber);
      });
    }
  }

  dangSua: boolean = false;
  thuocDangSua: any = null;

  chonThuocDeSua(thuoc: any) {
    this.thuocDangSua = thuoc;
    this.dangSua = true;
    console.log(this.thuocDangSua);
  }
  
  dongModalSua() {
    this.dangSua = false;
    console.log(this.dangSua);
  }
}

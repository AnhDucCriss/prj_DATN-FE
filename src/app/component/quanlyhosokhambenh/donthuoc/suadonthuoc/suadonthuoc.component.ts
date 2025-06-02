import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { SharedService } from '../../../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suadonthuockhambenh',
  templateUrl: './suadonthuoc.component.html'
})
export class SuaDonThuocComponent implements AfterViewInit {
  @Input() danhSachThuoc: any[] = [];
  @Input() medicalRecordId!: string;
  @Output() dong = new EventEmitter<void>();
  @Output() taiLai = new EventEmitter<void>();

  @ViewChild('modalRef') modalRef!: ElementRef;

  danhSachMedicine: any[] = [];

  constructor(
    private service: SharedService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    // Tự động focus hoặc thực hiện logic khi modal hiển thị (nếu cần)
    // Có thể thêm logic nếu dùng Bootstrap modal JS (nếu cần)
  }

  ngOnInit() {
    this.service.getAllMedicineName().subscribe({
      next: (res) => {
        this.danhSachMedicine = res;

        // Gán medicineId nếu chưa có
        this.danhSachThuoc.forEach(thuoc => {
          if (!thuoc.id && thuoc.medicine?.id) {
            thuoc.id = thuoc.medicine.id;
          }
        });
      },
      error: (err) => {
        this.toastr.error('Không thể tải danh sách thuốc!', 'Lỗi');
      }
    });
    console.log(this.danhSachThuoc); 
  }

  themThuocMoi() {
    if (!this.danhSachThuoc) {
      this.danhSachThuoc = [];
    }

    this.danhSachThuoc.push({
      medicineId: null,
      medicine: null,
      unit: '',
      quantity: 0
    });

    this.toastr.info('Đã thêm thuốc mới vào danh sách', 'Thông báo');
  }

  xoaThuoc(index: number) {
    if (this.danhSachThuoc.length > 0) {
      this.danhSachThuoc.splice(index, 1);
      this.toastr.warning('Đã xóa thuốc khỏi danh sách', 'Cảnh báo');
    }
  }

  close() {
    // Kiểm tra dữ liệu trước khi gửi
    if (!this.danhSachThuoc || this.danhSachThuoc.length === 0) {
      this.toastr.warning('Danh sách thuốc không được để trống!', 'Cảnh báo');
      return;
    }

    // Kiểm tra từng thuốc có đầy đủ thông tin
    const invalidItems = this.danhSachThuoc.filter(x => 
      !x.medicine || !x.medicine.medicineName || x.quantity <= 0
    );

    if (invalidItems.length > 0) {
      this.toastr.warning('Vui lòng điền đầy đủ thông tin cho tất cả thuốc!', 'Cảnh báo');
      return;
    }

    // Chuẩn bị dữ liệu gửi API theo định dạng
    const body = {
      medicalRecordId: this.medicalRecordId,
      items: this.danhSachThuoc.map(x => ({
        medicineName: x.medicine.medicineName,
        quantity: x.quantity
      }))
    };
    
    this.service.updatePrescriptionDetails(body)
      .subscribe({
        next: (res) => {
          this.toastr.success('Cập nhật danh sách thuốc thành công!', 'Thành công');
          this.dong.emit();
          this.taiLai.emit();   // Gọi reload sau khi cập nhật thành công
        },
        error: (err) => {
          const message = err.error?.message || 'Cập nhật danh sách thuốc thất bại!';
          this.toastr.error(message, 'Lỗi');
          this.dong.emit();
          this.taiLai.emit();  
        }
      }); 
  }

  closeV2() {
    this.dong.emit();
    this.taiLai.emit();
  }

  onThuocChange(index: number) {
    const selectedId = this.danhSachThuoc[index].medicineId;
    const selectedMedicine = this.danhSachMedicine.find(m => m.id === selectedId);
    if (selectedMedicine) {
      this.danhSachThuoc[index].medicine = selectedMedicine;
      this.toastr.success(`Đã chọn thuốc: ${selectedMedicine.medicineName}`, 'Thành công');
    }
  }
}
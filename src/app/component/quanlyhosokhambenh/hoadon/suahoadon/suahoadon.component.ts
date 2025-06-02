import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/component/shared.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suahoadon',
  templateUrl: './suahoadon.component.html',
  styleUrls: ['./suahoadon.component.scss']
})
export class SuahoadonComponent {
  @Input() hoaDon: any;  // Dữ liệu bệnh nhân cần sửa
  @Input() hoSoID!: string;

  @Output() reloadEvent = new EventEmitter<void>();
  @Output() dongModal = new EventEmitter<void>();
  
  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private service: SharedService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  ngOnChanges(): void {
    this.khoiTaoForm();
  }

  khoiTaoForm() {
    if (this.hoaDon) {
      this.form = this.fb.group({
        paymentMethod: [this.hoaDon.paymentMethod, Validators.required],
        paymentStatus: [this.hoaDon.paymentStatus, Validators.required],
      });
    }
  }

  capNhatHoaDon() {
    if (this.form.valid) {
      const updatedInvoice = {
        medicalRecordID: this.hoSoID,
        paymentMethod: this.form.value.paymentMethod,
        paymentStatus: this.form.value.paymentStatus,
      };

      this.service.suaHoaDon(updatedInvoice).subscribe({
        next: (res) => {
          this.toastr.success(res.message || 'Cập nhật hóa đơn thành công!', 'Thành công');
          this.reloadEvent.emit();
          this.dongModal.emit();
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Có lỗi xảy ra khi cập nhật hóa đơn!', 'Lỗi');
        }
      });
    } else {
      this.toastr.warning('Vui lòng điền đầy đủ thông tin!', 'Cảnh báo');
    }
  }

  close() {
    this.dongModal.emit();
  }
}
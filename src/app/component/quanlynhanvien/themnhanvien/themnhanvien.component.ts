import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-themnhanvien',
  templateUrl: './themnhanvien.component.html',
  styleUrls: ['./themnhanvien.component.scss']
})
export class ThemnhanvienComponent {

  genders = [
    { label: 'Nam', value: 0 },
    { label: 'Nữ', value: 1 },
  ];

  newStaff = {
    fullName: '',
    gender: null,
    phone: '',
    email: '',
    position: '',
  };

  @Output() dongModal = new EventEmitter<void>();
  @Output() reloadEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder, 
    private service: SharedService,
    private toastr: ToastrService
  ) {}

  addAccount() {
    // Validation trước khi gửi
    if (!this.validateForm()) {
      return;
    }

    const val1 = {
      fullName: this.newStaff.fullName,
      gender: this.newStaff.gender,
      phone: this.newStaff.phone,
      email: this.newStaff.email,
      position: this.newStaff.position,
    };

    this.service.themNhanVien(val1).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'Thêm nhân viên thành công!', 'Thành công');
        this.reloadEvent.emit();
        console.log('Thêm nhân viên thành công', res);
        this.dongModal.emit();
        this.resetForm();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Có lỗi xảy ra khi thêm nhân viên!';
        this.toastr.error(errorMessage, 'Lỗi');
        console.error('Lỗi khi thêm nhân viên:', error);
      }
    });
  }

  validateForm(): boolean {
    if (!this.newStaff.fullName.trim()) {
      this.toastr.warning('Vui lòng nhập họ và tên!', 'Cảnh báo');
      return false;
    }

    if (this.newStaff.gender === null) {
      this.toastr.warning('Vui lòng chọn giới tính!', 'Cảnh báo');
      return false;
    }

    if (!this.newStaff.phone.trim()) {
      this.toastr.warning('Vui lòng nhập số điện thoại!', 'Cảnh báo');
      return false;
    }

    if (!this.newStaff.email.trim()) {
      this.toastr.warning('Vui lòng nhập email!', 'Cảnh báo');
      return false;
    }

    if (!this.newStaff.position.trim()) {
      this.toastr.warning('Vui lòng nhập chức vụ!', 'Cảnh báo');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newStaff.email)) {
      this.toastr.warning('Email không đúng định dạng!', 'Cảnh báo');
      return false;
    }

    // Validate phone format (Vietnamese phone number)
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(this.newStaff.phone)) {
      this.toastr.warning('Số điện thoại không đúng định dạng!', 'Cảnh báo');
      return false;
    }

    return true;
  }

  resetForm() {
    this.newStaff = {
      fullName: '',
      gender: null,
      phone: '',
      email: '',
      position: '',
    };
  }

  close() {
    this.dongModal.emit();
  }
}
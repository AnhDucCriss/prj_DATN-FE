import { Component, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-thembenhnhan',
  templateUrl: './thembenhnhan.component.html',
  styleUrls: ['./thembenhnhan.component.scss']
})
export class ThembenhnhanComponent {

  gender = [
    { label: 'Nam', value: 0 },
    { label: 'Nữ', value: 1 },
  ];

  newPatient = {
    fullName: '',
    gender: null,
    age: null,
    phone: null,
    address: '',
    email: ''
  };

  @Output() dongModal = new EventEmitter<void>();
  @Output() reloadEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder, 
    private service: SharedService,
    private toastr: ToastrService
  ) {}

  addPatient() {
    // Validation trước khi gửi
    if (!this.validateForm()) {
      return;
    }

    const val1 = {
      fullName: this.newPatient.fullName,
      gender: this.newPatient.gender,
      age: this.newPatient.age,
      phone: this.newPatient.phone,
      address: this.newPatient.address
    };

    this.service.themBenhNhan(val1).subscribe({
      next: (res) => {
        console.log(this.newPatient); // Kiểm tra trước khi gửi API
        this.toastr.success(res.message || 'Thêm bệnh nhân thành công!', 'Thành công');
        this.reloadEvent.emit();
        console.log('Thêm bệnh nhân thành công', res);
        this.dongModal.emit();
        this.resetForm();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Có lỗi xảy ra khi thêm bệnh nhân!';
        this.toastr.error(errorMessage, 'Lỗi');
        console.error('Lỗi khi thêm bệnh nhân:', error);
      }
    });
  }

  validateForm(): boolean {
    if (!this.newPatient.fullName.trim()) {
      this.toastr.warning('Vui lòng nhập họ và tên bệnh nhân!', 'Cảnh báo');
      return false;
    }

    if (this.newPatient.gender === null) {
      this.toastr.warning('Vui lòng chọn giới tính!', 'Cảnh báo');
      return false;
    }

    if (!this.newPatient.age || this.newPatient.age <= 0) {
      this.toastr.warning('Vui lòng nhập tuổi hợp lệ!', 'Cảnh báo');
      return false;
    }

    if (this.newPatient.age > 150) {
      this.toastr.warning('Tuổi không được vượt quá 150!', 'Cảnh báo');
      return false;
    }

    if (!this.newPatient.phone) {
      this.toastr.warning('Vui lòng nhập số điện thoại!', 'Cảnh báo');
      return false;
    }

    if (!this.newPatient.address.trim()) {
      this.toastr.warning('Vui lòng nhập địa chỉ!', 'Cảnh báo');
      return false;
    }

    // Validate phone format (Vietnamese phone number)
    

    // Validate email if provided
    if (this.newPatient.email && this.newPatient.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.newPatient.email)) {
        this.toastr.warning('Email không đúng định dạng!', 'Cảnh báo');
        return false;
      }
    }

    // Validate name format
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameRegex.test(this.newPatient.fullName)) {
      this.toastr.warning('Họ và tên chỉ được chứa chữ cái và khoảng trắng!', 'Cảnh báo');
      return false;
    }

    return true;
  }

  resetForm() {
    this.newPatient = {
      fullName: '',
      gender: null,
      age: null,
      phone: null,
      address: '',
      email: ''
    };
  }

  close() {
    this.dongModal.emit();
  }
}
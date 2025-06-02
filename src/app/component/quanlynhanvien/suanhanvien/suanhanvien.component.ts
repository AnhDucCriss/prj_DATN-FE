import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DsnhanvienComponent } from '../dsnhanvien/dsnhanvien.component';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suanhanvien',
  templateUrl: './suanhanvien.component.html',
  styleUrls: ['./suanhanvien.component.scss']
})
export class SuanhanvienComponent implements OnInit, OnChanges {
  @Input() nhanVien: any;
  @Output() reloadEvent = new EventEmitter<void>();
  @Output() dongModal = new EventEmitter<void>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private dsc: DsnhanvienComponent, 
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
    this.form = this.fb.group({
      fullName: [this.dsc.nhanVienDangSua.fullName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ỹ\s]+$/)
      ]],
      gender: [this.dsc.nhanVienDangSua.gender, [Validators.required]],
      phone: [this.dsc.nhanVienDangSua.phone, [
        Validators.required,
        Validators.pattern(/^(0[3|5|7|8|9])+([0-9]{8})$/)
      ]],
      email: [this.dsc.nhanVienDangSua.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      position: [this.dsc.nhanVienDangSua.position, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]]
    });
  }

  // Helper methods cho validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  // Get validation error message for a field
  getFieldErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        switch (fieldName) {
          case 'fullName': return 'Họ và tên không được để trống';
          case 'gender': return 'Giới tính không được để trống';
          case 'phone': return 'Số điện thoại không được để trống';
          case 'email': return 'Email không được để trống';
          case 'position': return 'Chức vụ không được để trống';
          default: return 'Trường này không được để trống';
        }
      }
      if (field.errors['minlength']) {
        return `Tối thiểu ${field.errors['minlength'].requiredLength} ký tự`;
      }
      if (field.errors['maxlength']) {
        return `Tối đa ${field.errors['maxlength'].requiredLength} ký tự`;
      }
      if (field.errors['pattern']) {
        switch (fieldName) {
          case 'fullName': return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng';
          case 'phone': return 'Số điện thoại không đúng định dạng';
          default: return 'Định dạng không hợp lệ';
        }
      }
      if (field.errors['email']) {
        return 'Email không đúng định dạng';
      }
    }
    return '';
  }

  // Submit form
  capNhatNhanVien() {
    if (this.form.valid) {
      const request = {
        id: this.nhanVien.id,
        fullName: this.form.value.fullName,
        gender: this.form.value.gender,
        phone: this.form.value.phone,
        email: this.form.value.email,
        position: this.form.value.position,
      };

      this.service.suaNhanVien(request.id, request).subscribe({
        next: (res) => {
          this.toastr.success(res.message || 'Cập nhật nhân viên thành công!', 'Thành công');
          this.reloadEvent.emit();
          this.dongModal.emit();
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Có lỗi xảy ra khi cập nhật nhân viên!';
          this.toastr.error(errorMessage, 'Lỗi');
          console.error('Lỗi khi cập nhật nhân viên:', error);
        }
      });
    } else {
      // Mark all fields as touched để hiển thị validation errors
      this.markFormGroupTouched();
      this.toastr.warning('Vui lòng kiểm tra và sửa các lỗi trong form!', 'Cảnh báo');
      
      // Show specific validation errors
      this.showValidationErrors();
    }
  }

  // Show specific validation errors
  private showValidationErrors(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control?.invalid) {
        const errorMessage = this.getFieldErrorMessage(key);
        if (errorMessage) {
          this.toastr.error(errorMessage, 'Lỗi validation');
        }
      }
    });
  }

  // Mark all fields as touched
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  // Đóng modal
  close(): void {
    if (this.hasChanges()) {
      // Hiển thị cảnh báo khi có thay đổi chưa lưu
      this.toastr.info('Bạn có thay đổi chưa được lưu', 'Thông báo');
    }
    this.dongModal.emit();
  }

  // Reset form về dữ liệu ban đầu
  resetForm(): void {
    this.khoiTaoForm();
    this.toastr.info('Đã khôi phục dữ liệu ban đầu', 'Thông báo');
  }

  // Kiểm tra form có thay đổi không
  hasChanges(): boolean {
    return this.form.dirty;
  }
}
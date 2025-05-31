import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-themhskhambenh',
  templateUrl: './themhskhambenh.component.html',
  styleUrls: ['./themhskhambenh.component.scss']
})
export class ThemhskhambenhComponent implements OnInit {
  patientId: string = '';
  doctors: any[] = [];
  isSubmitting: boolean = false;

  gender = [
    { label: 'Nam', value: 'Male' }, // Sửa từ 0 thành 'Male'
    { label: 'Nữ', value: 'Female' }, // Sửa từ 1 thành 'Female'
  ];

  newHSKB = {
    examinationDate: '',
    doctorName: '',
    symptoms: '',
    conclusion: '',
    // Thêm các trường cần thiết cho API
    model: '', // Thêm trường model bắt buộc
    gender: '', // Thêm trường gender nếu cần
    phoneNumber: '' // Tách riêng số điện thoại khỏi conclusion
  };

  @Output() dongModal = new EventEmitter<void>();
  @Output() reloadEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder, 
    private service: SharedService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    this.loadDoctors();
    // Có thể set model mặc định nếu biết
    this.newHSKB.model = 'default_model'; // Thay thế bằng model thực tế
  }

  loadDoctors(): void {
    this.service.getDoctors().subscribe({
      next: (res) => {
        this.doctors = Array.isArray(res) ? res : res.data || [];
        if (this.doctors.length === 0) {
          this.toastr.warning('Không có bác sĩ nào trong hệ thống', 'Cảnh báo');
        }
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách bác sĩ:', err);
        this.toastr.error('Không thể tải danh sách bác sĩ. Vui lòng thử lại!', 'Lỗi');
      }
    });
  }

  addHSKB() {
    // Kiểm tra validation trước khi submit
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    // Chuẩn bị data với đầy đủ các trường cần thiết
    const requestData = {
      patientId: this.patientId,
      doctorName: this.newHSKB.doctorName.trim(),
      symptoms: this.newHSKB.symptoms.trim(),
      conclusion: this.newHSKB.conclusion.trim(),
      model: this.newHSKB.model, // Thêm trường model
      phoneNumber: this.newHSKB.phoneNumber.trim(), // Số điện thoại riêng biệt
      // Thêm gender nếu API yêu cầu
      ...(this.newHSKB.gender && { gender: this.newHSKB.gender })
    };

    this.service.themHSKB(requestData).subscribe({
      next: (res) => {
        console.log('Thêm hồ sơ thành công:', requestData);
        this.toastr.success(res.message || 'Thêm hồ sơ khám bệnh thành công!', 'Thành công', {
          progressBar: true,
          timeOut: 3000
        });
        this.resetForm();
        this.reloadEvent.emit();
        this.close();
      },
      error: (err) => {
        console.error('Lỗi khi thêm hồ sơ:', err);
        let errorMessage = 'Có lỗi xảy ra khi thêm hồ sơ!';
        
        // Xử lý lỗi validation từ API
        if (err.status === 400 && err.error?.errors) {
          const apiErrors = err.error.errors;
          const errorMessages: string[] = [];
          
          // Xử lý từng loại lỗi
          Object.keys(apiErrors).forEach(key => {
            if (Array.isArray(apiErrors[key])) {
              apiErrors[key].forEach((error: string) => {
                errorMessages.push(`${key}: ${error}`);
              });
            }
          });
          
          if (errorMessages.length > 0) {
            errorMessage = errorMessages.join('; ');
          }
        } else if (err.error?.message) {
          errorMessage = err.error.message;
        }

        this.toastr.error(errorMessage, 'Lỗi', {
          progressBar: true,
          timeOut: 5000
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  validateForm(): boolean {
    const errors: string[] = [];

    // Kiểm tra model (bắt buộc theo API)
    if (!this.newHSKB.model || this.newHSKB.model.trim() === '') {
      errors.push('Vui lòng chọn model');
    }

    // Kiểm tra bác sĩ
    if (!this.newHSKB.doctorName || this.newHSKB.doctorName.trim() === '') {
      errors.push('Vui lòng chọn bác sĩ điều trị');
    }

    // Kiểm tra triệu chứng
    if (!this.newHSKB.symptoms || this.newHSKB.symptoms.trim() === '') {
      errors.push('Vui lòng nhập triệu chứng');
    } else if (this.newHSKB.symptoms.trim().length < 5) {
      errors.push('Triệu chứng phải có ít nhất 5 ký tự');
    } else if (this.newHSKB.symptoms.trim().length > 500) {
      errors.push('Triệu chứng không được vượt quá 500 ký tự');
    }

    // Kiểm tra kết luận
    if (!this.newHSKB.conclusion || this.newHSKB.conclusion.trim() === '') {
      errors.push('Vui lòng nhập kết luận');
    }

    // Kiểm tra số điện thoại (nếu có)
    if (this.newHSKB.phoneNumber && this.newHSKB.phoneNumber.trim() !== '') {
      if (!this.isValidPhoneNumber(this.newHSKB.phoneNumber.trim())) {
        errors.push('Số điện thoại không đúng định dạng');
      }
    }

    // Kiểm tra gender (nếu cần thiết)
    if (this.newHSKB.gender && !['Male', 'Female'].includes(this.newHSKB.gender)) {
      errors.push('Giá trị giới tính không hợp lệ');
    }

    if (errors.length > 0) {
      this.showValidationErrors(errors);
      return false;
    }

    return true;
  }

  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    return phoneRegex.test(phone);
  }

  resetForm(): void {
    this.newHSKB = {
      examinationDate: '',
      doctorName: '',
      symptoms: '',
      conclusion: '',
      model: this.newHSKB.model, // Giữ nguyên model đã chọn
      gender: '',
      phoneNumber: ''
    };
  }

  close() {
    this.resetForm();
    this.dongModal.emit();
  }

  // Helpers cho template
  getCharCount(field: string): number {
    return this.newHSKB[field as keyof typeof this.newHSKB]?.length || 0;
  }

  // Các method tiện ích cho toastr
  showValidationErrors(errors: string[]): void {
    if (errors.length === 1) {
      this.toastr.error(errors[0], 'Lỗi validation');
    } else {
      this.toastr.error(
        `Có ${errors.length} lỗi cần khắc phục`, 
        'Lỗi validation',
        {
          progressBar: true,
          timeOut: 4000
        }
      );
      // Hiển thị chi tiết từng lỗi
      errors.forEach((error, index) => {
        setTimeout(() => {
          this.toastr.warning(error, `Lỗi ${index + 1}`, {
            progressBar: true,
            timeOut: 3000
          });
        }, (index + 1) * 200);
      });
    }
  }

  // Method để hiển thị thông báo khi form hợp lệ
  showFormValidated(): void {
    this.toastr.info('Form đã được điền đầy đủ và hợp lệ', 'Thông tin', {
      progressBar: true,
      timeOut: 2000
    });
  }

  // Method để set model từ dropdown hoặc input
  onModelChange(selectedModel: string): void {
    this.newHSKB.model = selectedModel;
  }

  // Method để set gender từ dropdown
  onGenderChange(selectedGender: string): void {
    this.newHSKB.gender = selectedGender;
  }
}
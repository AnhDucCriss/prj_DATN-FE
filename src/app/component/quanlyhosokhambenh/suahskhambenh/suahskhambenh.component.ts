// suahskhambenh.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suahskhambenh',
  templateUrl: './suahskhambenh.component.html',
  styleUrls: ['./suahskhambenh.component.scss']
})
export class SuahskhambenhComponent {
  @Input() hoSo: any;  
  @Output() reloadEvent = new EventEmitter<void>();
  @Output() dongModal = new EventEmitter<void>();

  form!: FormGroup;
  isLoading = false;
  doctors: any[] = []; // Thêm array để lưu danh sách bác sĩ

  constructor(
    private fb: FormBuilder, 
    private service: SharedService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDoctors(); // Load danh sách bác sĩ khi component init
    this.khoiTaoForm();
  }

  ngOnChanges(): void {
    if (this.doctors.length > 0) { // Chỉ khởi tạo form khi đã có danh sách bác sĩ
      this.khoiTaoForm();
    }
  }

  // Thêm method loadDoctors
  loadDoctors(): void {
    this.service.getDoctors().subscribe({
      next: (res) => {
        this.doctors = Array.isArray(res) ? res : res.data || [];
        if (this.doctors.length === 0) {
          this.toastr.warning('Không có bác sĩ nào trong hệ thống', 'Cảnh báo');
        }
        // Khởi tạo form sau khi load xong danh sách bác sĩ
        this.khoiTaoForm();
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách bác sĩ:', err);
        this.toastr.error('Không thể tải danh sách bác sĩ. Vui lòng thử lại!', 'Lỗi');
        // Vẫn khởi tạo form ngay cả khi lỗi
        this.khoiTaoForm();
      }
    });
  }

  // Custom validators
  static dateNotInFuture(control: AbstractControl): {[key: string]: any} | null {
    const today = new Date();
    const inputDate = new Date(control.value);
    
    if (inputDate > today) {
      return { 'futureDate': true };
    }
    return null;
  }

  static minLengthTrimmed(minLength: number) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) return null;
      const trimmedValue = control.value.toString().trim();
      if (trimmedValue.length < minLength) {
        return { 'minLengthTrimmed': { requiredLength: minLength, actualLength: trimmedValue.length } };
      }
      return null;
    };
  }

  // Sửa lại validator cho dropdown bác sĩ
  static doctorSelectionValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value || control.value.trim() === '') {
      return { 'doctorRequired': true };
    }
    return null;
  }

  khoiTaoForm() {
    if (this.hoSo) {
      this.form = this.fb.group({
        symptoms: [
          this.hoSo.symptoms || '', 
          [
            Validators.required,
            SuahskhambenhComponent.minLengthTrimmed(1),
            Validators.maxLength(1000)
          ]
        ],
        conclusion: [
          this.hoSo.conclusion || '', 
          [
            Validators.required,
            SuahskhambenhComponent.minLengthTrimmed(1),
            Validators.maxLength(1000)
          ]
        ],
        doctorName: [
          this.hoSo.doctorName || '', 
          [
            Validators.required,
            SuahskhambenhComponent.doctorSelectionValidator // Sử dụng validator mới
          ]
        ],
        examinationDate: [
          this.hoSo.examinationDate?.substring(0, 10), 
          [
            Validators.required,
            SuahskhambenhComponent.dateNotInFuture
          ]
        ],
      });
    }
  }

  // Helper methods để kiểm tra lỗi validation
  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required'] || field.errors['doctorRequired']) {
        return this.getRequiredMessage(fieldName);
      }
      if (field.errors['minLengthTrimmed']) {
        return `${this.getFieldLabel(fieldName)} phải có ít nhất ${field.errors['minLengthTrimmed'].requiredLength} ký tự`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} không được quá ${field.errors['maxlength'].requiredLength} ký tự`;
      }
      if (field.errors['futureDate']) {
        return 'Ngày khám không được là ngày trong tương lai';
      }
    }
    return '';
  }

  private getRequiredMessage(fieldName: string): string {
    const messages: {[key: string]: string} = {
      'symptoms': 'Triệu chứng không được để trống',
      'conclusion': 'Chuẩn đoán không được để trống',
      'doctorName': 'Vui lòng chọn bác sĩ điều trị', // Sửa message cho dropdown
      'examinationDate': 'Ngày khám không được để trống'
    };
    return messages[fieldName] || 'Trường này không được để trống';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'symptoms': 'Triệu chứng',
      'conclusion': 'Chuẩn đoán',
      'doctorName': 'Bác sĩ điều trị',
      'examinationDate': 'Ngày khám'
    };
    return labels[fieldName] || 'Trường này';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.valid && field?.touched);
  }

  capNhatHoSoKhamBenh() {
    // Mark all fields as touched để hiển thị validation errors
    this.markFormGroupTouched();

    if (this.form.valid) {
      this.isLoading = true;
      
      const updatedHoSo = {
        id: this.hoSo.id,
        symptoms: this.form.value.symptoms.trim(),
        conclusion: this.form.value.conclusion.trim(),
        doctorName: this.form.value.doctorName.trim(), // Giá trị từ dropdown
        examinationDate: this.form.value.examinationDate,
      };
     
      this.service.suaHSKhamBenh(updatedHoSo.id, updatedHoSo).subscribe({
        next: (res) => {
          this.isLoading = false;
          
          this.toastr.success(
            'Cập nhật hồ sơ khám bệnh thành công!',
            'Thành công',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right'
            }
          );
          
          this.reloadEvent.emit();
          this.dongModal.emit();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Lỗi trả về từ API:', err);
          
          const errorMessage = err.error?.message || 'Có lỗi xảy ra khi cập nhật hồ sơ khám bệnh!';
          this.toastr.error(
            errorMessage,
            'Lỗi',
            {
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right'
            }
          );
        }
      });
    } else {
      this.toastr.warning(
        'Vui lòng kiểm tra lại thông tin đã nhập!',
        'Thông tin không hợp lệ',
        {
          timeOut: 4000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right'
        }
      );
      
      this.scrollToFirstError();
    }
  }

  // Các method khác giữ nguyên...
  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  private scrollToFirstError() {
    const firstErrorField = Object.keys(this.form.controls).find(key => {
      const control = this.form.get(key);
      return control?.invalid;
    });

    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  }

  resetForm() {
    this.khoiTaoForm();
    this.toastr.info(
      'Form đã được reset về dữ liệu ban đầu',
      'Thông báo',
      { timeOut: 2000 }
    );
  }

  hasChanges(): boolean {
    return this.form.dirty;
  }

  close() {
    if (this.hasChanges()) {
      const confirmClose = confirm('Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn đóng?');
      if (confirmClose) {
        this.dongModal.emit();
      }
    } else {
      this.dongModal.emit();
    }
  }

  confirmClose() {
    if (this.hasChanges()) {
      this.toastr.warning(
        'Bạn có thay đổi chưa được lưu. Nhấn nút Đóng một lần nữa để xác nhận.',
        'Cảnh báo',
        {
          timeOut: 5000,
          closeButton: true,
          tapToDismiss: false
        }
      );
    } else {
      this.dongModal.emit();
    }
  }
}
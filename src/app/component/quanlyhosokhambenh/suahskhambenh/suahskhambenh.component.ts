// suahskhambenh.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../shared.service';

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

  constructor(private fb: FormBuilder, private service: SharedService) {}

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  ngOnChanges(): void {
    this.khoiTaoForm();
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

  static doctorNameValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) return null;
    
    const trimmedValue = control.value.toString().trim();
    const doctorNameRegex = /^[a-zA-ZÀ-ỹ\s\.]+$/;
    
    if (!doctorNameRegex.test(trimmedValue)) {
      return { 'invalidDoctorName': true };
    }
    
    if (trimmedValue.length < 2 || trimmedValue.length > 100) {
      return { 'doctorNameLength': true };
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
            SuahskhambenhComponent.doctorNameValidator
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
      if (field.errors['required']) {
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
      if (field.errors['invalidDoctorName']) {
        return 'Tên bác sĩ chỉ được chứa chữ cái, dấu cách và dấu chấm';
      }
      if (field.errors['doctorNameLength']) {
        return 'Tên bác sĩ phải từ 2 đến 100 ký tự';
      }
    }
    return '';
  }

  private getRequiredMessage(fieldName: string): string {
    const messages: {[key: string]: string} = {
      'symptoms': 'Triệu chứng không được để trống',
      'conclusion': 'Chuẩn đoán không được để trống',
      'doctorName': 'Tên bác sĩ điều trị không được để trống',
      'examinationDate': 'Ngày khám không được để trống'
    };
    return messages[fieldName] || 'Trường này không được để trống';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'symptoms': 'Triệu chứng',
      'conclusion': 'Chuẩn đoán',
      'doctorName': 'Tên bác sĩ',
      'examinationDate': 'Ngày khám'
    };
    return labels[fieldName] || 'Trường này';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  capNhatHoSoKhamBenh() {
    // Mark all fields as touched để hiển thị validation errors
    this.markFormGroupTouched();

    if (this.form.valid) {
      const updatedHoSo = {
        id: this.hoSo.id,
        symptoms: this.form.value.symptoms.trim(),
        conclusion: this.form.value.conclusion.trim(),
        doctorName: this.form.value.doctorName.trim(),
        examinationDate: this.form.value.examinationDate,
      };
     
      this.service.suaHSKhamBenh(updatedHoSo.id, updatedHoSo).subscribe({
        next: (res) => {
          alert(res.message);
          this.reloadEvent.emit();
          this.dongModal.emit();
        },
        error: (err) => {
          console.error('Lỗi trả về từ API:', err);
          alert(err.error?.message || 'Có lỗi xảy ra!');
        }
      });
    } else {
      alert('Vui lòng kiểm tra lại thông tin đã nhập!');
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  close() {
    this.dongModal.emit();
  }
}
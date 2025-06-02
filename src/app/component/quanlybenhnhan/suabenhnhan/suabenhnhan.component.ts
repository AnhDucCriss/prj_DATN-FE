import { Component, Output, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suabenhnhan',
  templateUrl: './suabenhnhan.component.html',
  styleUrls: ['./suabenhnhan.component.scss']
})
export class SuabenhnhanComponent implements OnInit, OnChanges {
  @Input() benhNhan: any;  // Dữ liệu bệnh nhân cần sửa
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
    if (this.benhNhan) {
      this.form = this.fb.group({
        fullName: [this.benhNhan.fullName, Validators.required],
        gender: [this.benhNhan.gender, Validators.required],
        age: [this.benhNhan.age, [Validators.required, Validators.min(0)]],
        phone: [this.benhNhan.phone, [Validators.required, Validators.pattern(/^0\d{9}$/)]],
        address: [this.benhNhan.address, Validators.required],
        email: [this.benhNhan.email, [Validators.required, Validators.email]],
      });
    }
  }

  capNhatBenhNhan() {    
    if (this.form.valid) {
      const updatedPatient = {
        id: this.benhNhan.id,
        fullName: this.form.value.fullName,
        gender: this.form.value.gender,
        age: this.form.value.age,
        phone: this.form.value.phone,
        address: this.form.value.address,
        email: this.form.value.email,
      };
     
      this.service.suaBenhNhan(updatedPatient.id, updatedPatient).subscribe({
        next: (res) => {
          this.toastr.success( 'Cập nhật bệnh nhân thành công!');
          this.reloadEvent.emit();
          this.dongModal.emit();
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Có lỗi xảy ra khi cập nhật bệnh nhân!';
          this.toastr.error(errorMessage, 'Lỗi');
          console.error('Lỗi khi cập nhật bệnh nhân:', error);
        }
      });
    }
  }

  close() {
    this.dongModal.emit();
  }
}
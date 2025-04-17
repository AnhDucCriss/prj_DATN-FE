import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { Validator } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { DstaikhoanComponent } from '../dstaikhoan/dstaikhoan.component';
@Component({
  selector: 'app-suataikhoan',
  templateUrl: './suataikhoan.component.html',
  styleUrls: ['./suataikhoan.component.scss']
})
export class SuataikhoanComponent implements OnInit, OnChanges {
  @Input() taiKhoan: any;
  @Output() reloadEvent = new EventEmitter<void>();
  @Output() dongModal = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private dsc: DstaikhoanComponent, private service: SharedService) {}

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  ngOnChanges(): void {
    this.khoiTaoForm();
  }

  khoiTaoForm() {
    this.form = this.fb.group({
      username: [this.dsc.taiKhoanDangSua.username, Validators.required],
      password: [this.dsc.taiKhoanDangSua.password, Validators.required],
      role: [this.dsc.taiKhoanDangSua.role, Validators.required]
    });
  }

  capNhatTaiKhoan() {
    if (this.form.valid) {
      const request = {
        id: this.taiKhoan.id,
        username: this.form.value.username,
        password: this.form.value.password,
        role: this.form.value.role
      };

      this.service.suaTaiKhoan(request.id,request).subscribe(() => {
        alert('Cập nhật thành công');
        this.reloadEvent.emit();
        this.dongModal.emit();
      });
    }
  }
  close() {
    this.dongModal.emit();
  }
  
}

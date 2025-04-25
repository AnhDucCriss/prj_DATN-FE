import { Component, Input, Output,EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DsnhanvienComponent } from '../dsnhanvien/dsnhanvien.component';
import { SharedService } from '../../shared.service';
import { Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private dsc: DsnhanvienComponent, private service: SharedService) {}

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  ngOnChanges(): void {
    this.khoiTaoForm();
  }

  khoiTaoForm() {
    this.form = this.fb.group({
      fullName: [this.dsc.nhanVienDangSua.fullName, Validators.required],
      gender: [this.dsc.nhanVienDangSua.gender, Validators.required],
      phone: [this.dsc.nhanVienDangSua.phone, Validators.required],
      email: [this.dsc.nhanVienDangSua.email, Validators.required],
      position: [this.dsc.nhanVienDangSua.position, Validators.required]
    });
  }

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

      this.service.suaNhanVien(request.id,request).subscribe(res => {
        alert(res.message);
        this.reloadEvent.emit();
        this.dongModal.emit();
      });
    }
  }
  close() {
    this.dongModal.emit();
  }
}

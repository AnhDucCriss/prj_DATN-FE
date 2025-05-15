import { Component, Output, EventEmitter, Input , OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-suathuoc',
  templateUrl: './suathuoc.component.html',
  styleUrls: ['./suathuoc.component.scss']
})
export class SuathuocComponent implements OnInit, OnChanges  {
  @Input() thuoc: any;  // Dữ liệu thuốc cần sửa
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

  khoiTaoForm() {
    if (this.thuoc) {
      this.form = this.fb.group({
        medicineName: [this.thuoc.medicineName, Validators.required],
        unit: [this.thuoc.unit, Validators.required],
        price: [this.thuoc.price, [Validators.required, Validators.min(0)]],
        category: [this.thuoc.category, Validators.maxLength(50)],
        quantity: [this.thuoc.quantity, Validators.min(0)],
      });
    }
  }

  capNhatThuoc() {
    if (this.form.valid) {
      const updatedThuoc = {
        id: this.thuoc.id,
        medicineName: this.form.value.medicineName,
        unit: this.form.value.unit,
        category: this.form.value.category,
        price: this.form.value.price,
        quantity: this.form.value.quantity
      };

      this.service.suaThuoc(updatedThuoc.id, updatedThuoc).subscribe(res => {
        alert("Cập nhật thuốc thành công"); // Hiển thị thông báo
        this.reloadEvent.emit(); // Cập nhật danh sách thuốc
        this.dongModal.emit(); // Đóng modal
      });
    }
  }

  close() {
    this.dongModal.emit();
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-themthuoc',
  templateUrl: './themthuoc.component.html',
  styleUrls: ['./themthuoc.component.scss']
})
export class ThemthuocComponent {
  newMedicine = {
    medicineName: '',
    unit: '',
    price: 0,
    description: '',
    category: ''
  };

  @Output() dongModal = new EventEmitter<void>();
  @Output() reloadEvent = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private service: SharedService) {}

  addMedicine() {
    const val = {
      medicineName: this.newMedicine.medicineName,
      unit: this.newMedicine.unit,
      price: this.newMedicine.price,
      description: this.newMedicine.description,
      category: this.newMedicine.category
    };

    this.service.themThuoc(val).subscribe(res => {
      alert(res.message);
      this.reloadEvent.emit();
      console.log('Thêm thuốc thành công', res);
      this.dongModal.emit();
    });
  }

  close() {
    this.dongModal.emit();
  }
}

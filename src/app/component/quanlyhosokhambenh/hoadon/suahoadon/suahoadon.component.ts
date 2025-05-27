import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/component/shared.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-suahoadon',
  templateUrl: './suahoadon.component.html',
  styleUrls: ['./suahoadon.component.scss']
})
export class SuahoadonComponent {
  @Input() hoaDon: any;  // Dữ liệu bệnh nhân cần sửa
  @Input() hoSoID!: string;

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
      if (this.hoaDon) {
        this.form = this.fb.group({
          paymentMethod: [this.hoaDon.paymentMethod, Validators.required],
          paymentStatus: [this.hoaDon.paymentStatus, Validators.required],
        });
      }
    }
    capNhatHoaDon() {
      if (this.form.valid) {
        const updatedInvoice = {
          medicalRecordID: this.hoSoID,
          paymentMethod: this.form.value.paymentMethod,
          paymentStatus: this.form.value.paymentStatus,
        };

        this.service.suaHoaDon(updatedInvoice).subscribe(res => {
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

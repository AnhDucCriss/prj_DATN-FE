import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-themnhanvien',
  templateUrl: './themnhanvien.component.html',
  styleUrls: ['./themnhanvien.component.scss']
})
export class ThemnhanvienComponent {

  genders = [
    { label: 'Nam', value: 0 },
    { label: 'Nữ', value: 1 },
    
  ];
  newStaff = {
    fullName: '',
    gender: null,
    phone: '',
    email: '',
    position: '',
  };
  @Output() dongModal = new EventEmitter<void>();
  constructor( private fb: FormBuilder, private service:SharedService) {}
  @Output() reloadEvent = new EventEmitter<void>();
  addAccount() {
    var val = {
      newStaff:this.newStaff
    };
    const val1 = {
      fullName: this.newStaff.fullName,
      gender: this.newStaff.gender,
      phone: this.newStaff.phone,
      email: this.newStaff.email,
      position: this.newStaff.position,
    };
    this.service.themNhanVien(val1).subscribe(res =>{
      
      alert(res.message); // hiện thông báo
      this.reloadEvent.emit();
      console.log('Thêm nhân viên thành công', res);
      this.dongModal.emit();
    });

    
  } 
 
  close() {
    this.dongModal.emit();
  }
}

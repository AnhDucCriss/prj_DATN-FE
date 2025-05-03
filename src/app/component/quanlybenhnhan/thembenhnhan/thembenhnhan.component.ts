import { Component, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-thembenhnhan',
  templateUrl: './thembenhnhan.component.html',
  styleUrls: ['./thembenhnhan.component.scss']
})
export class ThembenhnhanComponent {
  
  gender = [
      { label: 'Nam', value: 0 },
      { label: 'Nữ', value: 1 },
    ];
    newPatient = {
      fullName: '',
      gender: null,
      age: null,
      phone: null,
      address: '',
      email: ''
    };
    @Output() dongModal = new EventEmitter<void>();
    constructor( private fb: FormBuilder, private service:SharedService) {}
    @Output() reloadEvent = new EventEmitter<void>();
    addPatient() {
      var val = {
        newPatient:this.newPatient
      };
      
      
      const val1 = {
        fullName: this.newPatient.fullName,
        gender: this.newPatient.gender,
        age: this.newPatient.age,
        phone: this.newPatient.phone,
        address: this.newPatient.address
      };
      this.service.themBenhNhan(val1).subscribe(res =>{
        console.log(this.newPatient); // Kiểm tra trước khi gửi API
        alert('Thêm bệnh nhân thành công');
        this.reloadEvent.emit();
        console.log('Thêm bệnh nhân thành công', res);
        this.dongModal.emit();
      });
  
      
    } 
   
    close() {
      this.dongModal.emit();
    }
}

import { Component,EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-themsuataikhoan',
  templateUrl: './themsuataikhoan.component.html',
  styleUrls: ['./themsuataikhoan.component.scss']
})
export class ThemsuataikhoanComponent {

  roles = [
    { label: 'Admin', value: 0 },
    { label: 'Bác sĩ', value: 1 },
    { label: 'Y tá', value: 2 },
    { label: 'Kế toán', value: 3 }
  ];
  newAccount = {
    username: '',
    password: '',
    repass: '',
    role: null,
  };
  @Output() dongModal = new EventEmitter<void>();
  constructor( private fb: FormBuilder, private service:SharedService) {}
  @Output() reloadEvent = new EventEmitter<void>();
  addAccount() {
    var val = {
      newAccount:this.newAccount
    };
    if(this.newAccount.password != this.newAccount.repass) {
      alert("xác nhận mật khẩu không hợp lệ");
      
    }
    
    const val1 = {
      username: this.newAccount.username,
      password: this.newAccount.password,
      role: this.newAccount.role
    };
    this.service.themTaiKhoan(val1).subscribe(res =>{
      console.log(this.newAccount); // Kiểm tra trước khi gửi API
      alert(res.message); // hiện thông báo
      this.reloadEvent.emit();
      console.log('Thêm tài khoản thành công', res);
      this.dongModal.emit();
    });

    
  } 
 
  close() {
    this.dongModal.emit();
  }

}

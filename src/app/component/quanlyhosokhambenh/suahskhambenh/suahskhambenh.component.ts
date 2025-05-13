import { Component, Output, EventEmitter,Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
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
   khoiTaoForm() {
    if (this.hoSo) {
      this.form = this.fb.group({
        symptoms: [this.hoSo.symptoms || '', Validators.required],
        conclusion: [this.hoSo.conclusion || '', Validators.required],
        doctorName: [this.hoSo.doctorName || '', Validators.required],
        examinationDate: [this.hoSo.examinationDate?.substring(0, 10), Validators.required],
      });
    }
  } 
  capNhatHoSoKhamBenh() {
    if (this.form.valid) {
      const updatedHoSo = {
        id: this.hoSo.id,
        symptoms: this.form.value.symptoms,
        conclusion: this.form.value.conclusion,
        doctorName: this.form.value.doctorName,
        examinationDate: this.form.value.examinationDate,

      };
     
      this.service.suaHSKhamBenh(updatedHoSo.id, updatedHoSo).subscribe(res => {
        alert("Cập nhật thành công");
        this.reloadEvent.emit();
        this.dongModal.emit();
      });
    }
  }

  close() {
    this.dongModal.emit();
  }

 

}

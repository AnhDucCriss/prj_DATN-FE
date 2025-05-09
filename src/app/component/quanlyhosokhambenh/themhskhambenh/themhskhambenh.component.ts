import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-themhskhambenh',
  templateUrl: './themhskhambenh.component.html',
  styleUrls: ['./themhskhambenh.component.scss']
})
export class ThemhskhambenhComponent {
  patientId:string = '';

  
  gender = [
      { label: 'Nam', value: 0 },
      { label: 'Nữ', value: 1 },
    ];
    newHSKB = {
      examinationDate: '',
      doctorName: '',
      symptoms: '',
      conclusion: '',
    };
    @Output() dongModal = new EventEmitter<void>();
    constructor( private fb: FormBuilder, private service:SharedService, private router: Router,private route: ActivatedRoute) {}
    @Output() reloadEvent = new EventEmitter<void>();
    ngOnInit(): void {
      this.patientId = this.route.snapshot.paramMap.get('id') || '';
  
    }
    addHSKB() {
      
      const val1 = {
        patientId: this.patientId,
        doctorName: this.newHSKB.doctorName,
        symptoms: this.newHSKB.symptoms,
        conclusion: this.newHSKB.conclusion,
        
      };
      this.service.themHSKB(val1).subscribe(res =>{
        console.log(this.newHSKB); // Kiểm tra trước khi gửi API
        alert(res.message);
        this.reloadEvent.emit();
        this.dongModal.emit();
      });
    } 
   
    close() {
      this.dongModal.emit();
    }
}

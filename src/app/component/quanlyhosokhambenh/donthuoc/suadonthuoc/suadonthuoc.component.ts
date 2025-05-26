import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-suadonthuockhambenh',
  templateUrl: './suadonthuoc.component.html'
})
export class SuaDonThuocComponent implements AfterViewInit {
  @Input() danhSachThuoc: any[] = [];
  @Input() medicalRecordId!: string;
  @Output() dong = new EventEmitter<void>();
  @Output() taiLai = new EventEmitter<void>();

  @ViewChild('modalRef') modalRef!: ElementRef;

  constructor(private service: SharedService) {}

  ngAfterViewInit() {
    // Tự động focus hoặc thực hiện logic khi modal hiển thị (nếu cần)
    // Có thể thêm logic nếu dùng Bootstrap modal JS (nếu cần)
  }

  themThuocMoi() {
    this.danhSachThuoc.push({
      medicineId: null,
      medicine: { medicineName: '' },
      unit: '',
      quantity: 0
    });
  }

  xoaThuoc(index: number) {
    this.danhSachThuoc.splice(index, 1);
  }

  
  close() {
    // Chuẩn bị dữ liệu gửi API theo định dạng
    
    const body = {
      medicalRecordId: this.medicalRecordId,
      items: this.danhSachThuoc.map(x => ({
        medicineName: x.medicine.medicineName,
        quantity: x.quantity
      }))
    };
    
    this.service.updatePrescriptionDetails(body)
      .subscribe({
        next: (res) => {
          alert('Cập nhật danh sách thuốc thành công!');
          this.dong.emit();
          this.taiLai.emit();   // Gọi reload sau khi cập nhật thành công
        },

        error: (err) => {
          const message = err.error?.message || 'Cập nhật danh sách thuốc thất bại!';
          alert(message);
          this.dong.emit();
          this.taiLai.emit();  
        }
      }); 
      this.taiLai.emit();  
  }
  closeV2() {
    this.dong.emit();
    this.taiLai.emit();
  }
  danhSachMedicine: any[] = [];
  ngOnInit() {
  this.service.getAllMedicineName().subscribe(res => {
    this.danhSachMedicine = res;

    // Gán medicineId nếu chưa có
    this.danhSachThuoc.forEach(thuoc => {
      if (!thuoc.id && thuoc.medicine?.id) {
        thuoc.id = thuoc.medicine.id;
      }
    });
  });
  console.log(this.danhSachThuoc); 
}
onThuocChange(index: number) {
  const selectedId = this.danhSachThuoc[index].medicineId;
  const selectedMedicine = this.danhSachMedicine.find(m => m.id === selectedId);
  if (selectedMedicine) {
    this.danhSachThuoc[index].medicine = selectedMedicine;
  }
}


}

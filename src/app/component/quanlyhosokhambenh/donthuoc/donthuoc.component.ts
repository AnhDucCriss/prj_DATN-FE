import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-donthuoc',
  templateUrl: './donthuoc.component.html',
  styleUrls: ['./donthuoc.component.scss']
})
export class DonthuocComponent {
  patientName: string = '';
  doctorName: string = '';
  hsId: string = "";
  danhSachThuoc: any = {
    items: [],
    
  };
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: SharedService,
      private location: Location
    ) {}
  ngOnInit(): void {
    this.hsId = this.route.snapshot.paramMap.get('id') || '';
    this.taiLaiDuLieu();
  }

  taiLaiDuLieu(): void {
    
      
    this.service.getPrescriptionByMRID(this.hsId)
      .subscribe(res => {
      this.patientName = res.patientName;
      this.doctorName = res.doctorName;
      this.danhSachThuoc.items = res.prescriptionDetails;
      
    });
  }


  quayLai(): void {
    this.location.back();
  }

  

  hienSuaDonThuoc = false;

  capNhatThuoc(thuoc: any) {
  const updateRequest = {
    id: thuoc.id, // ID của thuốc trong đơn
    quantity: thuoc.quantity,
    unit: thuoc.unit,
    medicineName: thuoc.medicineName ?? thuoc.medicine?.medicineName // tùy dữ liệu
  };

  this.service.updatePrescriptionDetails(updateRequest).subscribe(
    res => console.log("Cập nhật thành công"),
    err => console.error("Lỗi khi cập nhật", err)
  );
}

  

}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { Location } from '@angular/common';
import { Observer } from 'rxjs';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.scss']
})

export class HoadonComponent {
  hsId: string = "";
  patientName: string = '';
  doctorName: string = '';

  convertMethod(method: number): string {
    return method === 0 ? 'Chuyển khoản' : method === 1 ? 'Tiền mặt' : 'Khác';
  }

  convertStatus(status: number): string {
    return status === 0 ? 'Chưa thanh toán' : status === 1 ? 'Đã thanh toán' : 'Khác';
  }

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: SharedService,
      private location: Location
    ) {}

  invoiceData!: Invoice; 
  ngOnInit(): void {
    this.hsId = this.route.snapshot.paramMap.get('id') || '';

    console.log(this.hsId);

    this.service.getInvoiceByMRID(this.hsId).subscribe(
    res => {
      this.invoiceData = res;
    },
    err => {
      console.error('Lỗi lấy hóa đơn:', err);
    }
  );
    this.loadInvoice();
  }
 
  
  loadInvoice() {
    this.service.getInvoiceByMRID(this.hsId).subscribe(
      res => {
        this.invoiceData = res;
      },
      error => {
        console.error('Lỗi khi tải hóa đơn:', error);
      }
    );
  }

  printInvoice() {
    this.service.exportInvoice(this.hsId).subscribe(blob => {
          const fileName = `HoaDonCua_${this.invoiceData.patientName}.pdf`;
          saveAs(blob, fileName); 
    });
  } 

  quayLai(): void {
    this.location.back();
  }

  dangSua: boolean = false;
  hoaDonDangSua: any = null;
  hoSoID: string = this.hsId;
  chonHoaDonDeSua(hsId: any): void {
    this.hoaDonDangSua = hsId;
    this.dangSua = true;
    
  }

  dongModalSua(): void {
    this.dangSua = false;
    console.log('Đóng modal sửa');
  }


}
export interface Invoice {
  medicalRecordID: string;
  patientName: string;
  doctorName: string;
  examinationDate: string; // hoặc Date nếu muốn parse
  conclusion: string;
  totalAmout: number;
  paymentMethod: number;
  paymentStatus: number;
}
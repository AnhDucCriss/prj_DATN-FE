import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { Location } from '@angular/common';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.scss']
})

export class HoadonComponent {
  hsId: string = "";
  patientName: string = '';
  doctorName: string = '';
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
 
  
  togglePaymentStatus(event: any) {
    const confirmed = confirm("Xác nhận cập nhật trạng thái thanh toán?");
    if (!confirmed) {
      event.target.checked = this.invoiceData.paymentStatus; // huỷ thì revert lại
      return;
    }

    this.service.updatePaymentStatus(this.hsId).subscribe(
      () => {
        // giả sử backend tự set về true
        this.loadInvoice(); // Gọi lại hàm lấy dữ liệu
      },
      error => {
        alert("Cập nhật thất bại");
        event.target.checked = this.invoiceData.paymentStatus; // reset nếu lỗi
      }
    );
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


  quayLai(): void {
    this.location.back();
  }
}
export interface Invoice {
  patientName: string;
  doctorName: string;
  examinationDate: string; // hoặc Date nếu muốn parse
  conclusion: string;
  totalAmout: number;
  paymentStatus: boolean;
}
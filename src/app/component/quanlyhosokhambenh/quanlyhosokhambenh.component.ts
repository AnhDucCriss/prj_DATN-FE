import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-quanlyhosokhambenh',
  templateUrl: './quanlyhosokhambenh.component.html',
  styleUrls: ['./quanlyhosokhambenh.component.scss']
})
export class QuanlyhosokhambenhComponent {
  constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const patientId = this.route.snapshot.paramMap.get('id');
  // Gọi API lấy hồ sơ bệnh nhân với ID này
}
}

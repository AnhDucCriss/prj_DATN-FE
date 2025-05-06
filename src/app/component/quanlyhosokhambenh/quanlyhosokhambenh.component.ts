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
  
    this.route.queryParams.subscribe(params => {
      const fullName = params['name'];
      console.log('ID bệnh nhân:', patientId);
      console.log('Tên bệnh nhân:', fullName);
    });
  }

}

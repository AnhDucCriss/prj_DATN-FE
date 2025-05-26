import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { Location } from '@angular/common';

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
  ngOnInit(): void {
    this.hsId = this.route.snapshot.paramMap.get('id') || '';

    console.log(this.hsId);
    
  }
  quayLai(): void {
    this.location.back();
  }
}

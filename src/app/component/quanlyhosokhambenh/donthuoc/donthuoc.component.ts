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
  hsId: string = "";
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

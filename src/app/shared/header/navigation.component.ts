import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  username: string = '';
  

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';
  }

  public showSearch = false;

  constructor(private modalService: NgbModal, private router: Router) {
  }

  logout() {
    localStorage.removeItem('token');       // xoá token
    localStorage.removeItem('username');    // xoá username nếu cần
    this.router.navigate(['/login']);
  }
  ngAfterViewInit() { }
}

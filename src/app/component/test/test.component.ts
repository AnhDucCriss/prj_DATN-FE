import { Input, Component, OnInit } from '@angular/core';
import {  } from '@ng-bootstrap/ng-bootstrap';
import { TableRows, DungCu } from './test-table-data';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ngbd-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'test.component.html',
  styles: [
    `
      .alert-custom {
        color: #cc4dd5;
        background-color: #f0c4f3;
        border-color: #f0c4f3;
      }
    `,
  ],
})
export class TestComponent {
  
  
    trow: TableRows[];
  
    constructor() {
  
      this.trow = DungCu;
    }
    
}


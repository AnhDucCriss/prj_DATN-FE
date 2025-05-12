import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('https://localhost:44316/api/login', this.loginData)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.accessToken); // <-- phải là accessToken
        localStorage.setItem('username', res.userName);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
      }
    });
  }
  // reLogin(){
  //   this.login().subscribe(

  //   );
  // }
}

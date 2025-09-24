import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isMobile = false;
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkMobile();
  }

  @HostListener('window:resize')
  checkMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  onLogin(): void {
    this.authService.userLogin(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        localStorage.setItem('authToken', (response as any).token);

        let role = (response as any).user.role;

        if(role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        } 
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }
}

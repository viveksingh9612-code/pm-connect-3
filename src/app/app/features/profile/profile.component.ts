import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any = null;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (response: any) => {
        // Map API response to user object for the template
        this.user = {
          avatar: '/assets/profile/default-avatar.png',
          fullName: [response.firstName, response.middleName, response.lastName].filter(Boolean).join(' '),
          role: response.role || '',
          status: response.userPreference || '',
          employeeId: response.username || '',
          email: response.email || '',
          phone: response.phoneNumber || '',
          team: response.project || '',
          cab: response.cabDetail || {}
        };
      },
      error: (error) => {
        console.error('Failed to fetch user data:', error);
        alert('Failed to load user data. Please try again later.');
      }
    });
  }
}

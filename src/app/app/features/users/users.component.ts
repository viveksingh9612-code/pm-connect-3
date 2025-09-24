import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log('Fetched users:', response);
        this.users = response || [];

        console.log('Users array:', this.users);
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
        alert('Failed to load users. Please try again later.');
      }
    });
  }
}

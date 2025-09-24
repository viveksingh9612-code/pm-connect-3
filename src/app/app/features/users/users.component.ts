import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];

  // Pagination variables
  pageSize: number = 10; // users per page
  currentPage: number = 1;
  totalPages: number = 1;

  firstNameFilter: string = '';

  selectedUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (response: any) => {
        this.users = response || [];
        this.applyFilter(); 
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
        alert('Failed to load users. Please try again later.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  applyFilter(): void {
    console.log('Applying filter with firstName:', this.firstNameFilter);

    const filterValue = this.firstNameFilter.toLowerCase().trim();

    // Filter by first name
    this.filteredUsers = filterValue
      ? this.users.filter(u => (u.firstName || '').toLowerCase().includes(filterValue))
      : [...this.users];

    // Update pagination
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
    this.setPage(1);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  openUserModal(user: any) {
    this.selectedUser = user;
  }

  closeUserModal() {
    this.selectedUser = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.css'
})
export class UserPreferencesComponent implements OnInit {
  userPreferences: any[] = [];
  filteredPreferences: any[] = [];
  paginatedPreferences: any[] = [];

  // Pagination variables
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  nameFilter: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getallUserPreferences().subscribe({
      next: (response: any) => {
        this.userPreferences = response || [];
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to fetch user preference:', error);
        alert('Failed to load user preferences. Please try again later.');
      }
    });
  }

  goBack() {
    window.history.back(); // or use Angular Router: this.router.navigate(['/previous-route']);
  }

  applyFilter(): void {
    const filterValue = this.nameFilter.toLowerCase().trim();
    this.filteredPreferences = filterValue
      ? this.userPreferences.filter(pref =>
          (pref.userId?.firstName || '').toLowerCase().includes(filterValue) ||
          (pref.userId?.lastName || '').toLowerCase().includes(filterValue) ||
          (pref.userId?.username || '').toLowerCase().includes(filterValue)
        )
      : [...this.userPreferences];

    this.totalPages = Math.ceil(this.filteredPreferences.length / this.pageSize) || 1;
    this.setPage(1);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPreferences = this.filteredPreferences.slice(startIndex, endIndex);
  }

  downloadData() {
    if (!this.paginatedPreferences || this.paginatedPreferences.length === 0) {
      alert('No data to download!');
      return;
    }

    // Prepare data for Excel
    const exportData = this.paginatedPreferences.map((pref, index) => ({
      '#': (this.currentPage - 1) * this.pageSize + index + 1,
      'Full Name': [pref.userId?.firstName, pref.userId?.middleName, pref.userId?.lastName].filter(Boolean).join(' '),
      'Username': pref.userId?.username || '',
      'Email': pref.userId?.email || '',
      'Phone': pref.userId?.phoneNumber || '',
      'Accommodation': pref.accommodationRequired ? 'Yes' : 'No',
      'Arrival': pref.arrivalDate ? new Date(pref.arrivalDate).toLocaleDateString() : '-',
      'Departure': pref.departureDate ? new Date(pref.departureDate).toLocaleDateString() : '-',
      'Food Preference': pref.foodPreference ? pref.foodPreference : '-'
    }));

    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = { Sheets: { 'User Preferences': worksheet }, SheetNames: ['User Preferences'] };

    // Write workbook and save
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'user-preferences.xlsx');
  }
}

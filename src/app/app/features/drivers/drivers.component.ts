import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { first } from 'rxjs';

interface Driver {
  driverId: string;
  driverName: string;
  driverNumber: string;
  cabNumber: string;
  startingPoint: string;
  middleStoppagePoints: string;
  stoppingPoint: string;
  users: {
    username: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
  }[];
}

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  selectedDriver: Driver | null = null; // store cab clicked
  showModal = false;

  get totalPages(): number {
    return Math.ceil(this.drivers.length / this.itemsPerPage);
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllCabDrivers().subscribe({
      next: (response: any) => {
        this.drivers = (response || []).map((d: any) => ({
          driverId: d.driverId,
          driverName: d.driverName,
          driverNumber: d.driverNumber,
          cabNumber: d.cabNumber,
          startingPoint: d.startingPoint,
          middleStoppagePoints:
            Array.isArray(d.middleStoppagePoints) && d.middleStoppagePoints.length
              ? d.middleStoppagePoints.join(', ')
              : '-',
          stoppingPoint: d.stoppingPoint,
          users: (d.users || []).map((u: any) => ({
            username: u.username,
            email: u.email,
            phoneNumber: u.phoneNumber,
            firstName: u.firstName,
            lastName: u.lastName,
            middleName: u.middleName
          }))
        }));
      },
      error: (error) => {
        console.error('Failed to fetch drivers:', error);
        alert('Failed to load drivers. Please try again later.');
      }
    });
  }

  // Pagination helpers
  get paginatedDrivers(): Driver[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.drivers.slice(start, start + this.itemsPerPage);
  }
  goToPage(page: number) { if (page >= 1 && page <= this.totalPages) this.currentPage = page; }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  prevPage() { if (this.currentPage > 1) this.currentPage--; }

  // Modal logic
  openModal(driver: Driver) {
    this.selectedDriver = driver;
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.selectedDriver = null;
  }

  goBack() {
    window.history.back(); // or use Angular Router: this.router.navigate(['/previous-route']);
  }
}

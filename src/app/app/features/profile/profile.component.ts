import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any = null;
  showPreferencesModal = false;
  preferencesForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.preferencesForm = this.fb.group({
      accommodation: ['', Validators.required],
      arrivalDate: [''],
      departureDate: [''],
      foodPreference: ['', Validators.required]
    });

    // Dynamic validation
    this.preferencesForm.get('accommodation')?.valueChanges.subscribe(value => {
      if (value === 'true') {
        this.preferencesForm.get('arrivalDate')?.setValidators([Validators.required]);
        this.preferencesForm.get('departureDate')?.setValidators([Validators.required]);
      } else {
        this.preferencesForm.get('arrivalDate')?.clearValidators();
        this.preferencesForm.get('departureDate')?.clearValidators();
      }
      this.preferencesForm.get('arrivalDate')?.updateValueAndValidity();
      this.preferencesForm.get('departureDate')?.updateValueAndValidity();
    });
  }

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

  goBack() {
    window.history.back(); // or use Angular Router: this.router.navigate(['/previous-route']);
  }

  logout() {
    // your logout logic
    console.log('Logging out...');

    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Redirect to login page
  }

  openPreferencesModal() {
    this.showPreferencesModal = true;
  }

  closePreferencesModal() {
    this.showPreferencesModal = false;
    this.preferencesForm.reset();
  }

  submitPreferences() {
    if (this.preferencesForm.valid) {
      console.log("Preferences:", this.preferencesForm.value);
      this.closePreferencesModal();
    }
  }
}

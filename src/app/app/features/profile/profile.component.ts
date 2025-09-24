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

  userPreference: any = null;

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
    this.getProfileData();
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
      const raw = this.preferencesForm.value;

      // Transform values
      const data = {
        accommodationRequired: raw.accommodation === 'true', // convert string -> boolean
        arrivalDate: raw.arrivalDate ? new Date(raw.arrivalDate).toISOString() : null,
        departureDate: raw.departureDate ? new Date(raw.departureDate).toISOString() : null,
        foodPreference: raw.foodPreference
      };

      console.log("Formatted Preferences:", data);

      this.closePreferencesModal();

      this.authService.addUserPreference(data).subscribe({
        next: (response) => {
          console.log('Preferences saved successfully:', response);
          this.getProfileData();

          this.getPreferenceData();
        },
        error: (error) => {
          console.error('Failed to save preferences:', error);
          alert('Failed to save preferences. Please try again later.');
        }
      });
    }
  }

  getProfileData() {
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

        if(response.userPreference !== "pending") {
          this.getPreferenceData();
        }
      },
      error: (error) => {
        console.error('Failed to fetch user data:', error);
        alert('Failed to load user data. Please try again later.');
      }
    });
  }

  getPreferenceData() {
    this.authService.getUserPreference().subscribe({
      next: (response: any) => {
        console.log('User preferences fetched:', response);

        this.userPreference = response;
      },
      error: (error) => {
        console.error('Failed to fetch user preferences:', error);
        alert('Failed to load user preferences. Please try again later.');
      }
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = {
    avatar: '/assets/profile/default-avatar.png',
    fullName: 'John Doe',
    role: 'Invitee',
    email: 'john.doe@email.com',
    employeeId: '123456',
    phone: '+91-9876543210',
    department: 'Product Management',
    team: 'Core Platform',
    manager: 'Michael Rodriguez',
    joinDate: 'March 15, 2022',
    location: 'San Francisco, CA',
    status: 'Active',
    projects: 12,
    tasksDone: 85,
    rating: 95,
    cab: {
    driverName: 'Ramesh Kumar',
    driverNumber: '+91-9876543210',
    cabNumber: 'MH12 AB 3456',
    startingPlace: 'Baner, Pune',
    middleStop: 'Hinjewadi Phase 2',
    endingLocation: 'Magarpatta, Pune'
  }
  };
}

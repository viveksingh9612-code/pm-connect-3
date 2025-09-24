import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  videos = [
    { title: 'Welcome to Jakson Infra', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Event Highlights', url: 'https://www.youtube.com/embed/3GwjfUFyY6M' }
    // ...add more as needed
  ];

  documents = [
    { name: 'Event Schedule.pdf', url: '/assets/documents/event-schedule.pdf' },
    { name: 'Venue Map.pdf', url: '/assets/documents/venue-map.pdf' }
    // ...add more as needed
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  heroData = {
    badge: 'JAKSON GROUP INTERNAL PLATFORM',
    title: 'PM Connect 3.0',
    subtitle: 'Simplifying Event Logistics & Collaboration',
    description:
      "A secure platform for invitees and admins to manage logistics, documents, and galleries for Jakson's events. Streamline your event experience with our comprehensive internal management system.",
    buttons: [
      { label: 'Login to Portal', link: '/login' },
      { label: 'Learn More', link: '#about' },
    ],
  };
}

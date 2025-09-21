import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  sectionTitle = 'Powerful Features for';
  sectionHighlight = 'Every User';
  sectionDescription = 'Comprehensive tools designed to streamline event management, enhance collaboration, and ensure secure operations for all Jakson Group events.';

  featureCards = [
    {
      type: 'For Invitees',
      icon: '👥',
      bgColor: 'bg-blue-100',
      iconColor: 'bg-blue-600',
      features: [
        { icon: '✈️', text: 'Submit travel & accommodation details' },
        { icon: '📄', text: 'Access event documents instantly' },
        { icon: '📷', text: 'Upload and share event photos' },
        { icon: '🖼️', text: 'Browse comprehensive event gallery' },
      ],
      imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/7edb2e865e-86194e5a3a6a262a0c31.png', // Replace later
    },
    {
      type: 'For Admins',
      icon: '🛠️',
      bgColor: 'bg-red-100',
      iconColor: 'bg-red-500',
      features: [
        { icon: '👤', text: 'Manage invitees and permissions' },
        { icon: '💬', text: 'Send WhatsApp notifications' },
        { icon: '📁', text: 'Upload documents and media' },
        { icon: '📊', text: 'Track responses and export reports' },
      ],
      imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f0603220a2-30010f367a1faf3b6e4c.png', // Replace later
    }
  ];
}

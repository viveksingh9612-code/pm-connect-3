import { Component } from '@angular/core';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrl: './working.component.css'
})
export class WorkingComponent {
  sectionTitle = 'How It Works';
  sectionSubtitle = 'Simple, intuitive steps to get you connected and managing your event logistics efficiently';

  steps = [
    {
      icon: '🔐',
      title: 'Login with Employee ID',
      description: 'Secure authentication using your Jakson Group Employee ID and credentials',
      iconColor: 'bg-red-500',
      underlineColor: 'border-red-500'
    },
    {
      icon: '📝',
      title: 'Fill Logistics Form',
      description: 'Complete your travel, accommodation, and dietary preferences in minutes',
      iconColor: 'bg-blue-600',
      underlineColor: 'border-blue-600'
    },
    {
      icon: '📁',
      title: 'Access Documents & Gallery',
      description: 'View agendas, safety booklets, and browse event photos instantly',
      iconColor: 'bg-purple-500',
      underlineColor: 'border-purple-500'
    },
    {
      icon: '📊',
      title: 'Admin Management',
      description: 'Admins track responses, send notifications, and export comprehensive reports',
      iconColor: 'bg-green-500',
      underlineColor: 'border-green-500'
    }
  ];
}

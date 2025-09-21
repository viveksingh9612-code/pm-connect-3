import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  stats: {
    icon: SafeHtml,
    value: string,
    label: string,
    bgColor: string,
    iconColor: string
  }[];

  constructor(private sanitizer: DomSanitizer) {
    this.stats = [
      {
        // Users icon
        icon: this.sanitizer.bypassSecurityTrustHtml(
          `<svg viewBox="0 0 640 512" fill="currentColor" width="32" height="32">
            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path>
          </svg>`
        ),
        value: '100+',
        label: 'Active Users',
        bgColor: 'bg-red-100',
        iconColor: 'bg-red-500'
      },
      {
        // Calendar Check icon
        icon: this.sanitizer.bypassSecurityTrustHtml(
          `<svg viewBox="0 0 448 512" fill="currentColor" width="32" height="32">
            <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"></path>
          </svg>`
        ),
        value: '3+',
        label: 'Events Managed',
        bgColor: 'bg-blue-100',
        iconColor: 'bg-blue-600'
      },
      {
        // Shield Halved icon
        icon: this.sanitizer.bypassSecurityTrustHtml(
          `<svg viewBox="0 0 512 512" fill="currentColor" width="32" height="32">
            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"></path>
          </svg>`
        ),
        value: '99.9%',
        label: 'Uptime',
        bgColor: 'bg-green-100',
        iconColor: 'bg-green-500'
      },
      {
        // Clock icon
        icon: this.sanitizer.bypassSecurityTrustHtml(
          `<svg viewBox="0 0 512 512" fill="currentColor" width="32" height="32">
            <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
          </svg>`
        ),
        value: '24/7',
        label: 'Support',
        bgColor: 'bg-purple-100',
        iconColor: 'bg-purple-500'
      }
    ];
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  navItems = [
    { label: 'Home', link: '/' },
    { label: 'Features', link: '/features' },
    { label: 'How It Works', link: '/how-it-works' },
    { label: 'Documents', link: '/documents' },
    { label: 'Gallery', link: '/gallery' },
    { label: 'Contact', link: '/contact' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

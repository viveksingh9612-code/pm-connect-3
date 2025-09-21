import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {

  }

  login() {
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

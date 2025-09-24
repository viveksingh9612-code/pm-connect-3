import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


interface GalleryImage {
  src: string;
  alt: string;
}

interface Image {
  src: string;
  alt: string;
}

interface Document {
  name: string;
  url: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{
  isMenuOpen = false;

  videos: { title: string, url: SafeResourceUrl }[] = [];

  selectedImage: Image | null = null;

  selectedDoc: { name: string, url: SafeResourceUrl } | null = null;

  images: GalleryImage[] = [
    { src: '/assets/eventpics/1/event1.jpg', alt: 'Event Image 1' },
    { src: '/assets/eventpics/1/event2.jpg', alt: 'Event Image 2' },
    { src: '/assets/eventpics/1/event3.jpg', alt: 'Event Image 3' },
    { src: '/assets/eventpics/1/event4.jpg', alt: 'Event Image 4' },
    { src: '/assets/eventpics/2/event1.jpg', alt: 'Event Image 5' },
    { src: '/assets/eventpics/2/event2.jpg', alt: 'Event Image 6' }
  ]

  rawVideos = [
    { title: 'Jakson Group', url: 'https://www.youtube.com/embed/eG3LkObFCO4' },
    { title: 'JAKSON - The Journey of 75+ years', url: 'https://www.youtube.com/embed/Vc_Tb45aUF4' }
  ];

  documents = [
    { name: 'Agenda', url: '/assets/documents/agenda.pdf' },
    { name: 'Safety Booklet', url: '/assets/documents/jaksonsafetybooklet.pdf' },
    { name: 'JJM Qality Handbook', url: '/assets/documents/qualityhandbookjmm.pdf' },
    { name: 'RDSS Quality Handbook', url: '/assets/documents/qualityhandbookrdss.pdf' },
    { name: 'Safety Flayer', url: '/assets/documents/safetyflayer.pdf' }
    // ...add more as needed
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
  ) {
    this.videos = this.rawVideos.map(video => ({
      title: video.title,
      url: this.sanitizer.bypassSecurityTrustResourceUrl(video.url)
    }));
  }

  ngOnInit(): void {
    let token = localStorage.getItem('authToken');
    if(!token) {
      this.router.navigate(['/login']); // Redirect to login page
    } else {
      // User is authenticated, proceed as normal
      this.authService.verifyToken().subscribe({
        next: (response: any) => {
          console.log('Token is valid:', response);

          if(response.valid) {
            console.log('User is authenticated');
          } else {
            console.log('Invalid token, redirecting to login');
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']); // Redirect to login page
          }
        },
        error: (error) => {
          console.error('Invalid token:', error);
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']); // Redirect to login page
        }
      });
    }
  }

  openModal(img: Image) {
    this.selectedImage = img;
  }

  closeModal() {
    this.selectedImage = null;
  }

  openDoc(doc: Document) {
    this.selectedDoc = {
      name: doc.name,
      url: this.sanitizer.bypassSecurityTrustResourceUrl(doc.url)
    };
  }

  closeDoc() {
    this.selectedDoc = null;
  }

  logout() {
    // Clear session, token, or redirect to login
    console.log('Logging out...');

    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Redirect to login page
  }
}

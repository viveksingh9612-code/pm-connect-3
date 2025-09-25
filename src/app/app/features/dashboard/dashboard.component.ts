import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DocumentService } from '../../core/services/document.service';

interface GalleryImage {
  src: string;
  alt: string;
}

interface Document {
  name: string;
  url: string;
}

interface Video {
  title: string;
  url: SafeResourceUrl;
  type: 'video' | 'iframe';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isMenuOpen = false;
  about: any;
  videos: Video[] = [];
  images: GalleryImage[] = [];
  documents: Document[] = [];

  selectedImage: GalleryImage | null = null;
  selectedDoc: any = null;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private docService: DocumentService,
  ) {}

  ngOnInit(): void {
    this.loadEventContent();

    const token = localStorage.getItem('authToken');
    if (!token) this.router.navigate(['/login']);
    else this.verifyToken();
  }

  loadEventContent() {
    this.docService.getFile('h1yjrva0goolv1mhsyoy', "raw").subscribe({
      next: data => {
        console.log('Loaded event content from document service:', data);

        this.getDashboardData(data.url);
      },
      error: err => {
        console.error('Failed to load event content from document service', err);
        // Fallback to static JSON if document service fails
      }
    })

  }

  getDashboardData(url: string) {
    this.http.get<any>(url).subscribe({
      next: data => {
        this.about = data.about;

        // Videos: sanitize URLs
        this.videos = data.videos.map((video: any) => ({
          title: video.title,
          type: video.type,
          url: video.type === 'iframe'
            ? this.sanitizer.bypassSecurityTrustResourceUrl(video.url)
            : video.url
        }));

        // Images
        this.images = data.images;

        // Documents: sanitize URLs
        this.documents = data.documents.map((doc: any) => ({
          name: doc.name,
          url: doc.url
        }));
      },
      error: err => console.error('Failed to load event content JSON', err)
    });
  }

  openModal(img: GalleryImage) { this.selectedImage = img; }
  closeModal() { this.selectedImage = null; }

  openDoc(doc: Document) { 
    this.getUrl(doc.url, "image").subscribe((res) => {
      this.selectedDoc = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
    });
  }
  closeDoc() { this.selectedDoc = null; }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  verifyToken() {
    this.authService.verifyToken().subscribe({
      next: (res: any) => {
        if (!res.valid) {
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        console.error(err);
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
    });
  }

  getUrl(id: string, type: string) {
    return this.docService.getFile(id, type)
  }
}

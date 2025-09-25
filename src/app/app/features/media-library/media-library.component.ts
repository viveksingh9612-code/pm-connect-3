import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../core/services/document.service';

@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrl: './media-library.component.css'
})
export class MediaLibraryComponent implements OnInit{

  uploadedFile: any = null;

  documents: any[] = []

  images: any[] = []

  videos: any[] = []

  jsonFiles: any[] = [
    { name: 'dashboard-content.json', path: "h1yjrva0goolv1mhsyoy" }
  ]

  selectedJson: any = null;
  selectedJsonContent: any = null;
  selectedJsonText: string = '';

  constructor(
    private http: HttpClient,
    private docService: DocumentService
  ) { }

  ngOnInit(): void {
    
  }

  updateJsonFile(file: any) {
    console.log('Update JSON file:', file);

    console.log('File ID:', file.path);
    console.log('File Content:', this.selectedJsonText);

    try {
    // Convert the editable JSON text into a Blob
      const jsonBlob = new Blob([this.selectedJsonText], { type: 'application/json' });

      // Create a FormData object like in curl --form
      const formData = new FormData();
      formData.append('file', jsonBlob);

    // Send PUT request to your backend
      this.docService.updateFile(file.path, formData).subscribe({
        next: (res) => {
          console.log('File updated successfully', res);
          alert('JSON file updated successfully!');
          this.closeJsonModal();
        },
        error: (err) => {
          console.error('File update failed', err);
          alert('Failed to update JSON file');
        }
      });

    } catch (err) {
      console.error('Invalid JSON:', err);
      alert('Invalid JSON format. Please fix it before updating.');
    }
  }

  uploadVideo(event: any) {}

  uploadImage(event: any) {}

  uploadDocument(event: any) {}

  updateVideo(video: any) {}

  updateImage(image: any) {}

  updateDocument(doc: any) {}

  goBack() {
    window.history.back(); // or use Angular Router: this.router.navigate(['/previous-route']);
  }

  openJsonModal(jsonFile: any) {
    this.selectedJson = jsonFile;

    console.log('Selected JSON file:', jsonFile);

    this.docService.getFile(jsonFile.path, "raw").subscribe({
      next: data => {
        console.log('Loaded event content from document service:', data);

        this.http.get<any>(data.url).subscribe({
          next: data => {
            this.selectedJsonContent = data;
            this.selectedJsonText = JSON.stringify(this.selectedJsonContent|| {}, null, 2);
          },
          error: err => {
            console.error('Failed to load JSON:', err);
            this.selectedJsonContent = { error: 'Failed to load JSON' };
          }
        });
      },
      error: err => {
        console.error('Failed to load event content from document service', err);
        // Fallback to static JSON if document service fails
      }
    })
  }

  // Close modal
  closeJsonModal() {
    this.selectedJson = null;
    this.selectedJsonContent = null;
    this.selectedJsonText = '';
  }

  uploadAnyFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.docService.uploadFile(file).subscribe({
      next: (res) => {
        console.log('Upload successful', res);
        this.uploadedFile = res; // Open modal with response
      },
      error: (err) => console.error('Upload failed', err)
    });
  }

  closeUploadModal() {
    this.uploadedFile = null;
  }

  // Copy URL to clipboard
  copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => console.error('Failed to copy:', err));
  }
}

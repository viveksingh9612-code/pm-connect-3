import { Component } from '@angular/core';

interface GalleryImage {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  tabs = [
    { label: 'PM Connect 3.0', key: '3.0', color: 'red' },
    { label: 'PM Connect 2.0', key: '2.0', color: 'blue' },
    { label: 'PM Connect 1.0', key: '1.0', color: 'gray' }
  ];

  activeTab = '2.0';
  maxImages = 9;

  galleryData: { [key: string]: GalleryImage[] } = {};

  constructor() {
    this.loadGallery();
  }

  private mapKeyToFolder(key: string): string {
    return key.split('.')[0]; 
  }

  private async imageExists(url: string): Promise<boolean> {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return res.ok;
    } catch {
      return false;
    }
  }

  async loadGallery() {
    for (const tab of this.tabs) {
      const folder = this.mapKeyToFolder(tab.key);
      const images: GalleryImage[] = [];

      for (let i = 1; i <= this.maxImages; i++) {
        const url = `assets/eventpics/${folder}/event${i}.jpg`;
        const exists = await this.imageExists(url);
        if (exists) {
          images.push({ url, alt: `${tab.label} Event ${i}` });
        }
      }

      this.galleryData[tab.key] = images;
    }
  }

  get images(): GalleryImage[] {
    return this.galleryData[this.activeTab] || [];
  }

  get activeTabLabel(): string {
    const tab = this.tabs.find(t => t.key === this.activeTab);
    return tab ? tab.label : '';
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}

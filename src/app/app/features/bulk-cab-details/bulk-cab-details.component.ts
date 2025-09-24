import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bulk-cab-details',
  templateUrl: './bulk-cab-details.component.html',
  styleUrl: './bulk-cab-details.component.css'
})
export class BulkCabDetailsComponent implements OnInit{
  data: any[] = [];
  
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
  }

  exportTemplate(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      {
        "vehcileNumber": "DL1ZC4471",
        "driverName": "Sushant",
        "driverNumber": "9717743042",
        "startingPoint": "Hotel Holiday inn",
        "middleStoppagePoints": "NA",
        "stoppingPoint": "Jakson HO",
        "users": "123456, 1234567"
      }
    ]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cab Template');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'bulk-cab-upload-template.xlsx');
  }

  onFileChange(evt: any): void {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const json: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

      // Map cab details from file
      const cabDetails = json.map((row) => ({
        vehcileNumber: row['vehcileNumber'] || row['Vehicle Number'] || '',
        driverName: row['driverName'] || row['Driver Name'] || '',
        driverNumber: row['driverNumber'] || row['Driver Number'] || '',
        startingPoint: row['startingPoint'] || row['Starting Point'] || '',
        middleStoppagePoints: row['middleStoppagePoints'] || row['Middle Stoppage Points'] || '',
        stoppingPoint: row['stoppingPoint'] || row['Stopping Point'] || '',
        users: row['users'] || row['Users'] || ''
      }));

      console.log('Parsed Cab Data:', cabDetails);
      this.data = cabDetails;
    };

    reader.readAsBinaryString(target.files[0]);
  }

  uploadData(): void {
    console.log('Raw Cab Data:', this.data);

    // Transform data before upload
    const transformedData = this.data.map((item: any) => ({
      cabNumber: item.vehcileNumber, // rename
      driverName: item.driverName,
      driverNumber: String(item.driverNumber), // ensure string
      startingPoint: item.startingPoint,
      middleStoppagePoints: item.middleStoppagePoints,
      stoppingPoint: item.stoppingPoint,
      users: typeof item.users === 'string'
        ? item.users.split(',').map((u: string) => u.trim()) // split by comma
        : Array.isArray(item.users)
          ? item.users.map((u: any) => String(u).trim()) // clean array
          : [], // fallback if empty
    }));

    console.log('Transformed Cab Data:', transformedData);

    this.authService.uploadBulkCabRequests(transformedData).subscribe({
      next: (response) => {
        console.log('Bulk Cab Upload successful:', response);
        alert('Bulk cab details uploaded successfully!');
      },
      error: (error) => {
        console.error('Bulk Cab Upload failed:', error);
        alert('Bulk cab upload failed. Please try again.');
      },
    });
  }

  goBack() {
    window.history.back(); // or use Angular Router: this.router.navigate(['/previous-route']);
  }
}

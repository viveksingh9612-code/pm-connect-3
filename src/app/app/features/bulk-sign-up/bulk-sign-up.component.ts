import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-bulk-sign-up',
  templateUrl: './bulk-sign-up.component.html',
  styleUrl: './bulk-sign-up.component.css'
})
export class BulkSignUpComponent implements OnInit{
  data: any[] = [];

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
  }

  exportTemplate(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      { "Employee ID": "", "Name": "", "Email": "", "Role": "" }
    ]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'bulk-signup-template.xlsx');
  }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const binaryData = e.target.result;
  //     const workbook = XLSX.read(binaryData, { type: 'binary' });

  //     // Get first sheet name
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];

  //     // Convert sheet to JSON
  //     const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  //     console.log('Excel JSON:', jsonData);

  //     this.data = jsonData;

  //     // Optional: Convert to CSV
  //     const csv = XLSX.utils.sheet_to_csv(sheet);
  //     console.log('CSV Content:\n', csv);

  //     // Optional: Save CSV to client
  //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  //     saveAs(blob, 'export.csv');
  //   };

  //   reader.readAsBinaryString(file);
  // }

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

      // Sample mapping logic for demonstration
      const users = json.map((row, idx) => {
        // Use sample usernames/emails for demonstration as per your prompt
        
          // Default mapping for any additional rows
          return {
            username: row['username'] || '',
            firstName: row['firstName'] || row['First Name'] || '',
            middleName: row['middleName'] || row['Middle Name'] || '',
            lastName: row['lastName'] || row['Last Name'] || '',
            gender: row['gender'] || '',
            post: row['post'] || '',
            role: row['role'] || '',
            project: row['project'] || '',
            email: row['email'] || '',
            phoneNumber: row['phoneNumber'] || row['Phone Number'] || ''
          };
        
      });

      console.log(users);

      this.data = users;
    };
    reader.readAsBinaryString(target.files[0]);
  }

  uploadData(): void {
    console.log('Uploading data:', this.data);

    this.authService.bulkSignUp(this.data).subscribe({
      next: (response) => {
        console.log('Bulk sign-up successful:', response);
        alert('Bulk sign-up successful!');
      },
      error: (error) => {
        console.error('Bulk sign-up failed:', error);
        alert('Bulk sign-up failed. Please try again.');
      }
    });
  }

  goBack() {
    window.history.back(); // or use Angular Router: this.router.navigate(['/previous-route']);
  }
}

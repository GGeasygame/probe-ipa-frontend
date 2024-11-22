import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent implements OnInit {
  name: string = '';
  response: string | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8080/hello', { responseType: 'text' })
      .subscribe({
        next: (response: string) => (this.response = response),
        error: (err) => {
          console.error('HTTP Error:', err);
          this.response = 'An error occurred while fetching the response.';
        },
      });
  }

  sendName(): void {
    this.http.get(`http://localhost:8080/hello?myName=${encodeURIComponent(this.name)}`, { responseType: 'text' })
      .subscribe({
        next: (response: string) => (this.response = response),
        error: (err) => {
          console.error('HTTP Error:', err);
          this.response = 'An error occurred while sending your name.';
        },
      });
  }
}

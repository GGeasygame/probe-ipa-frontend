import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed typo styleUrl -> styleUrls
  standalone: true,
})
export class AppComponent implements OnInit {
  name: string = ''; // To hold the user's input
  response: string | undefined; // To display the response

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Optional: Fetch the default response on initialization
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
    // Make a request with the name provided by the user
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

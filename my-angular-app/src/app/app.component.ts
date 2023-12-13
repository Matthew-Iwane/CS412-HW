import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any[] = []; // Assuming your data structure is an array
  dataAvailable: boolean = false;

  constructor(private httpClient: HttpClient) {}

  // Function to simulate fetching data from the PS4 backend
  fetchData() {
    // Replace with your actual backend API endpoint
    const ps4BackendEndpoint = 'http://localhost:3000/ps4';

    // Simulate fetching data from the PS4 backend
    this.httpClient.post<any>(ps4BackendEndpoint, { searchString: 'example' })
      .subscribe(response => {
        // Update data and set dataAvailable flag
        this.data = response.data;
        this.dataAvailable = true;
      });
  }
}

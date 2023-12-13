import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any[] = [];
  dataAvailable: boolean = false;

  constructor(private httpClient: HttpClient, private searchService: SearchService) {}

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

  // Function to handle search using the new SearchService
  search(searchTerm: string) {
    this.searchService.search(searchTerm).subscribe(response => {
      this.data = response.data;
      this.dataAvailable = true;
    });
  }
}

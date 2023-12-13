import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  template: `
    <div *ngIf="data.length > 0">
      <h2>Search Results:</h2>
      <div *ngFor="let item of data">
        <!-- Display your data properties here, adjust as per your actual data structure -->
        <p>{{ item.title }}</p>
        <p>{{ item.body }}</p>
        <!-- Add more properties as needed -->
      </div>
    </div>
    <div *ngIf="data.length === 0">
      <p>No results found.</p>
    </div>
  `,
})
export class SearchResultComponent {
  @Input() data: any[];
}

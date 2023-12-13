import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="onSubmit()">
      <label for="searchTerm">Search Term:</label>
      <input id="searchTerm" type="text" formControlName="searchTerm" />
      <button type="submit" [disabled]="!searchForm.valid">Query</button>
    </form>
  `,
})
export class SearchFormComponent {
  @Output() search = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value.searchTerm);
    }
  }
}

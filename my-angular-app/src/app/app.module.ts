import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form.component';
import { SearchResultComponent } from './search-result.component';
import { SearchService } from './search.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

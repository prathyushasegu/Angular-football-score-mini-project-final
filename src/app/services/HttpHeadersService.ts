import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpHeadersService {
  private headers: HttpHeaders;
  private apiKey = '73effe53b514fe164eb475247efecbe2';

  constructor() {
    // Initialize common headers
    this.headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io/fixtures',
      'x-rapidapi-key': this.apiKey, // You can store your API key here
    });
  }

  getHeaders(): HttpHeaders {
    return this.headers;
  }
}

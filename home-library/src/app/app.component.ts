import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app work!';
  books;

  constructor(public http: Http) {
    http.get('http://localhost:3000/books.json')
      .subscribe(res => this.books = res.json());
  }
}

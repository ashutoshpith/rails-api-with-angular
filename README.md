# Rails Api With Angular

### install angular on your system

**npm install -g @angular/cli** 

```
mkdir getting_started
```
```
cd getting_started
```
```
ng new home-library
```
```
 cd home-library
 ```
 
 ```
 ng serve  ***/start the angular server***
```

# Rails Section


```
rails new home_library --api -T -d postgresql
```
```
cd home_library
```
```
rails db:create
```
```
rails generate scaffold book name:string
```
```
rails db:migrate
```

# db/seeds.rb

* False data for testing
 
 ```
Book.create!([
  { name: 'Copying and Pasting from Stack Overflow' },
  { name: 'Trying Stuff Until it Works' }
])
```
rails server  /start the rails server via cmd line

And if you visit http://localhost:3000/books.json you see content

Enable CORS so the Angular app can talk to the Rails app
The first step is to uncomment rack-cors in the Gemfile.

# Gemfile
```
gem 'rack-cors'
```
```
bundle install
```

* Then make config/initializers/cors.rb look like this

```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
      headers: :any,
      expose:  ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
# Angular Section

* Get Angular to talk to Rails

* Modify src/app/app.module.ts 

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
 import { HttpModule } from '@angular/http';
/** import HttpModule to talk with rails */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```




* Modify src/app/app.component.ts 


* src/app/app.component.ts

 ```
import { Component } from '@angular/core';
import { Http } from '@angular/http';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  books;
 
  constructor(private http: Http) {
    http.get('http://localhost:3000/books.json')
      .subscribe(res => this.books = res.json());
  }
}
```
* Modify src/app/app.component.html

```
h1>
  {{title}}
</h1>
 
<ul>
  <li *ngFor="let book of books">{{ book.name }}</li>
</ul>
```

* Now, if you refresh the page at http://localhost:4200
Angular6 is connected to rails 5.2


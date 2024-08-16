import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  product = {
    title: 'product name',
    image: 'product-1.png',
    price: 2499,
    rating: 4
  }
}

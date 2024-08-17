import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products = [
    {
      title: 'product name',
      image: 'product-2.png',
      price: 2499,
      rating: 4,
    },
    {
      title: 'product name',
      image: 'product-3.png',
      price: 2499,
      rating: 3,
    },
    {
      title: 'product name',
      image: 'product-4.png',
      price: 2499,
      rating: 5,
    },
    {
      title: 'product name',
      image: 'product-5.png',
      price: 2499,
      rating: 1,
    },
    {
      title: 'product name',
      image: 'product-5.png',
      price: 2499,
      rating: 1,
    },
    {
      title: 'product name',
      image: 'product-5.png',
      price: 2499,
      rating: 1,
    },
  ];

  currentIndex: number = 0;
  autoSlideInterval: any;
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  images: string[] = [
    'images/34.jpg',
    'images/32.jpg',
    'images/31.jpg',
    'images/35.jpg'
  ];

  currentIndex: number = 0;
  autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000); // Auto-slide every 3 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

import { AfterViewInit, Component } from '@angular/core';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent{
  number :number=0;
  increment(){
    this.number=this.number+1
  }
  decrement(){
    if(this.number >0){
      this.number=this.number-1
    }
  }


  images: string[] = [
    'images/product-details-1.png',
    'images/product-details-1.png',
    'images/product-details-1.png',
    'images/product-details-1.png',
    'images/product-details-1.png',
    'images/product-details-1.png',
    'images/product-details-1.png',
  ];
 
 constructor( ){}
 
 currentSlide = 0;

 get translateX() {
  return -this.currentSlide * 100 / 3; 
}

prevSlide() {
  if (this.currentSlide === 0) {
    this.currentSlide = this.images.length - 4; // Loop to the last set of slides
  } else {
    this.currentSlide--;
  }
}

nextSlide() {
  if (this.currentSlide === this.images.length - 4) {
    this.currentSlide = 0; // Loop back to the first slide
  } else {
    this.currentSlide++;
  }
}


  
}

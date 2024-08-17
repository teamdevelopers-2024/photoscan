import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
 
})
export class CardComponent {
 @Input() product = {
    
      title: '',
      image: '',
      price:0,
      rating: 1,
   
  }
  stars: number[] = [1, 2, 3, 4, 5]
}

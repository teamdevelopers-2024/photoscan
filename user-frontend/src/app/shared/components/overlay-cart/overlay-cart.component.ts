import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-overlay-cart',
  templateUrl: './overlay-cart.component.html',
  styleUrl: './overlay-cart.component.css'
})
export class OverlayCartComponent {
 isOverlayVisible :boolean=true;
 @Output() closeOverlayEvent = new EventEmitter<boolean>();
  products=[{
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  },
  {
    image:"images/product-details-1.png",
    name:"DUMMY PRODUCT",
    qty:4,
    price:250
  }
];

closeOverlay(){
  this.closeOverlayEvent.emit(false)
}

}

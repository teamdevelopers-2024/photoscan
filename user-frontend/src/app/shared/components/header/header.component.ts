import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menus: string[] = ["Home", "Products", "About Us", "Contact Us"];
isOverlayVisible: boolean=false;

showOverlay(){
  this.isOverlayVisible=true;
}
closeOverlay(event : boolean){
  this.isOverlayVisible=event;
}
 
}

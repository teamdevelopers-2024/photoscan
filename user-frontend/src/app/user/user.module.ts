import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { CarouselComponent } from '../shared/components/carousel/carousel.component';
import { MasterComponent } from './master/master.component';
import { CardComponent } from '../shared/components/card/card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductDetailsComponent } from '../shared/components/product-details/product-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    MasterComponent,
    CardComponent,
    ProductDetailsComponent
    
  ],
  imports: [CommonModule, UserRoutingModule, SlickCarouselModule],
})
export class UserModule {}

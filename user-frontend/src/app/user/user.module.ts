import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { CarouselComponent } from '../shared/components/carousel/carousel.component';
import { MasterComponent } from './master/master.component';
import { CardComponent } from '../shared/components/card/card.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    MasterComponent,
    CardComponent
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}

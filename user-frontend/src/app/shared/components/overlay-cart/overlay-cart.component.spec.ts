import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayCartComponent } from './overlay-cart.component';

describe('OverlayCartComponent', () => {
  let component: OverlayCartComponent;
  let fixture: ComponentFixture<OverlayCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

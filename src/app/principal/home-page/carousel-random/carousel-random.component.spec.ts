import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselRandomComponent } from './carousel-random.component';

describe('CarouselRandomComponent', () => {
  let component: CarouselRandomComponent;
  let fixture: ComponentFixture<CarouselRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselRandomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

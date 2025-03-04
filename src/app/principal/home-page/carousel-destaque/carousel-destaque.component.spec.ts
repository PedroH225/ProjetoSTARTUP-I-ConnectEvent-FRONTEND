import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDestaqueComponent } from './carousel-destaque.component';

describe('CarouselDestaqueComponent', () => {
  let component: CarouselDestaqueComponent;
  let fixture: ComponentFixture<CarouselDestaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselDestaqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

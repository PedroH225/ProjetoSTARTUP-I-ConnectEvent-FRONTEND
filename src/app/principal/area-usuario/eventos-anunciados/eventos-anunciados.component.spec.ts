import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosAnunciadosComponent } from './eventos-anunciados.component';

describe('EventosAnunciadosComponent', () => {
  let component: EventosAnunciadosComponent;
  let fixture: ComponentFixture<EventosAnunciadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosAnunciadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosAnunciadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosOcorridosComponent } from './eventos-ocorridos.component';

describe('EventosOcorridosComponent', () => {
  let component: EventosOcorridosComponent;
  let fixture: ComponentFixture<EventosOcorridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosOcorridosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosOcorridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

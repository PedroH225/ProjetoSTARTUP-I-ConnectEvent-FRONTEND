import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosConfirmadosComponent } from './eventos-confirmados.component';

describe('EventosConfirmadosComponent', () => {
  let component: EventosConfirmadosComponent;
  let fixture: ComponentFixture<EventosConfirmadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosConfirmadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosConfirmadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

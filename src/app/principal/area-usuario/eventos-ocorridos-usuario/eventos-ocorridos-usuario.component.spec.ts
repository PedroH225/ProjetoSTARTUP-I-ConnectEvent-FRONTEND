import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosOcorridosUsuarioComponent } from './eventos-ocorridos-usuario.component';

describe('EventosOcorridosUsuarioComponent', () => {
  let component: EventosOcorridosUsuarioComponent;
  let fixture: ComponentFixture<EventosOcorridosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosOcorridosUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosOcorridosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

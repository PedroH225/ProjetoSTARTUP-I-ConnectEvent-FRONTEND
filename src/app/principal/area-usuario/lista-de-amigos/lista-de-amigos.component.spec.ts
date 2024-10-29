import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeAmigosComponent } from './lista-de-amigos.component';

describe('ListaDeAmigosComponent', () => {
  let component: ListaDeAmigosComponent;
  let fixture: ComponentFixture<ListaDeAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDeAmigosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDeAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

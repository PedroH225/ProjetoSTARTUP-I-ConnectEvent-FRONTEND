import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTipoComponent } from './button-tipo.component';

describe('ButtonTipoComponent', () => {
  let component: ButtonTipoComponent;
  let fixture: ComponentFixture<ButtonTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonTipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

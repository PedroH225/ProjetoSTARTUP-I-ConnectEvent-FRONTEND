import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAmigosComponent } from './adicionar-amigos.component';

describe('AdicionarAmigosComponent', () => {
  let component: AdicionarAmigosComponent;
  let fixture: ComponentFixture<AdicionarAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarAmigosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

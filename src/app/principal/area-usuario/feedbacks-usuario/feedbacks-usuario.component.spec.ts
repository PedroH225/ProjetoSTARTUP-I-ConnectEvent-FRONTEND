import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksUsuarioComponent } from './feedbacks-usuario.component';

describe('FeedbacksUsuarioComponent', () => {
  let component: FeedbacksUsuarioComponent;
  let fixture: ComponentFixture<FeedbacksUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbacksUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbacksUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedOnlyComponent } from './authorized-only.component';

describe('AuthorizedOnlyComponent', () => {
  let component: AuthorizedOnlyComponent;
  let fixture: ComponentFixture<AuthorizedOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizedOnlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorizedOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

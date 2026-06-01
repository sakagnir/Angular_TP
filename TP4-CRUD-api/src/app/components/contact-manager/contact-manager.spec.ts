import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactManagerComponent } from './contact-manager';

describe('ContactManagerComponent', () => {
  let component: ContactManagerComponent;
  let fixture: ComponentFixture<ContactManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderObjectComponent } from './placeholder-object.component';

describe('PlaceholderObjectComponent', () => {
  let component: PlaceholderObjectComponent;
  let fixture: ComponentFixture<PlaceholderObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceholderObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

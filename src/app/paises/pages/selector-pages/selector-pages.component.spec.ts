import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPagesComponent } from './selector-pages.component';

describe('SelectorPagesComponent', () => {
  let component: SelectorPagesComponent;
  let fixture: ComponentFixture<SelectorPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

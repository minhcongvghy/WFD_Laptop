import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductByLineComponent } from './show-product-by-line.component';

describe('ShowProductByLineComponent', () => {
  let component: ShowProductByLineComponent;
  let fixture: ComponentFixture<ShowProductByLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProductByLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductByLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

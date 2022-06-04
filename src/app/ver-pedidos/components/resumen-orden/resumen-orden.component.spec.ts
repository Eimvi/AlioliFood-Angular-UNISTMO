import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenOrdenComponent } from './resumen-orden.component';

describe('ResumenOrdenComponent', () => {
  let component: ResumenOrdenComponent;
  let fixture: ComponentFixture<ResumenOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlatillosComponent } from './lista-platillos.component';

describe('ListaPlatillosComponent', () => {
  let component: ListaPlatillosComponent;
  let fixture: ComponentFixture<ListaPlatillosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlatillosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlatillosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

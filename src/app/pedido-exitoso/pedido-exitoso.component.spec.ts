import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoExitosoComponent } from './pedido-exitoso.component';

describe('PedidoExitosoComponent', () => {
  let component: PedidoExitosoComponent;
  let fixture: ComponentFixture<PedidoExitosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoExitosoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

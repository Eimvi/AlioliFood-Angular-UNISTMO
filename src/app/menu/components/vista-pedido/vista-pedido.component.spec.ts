import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPedidoComponent } from './vista-pedido.component';

describe('VistaPedidoComponent', () => {
  let component: VistaPedidoComponent;
  let fixture: ComponentFixture<VistaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

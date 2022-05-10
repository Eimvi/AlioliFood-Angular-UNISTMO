import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Food, Pedido } from '../../interfaces/platillos';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.scss']
})
export class PlatillosComponent implements OnInit {
  @Input() list:Food[] = [];
  @Output() enviarPedido: EventEmitter<Food>=new EventEmitter;
  @Output() restarPedido: EventEmitter<Food>=new EventEmitter;

  plato:number[]=[]

  constructor(private food:MenuService) { }

  agregar(item:Food, id:number){
    if(this.plato[id]==undefined){
      this.plato[id]=0;
    }
    this.plato[id]++;
    this.enviarPedido.emit(item)
  }

  eliminar(item:Food, id:number){
    this.plato[id]--;
    this.restarPedido.emit(item)
  }

  ngOnInit(): void {
    this.plato[0]=0;
  }

}

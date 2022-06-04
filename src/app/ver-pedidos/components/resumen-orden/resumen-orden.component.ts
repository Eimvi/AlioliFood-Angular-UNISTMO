import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Pedido } from 'src/app/menu/interfaces/platillos';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-resumen-orden',
  templateUrl: './resumen-orden.component.html',
  styleUrls: ['./resumen-orden.component.scss']
})
export class ResumenOrdenComponent implements OnInit {
  @Input() sumaPedido!:number;
  @Input() envio!:number;
  @Input() pedidoAlmuerzo:Pedido[]=[];
  @Input() validacionPedido:boolean=false;
  @Input() validacionDireccion:boolean=false;
  @Output() valiPlatillos:EventEmitter<boolean>=new EventEmitter;


  auxPedido!: string|null;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.auxPedido = localStorage.getItem('pedido');
    this.pedidoAlmuerzo=this.auxPedido !== null ? JSON.parse(this.auxPedido):[];
    for(let i=0; i<this.pedidoAlmuerzo.length;i++ ){
      this.sumaPedido+=this.pedidoAlmuerzo[i].price * this.pedidoAlmuerzo[i].cantidad;
    }
    this.sumaPedido= this.sumaPedido+this.envio;
    if((this.auxPedido==null || this.auxPedido.length==0 )){
      this.valiPlatillos.emit(false);
    }else{
      this.valiPlatillos.emit(true);
    }
  }

  pedidoExitoso(){
    this.router.navigateByUrl("pedido_exitoso")
  }

}

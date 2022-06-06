import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Pedido } from 'src/app/menu/interfaces/platillos';
import { Router } from '@angular/router';
import { ResumenOrdenService } from '../../service/resumen-orden.service';
import { ItemsDto, OrderDto } from '../../interfaces/orden';

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

  sendPlatillos:ItemsDto[]=[];
  auxPedido!: string|null;
  sumaPlatillos:number=0;
  constructor(private router: Router,private resumenOrdenService:ResumenOrdenService) { }

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
    for(let i=0; i<this.pedidoAlmuerzo.length;i++ ){
      this.sumaPlatillos+=this.pedidoAlmuerzo[i].price * this.pedidoAlmuerzo[i].cantidad;
      this.sendPlatillos[i]={
        title:this.pedidoAlmuerzo[i].title,
        id:this.pedidoAlmuerzo[i].id
       }
    }

    const sendOrden: OrderDto={
      phone:"",
      name:"",
      amount: this.sumaPlatillos,
      shippingCost: this.envio,
      address: localStorage.getItem('dir'),
      payment:'efectivo',
      items: this.sendPlatillos
    }
    console.log(sendOrden);
    this.resumenOrdenService.postOrden(sendOrden).subscribe(
      resp => {
        if(sendOrden.payment=='tarjeta'){
          this.router.navigateByUrl("pago_externo");
        }else{
          this.router.navigateByUrl("pedido_exitoso");
        }
      },
      (error) => {
        console.log(error);
      }
      )
  }

}

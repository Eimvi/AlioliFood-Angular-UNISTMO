import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../menu/interfaces/platillos';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.scss']
})
export class VerPedidosComponent {
  pedidoAlmuerzo:Pedido[] = [];

  pedidoOrdenado:Pedido[]=[];
  sumPedido:number = 0;
  costoEnvio:number = 20;
  descripcionOrden:Pedido[]=[];
  validacionP!:boolean;
  validacionPlatillos!:boolean;
  validacionDireccion:boolean=false;
  constructor(private router: Router) { }


  vaciar(){
    localStorage.removeItem('pedido');
    localStorage.removeItem('platoNum');
    this.pedidoAlmuerzo =[];
    this.validacionP=false;
    this.detallesOrden(this.pedidoAlmuerzo);
  }

  detallesOrden(orden:Pedido[]){
    this.sumPedido=0;
    for(let i=0; i<orden.length;i++ ){
      this.sumPedido+=orden[i].price * orden[i].cantidad;
    }
    this.sumPedido= this.sumPedido+this.costoEnvio;
    this.descripcionOrden=orden;
    if(orden.length!== 0){
      this.validacionPlatillos=true;
    }else{
      this.validacionPlatillos=false;
    }
  }

  validarListaP(valiPlatillos:boolean){
    this.validacionPlatillos= valiPlatillos;
  }


  validarBtnOrden(validacion:boolean){
    this.validacionDireccion=validacion;
    if(this.validacionPlatillos == true && this.validacionDireccion == true){
      this.validacionP=true;
    }else{
      this.validacionP=false;
    }
  }
}

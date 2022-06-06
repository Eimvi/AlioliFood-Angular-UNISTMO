import { Component, OnInit } from '@angular/core';
import { Pedido } from '../menu/interfaces/platillos';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.scss']
})
export class VerPedidosComponent{
  pedidoOrdenado:Pedido[]=[];
  sumPedido:number = 0;
  costoEnvio:number = 20;
  descripcionOrden:Pedido[]=[];
  pedidoAlmuerzo:Pedido[] = [];
  validacionP!:boolean;
  validacionPlatillos!:boolean;
  validacionDireccion:boolean=false;


  constructor(private router: Router) { }

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

  regresar(){
    this.router.navigateByUrl('menu');
  }

  vaciar(){
    localStorage.removeItem('pedido');
    localStorage.removeItem('platoNum');
    this.pedidoAlmuerzo =[];
    this.validacionP=false;
    this.detallesOrden(this.pedidoAlmuerzo);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbicacionService } from '../../service/ubicacion.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent implements OnInit {
  formDireccion !: FormGroup;
  botonSelecc:boolean= false;
  clic:boolean=false;
  error:boolean= false;
  confir:boolean=false;
  direccionG!:String;


  constructor(private fb:FormBuilder,private ubicacionService:UbicacionService) { }



  ngOnInit(): void {
    this.formDireccion = this.fb.group({
      calle:['',[Validators.required]],
      colonia:['',[Validators.required]]
    });
  }



  obtenerpermiso(){

    this.error=this.ubicacionService.getLocalizacion();
    this.clic=true;
    this.botonSelecc=false;
  }

  obtenerdir(){

    this.clic=false;
    this.botonSelecc=true;
    this.error=false;


  }

  confirmar(){
    this.confir=true;

    this.direccionG=`${this.formDireccion.get('calle')?.value}, ${this.formDireccion.get('colonia')?.value}`;

    localStorage.setItem('direccion',this.direccionG.toString());
    console.log(this.direccionG);
  }

}

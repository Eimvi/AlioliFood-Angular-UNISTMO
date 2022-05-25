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
  direccionG!:string|null;
  bandera:boolean=false;
  mostrarDir:boolean= false;

  constructor(private fb:FormBuilder,private ubicacionService:UbicacionService) { }

  ngOnInit(): void {
    this.formDireccion = this.fb.group({
      calle:['',[Validators.required]],
      colonia:['',[Validators.required]]
    });
  }

  obtenerpermiso(){
    this.ubicacionService.getLocalizacion().subscribe(
      resp => {
        this.error = resp;
        this.ubicacionService.getDireccion().subscribe(
          resp => {
            this.direccionG = resp;
            this.mostrarDir=true;
          }
        )
      }
    )

    if(localStorage.getItem('dir')){
      this.mostrarDir=true;
      this.clic=true;
    }
    this.botonSelecc=false;
    this.bandera=true;
  }

  obtenerDireccion(){
    this.mostrarDir=false;
    this.clic=false;
    this.botonSelecc=true;
    this.error=false;
    this.bandera=false;
  }

  confirmar(){
    this.confir=true;
    if(this.bandera){
      this.direccionG = localStorage.getItem('dir');
    }else{
      this.direccionG=`${this.formDireccion.get('calle')?.value}, ${this.formDireccion.get('colonia')?.value}`;
    localStorage.setItem('direccion',this.direccionG.toString());
}





  }

}

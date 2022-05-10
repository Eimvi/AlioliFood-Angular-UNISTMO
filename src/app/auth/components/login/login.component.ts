import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tel } from '../../auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading:boolean=false;
  form !: FormGroup;

  constructor(private router:Router,private fb:FormBuilder,private authService:AuthService ) { }

  ngOnInit(): void {
  }

  login(){ //Función login() de la clase
    const telefono:Tel = {                            //Creamos una variable de Tipo Tel, donde guardaremos los datos
      phone:Number(this.form.get('telefono')?.value) //Obtenemos el dato y realizamos la conversión a Number
    };
    this.authService.login(telefono).subscribe(     // a la función de nuestro servicio  le mandamos la variable de tipo Tel y nos suscribimos
     resp =>{
      this.loading=false;                         //Nuestra variable que muestra el error estará en false(no muestra nada)
      this.router.navigateByUrl('menu');          // Redireccionamos a menu
      },
      (error) => {                              //En caso de error
        this.loading=true;                        //Nuestra variable que muestra el error pasa a true(muestra mensaje de usuario no registrado)
        console.log(error);                     //Muestra en consola el codigo de error
      }
    );
  }
}

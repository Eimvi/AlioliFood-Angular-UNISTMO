import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { loginResponse } from '../../mockTest/login-response.mock';
import { loginFailResponse } from '../../mockTest/login-fail-response.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy: jasmine.SpyObj<AuthService>
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    loginSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login', 'logout']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: loginSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mantener la variable de error en false al iniciar exitosamente', () => {
    // Mock de datos
    const loading: boolean = false;
    const mockResponse = loginResponse;

    loginSpy.login.and.returnValue(of(mockResponse));

    component.login();

    expect(component.loading).toEqual(loading);
  });

  it('Debe mostrar un mensaje que el número es requerido al ejecutar el evento Blur en HTML.', (done: DoneFn) => {
    // Mock de datos

    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#initForm').querySelectorAll('input')[0];
    loginFormUserElement.value = '';
    loginFormUserElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const msgDivRequired: HTMLDivElement = fixture.debugElement.nativeElement.
      querySelector('#initForm').querySelector('#tel-required')

      const phoneErrorMsg: string = '*El número de teléfono es requerido.';
      expect(msgDivRequired.innerHTML.trim()).toEqual(phoneErrorMsg);

      done();
    })

  });

  it('Debe mostrar un mensaje que el número es inválido al ejecutar el evento Input en HTML.', (done: DoneFn) => {
    // Mock de datos

    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#initForm').querySelectorAll('input')[0];
    loginFormUserElement.value = '123';
    loginFormUserElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const msgDivRequired: HTMLDivElement = fixture.debugElement.nativeElement.
      querySelector('#initForm').querySelector('#tel-invalid')

      const phoneErrorMsg: string = '*El número de teléfono es inválido.';
      expect(msgDivRequired.innerHTML.trim()).toEqual(phoneErrorMsg);

      done();
    })

  });

  it('Debe redirigir a la ruta menu al iniciar exitosamente', () => {
    // Mock de datos
    const mockResponse = loginResponse;

    loginSpy.login.and.returnValue(of(mockResponse));

    component.login();

    const spy = routerSpy.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    const expectedPath = 'menu';
    expect(navArgs).toBe(expectedPath);
  });

  it('Debe cambiar la variable de error en true al iniciar con error como respuesta', () => {
    // Mock de datos
    const loading: boolean = true;
    const mockResponse = loginFailResponse;

    loginSpy.login.and.returnValue(throwError(mockResponse));

    component.login();

    expect(component.loading).toEqual(loading);
  });

  // Formulario Reactivo

  it('Verificar los valores iniciales del Formulario', () => {
    const loginFormGroup = component.form;
    const loginFormValues = {
      telefono: ''
    };

    expect(loginFormGroup.value).toEqual(loginFormValues);
  });

  it('Verificar el número de inputs del formulario HTML', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#initForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(1);
  });

  it('Validar status formulario con el input vacío de HTML', () => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#initForm').querySelectorAll('input')[0];
    const phoneValueFromGroup = component.form.get('telefono');
    expect(loginFormUserElement.value).toEqual(phoneValueFromGroup?.value);
    expect(phoneValueFromGroup?.errors).not.toBeNull();
    expect(phoneValueFromGroup?.errors?.required).toBeTruthy();
  });

  it('Validar status formulario con el input de un valor no numérico de HTML', (done: DoneFn) => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#initForm').querySelectorAll('input')[0];
    loginFormUserElement.value = '1234567890a';
    loginFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const phoneValueFromGroup = component.form.get('telefono');
      expect(loginFormUserElement.value).toEqual(phoneValueFromGroup?.value);
      expect(phoneValueFromGroup?.errors?.pattern).toBeTruthy();
      done();
    })
  });

  it('El botón de Ingresar debe estar inicialmente deshabilitado', () => {
    const loginFormUserElement: HTMLButtonElement = fixture.debugElement.nativeElement.
      querySelector('#initForm').querySelectorAll('button')[0];
    const btnStatus = loginFormUserElement.disabled;
    const loginFormGroup = component.form;

    expect(loginFormGroup.invalid).toBeTrue();
    expect(btnStatus).toBeTrue();
  });

  it('El formulario debe ser válido al obtener un número válido', () => {
    component.form.setValue({
      'telefono': 1234567890
    });

    expect(component.form.valid).toBeTrue();
  });

  it('El formulario debe ser inválido al obtener un valores no numéricos', () => {
    component.form.setValue({
      'telefono': '123456789a'
    });

    expect(component.form.valid).toBeFalse();
  });

  it('El formulario debe ser inválido al obtener un número mayor de 10 dígitos', () => {
    component.form.setValue({
      'telefono': 12345678901
    });

    expect(component.form.valid).toBeFalse();
  });
});

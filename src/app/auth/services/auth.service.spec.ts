import { AuthService } from './auth.service';
import { loginResponse } from '../mockTest/login-response.mock';
import { loginCredentials } from '../mockTest/login-credentials';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('Httplient', ['post']);
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar los datos del usuario', (done: DoneFn) => {
    // Mock de datos
    const mockResponse = loginResponse;

    const mockCredentials = loginCredentials;

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.login(mockCredentials).subscribe(
      resp => {
        expect(resp).toEqual(mockResponse);
        done();
      }
    )
  });

  it('Debe obtener un token de respuesta al iniciar', (done: DoneFn) => {
    // Mock de datos
    const mockResponse = loginResponse;

    const mockCredentials = loginCredentials;

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.login(mockCredentials).subscribe(
      resp => {
        expect(resp.body.user.token).not.toBeUndefined();
        done();
      }
    )
  });

  it('Debe remover un token de localStorage', (done: DoneFn) => {
    // Mock de datos
    const mockResponse = loginResponse;

    const mockCredentials = loginCredentials;

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.login(mockCredentials).subscribe(
      resp => {
        localStorage.setItem('token', resp.body.user.token)
      }, err => {

      }, () => {
        service.logout();
        expect(localStorage.getItem('token')).toBeNull();
        done();
      }
    )
  })


});

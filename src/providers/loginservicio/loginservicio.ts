import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Usuario {
  id: number;
  cedula: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  foto: string;
  estatus: boolean;
  rolId: number;
  paiId: number;
  estadoId: number;
  ciudadId: number;
 
  constructor(id: number,
    cedula: string,
    password: string,
    nombre: string,
    apellido: string,
    telefono: string,
    correo: string,
    foto: string,
    estatus: boolean,
    rolId: number,
    paiId: number,
    estadoId: number,
    ciudadId: number) {
    this.id = id;
    this.cedula = cedula;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.correo = correo;
    this.foto = foto;
    this.estatus = estatus;
    this.rolId = rolId;
    this.paiId = paiId;
    this.estadoId = estadoId;
    this.ciudadId = ciudadId;
  }
}


@Injectable()
export class LoginservicioProvider {
  public DigitalMarketAPI: string;
  public headers: Headers;
  public options: RequestOptions;

  usuarioActual: any;
  usuario: Usuario;

  constructor(public http: Http) {
    this.DigitalMarketAPI = 'https://digitalmarketapi.herokuapp.com/api/';  
    this.usuarioActual = {};
    this.headers = new Headers();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json' );
    this.options = new RequestOptions({headers:this.headers})

  }


  public login(user, pass) {
    if (user == null || pass == null) {
      return Observable.create(observer => {
        observer.next(false);
        observer.complete();
      });
    } else {
      return Observable.create(observer => {
        if(user.password == pass){
          this.usuario = new Usuario(user.id,
            user.cedula, user.password, 
            user.nombre, user.apellido,
            user.telefono, user.correo,
            user.foto,
            user.estatus, user.rolId,
            user.paiId, user.estadoId,
            user.ciudadId);
          let access = (this.usuario);
        observer.next(access);
        observer.complete();
        }else{
          observer.next(false);
          observer.complete();
        }
      });
    }
  }

  public getUsuarioInfo() : Usuario {
    return this.usuario;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.usuario = null;

      observer.next(true);
      observer.complete();
    });
  }

  encontrarUsuario(cedula){
    return this.http.get(this.DigitalMarketAPI + 'usuario/login/'+cedula);
  }

}

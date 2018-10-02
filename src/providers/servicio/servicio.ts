//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ServicioProvider {
  public DigitalMarketAPI: string;
  public headers: Headers;
  public options: RequestOptions;

  publicacion: any;

  constructor(public http: Http) {
    this.DigitalMarketAPI = 'https://digitalmarketapi.herokuapp.com/api/';  

    this.headers = new Headers();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json' );
    this.headers.append('X-Requested-With', 'XMLHttpRequest');
    this.options = new RequestOptions({headers:this.headers})
  }

  //Subir imagen a cloudinary
  subirImagen(imagen){
    let postParams = {
      file: imagen, 
      upload_preset: 'etssantv'
    }
    return this.http.post('https://api.cloudinary.com/v1_1/digitalmarket/image/upload', postParams, this.options)
  }

//Servicios Categorias
  getCategorias(){
   return this.http.get(this.DigitalMarketAPI + 'categoria/todos');
  }

  registrarCategoria(nombre, est){
    let postParams = {
      nombre: nombre,
      estatus: est
    }   
    this.http.post(this.DigitalMarketAPI + 'categoria/registrar', postParams, this.options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Muestra error en consola
      });
  }

  editarCategoria(nombre, est, id){
    let postParams = {
      nombre: nombre,
      estatus: est
    }   
    this.http.put(this.DigitalMarketAPI + 'categoria/editar/'+id, postParams, this.options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Muestra error en consola
      });
  }

  eliminarCategoria(id){
    this.http.delete(this.DigitalMarketAPI+'categoria/eliminar/'+id).subscribe(resp => console.log('Eliminada con Exito'),
    error => console.log('Ocurrio un Error, eliminacion fallida'));
  }
  /*-----------------------------------------------------------------------------------------------------*/

  //Servicios Usuario
  getUsuarios(){
    return this.http.get(this.DigitalMarketAPI + 'usuario/todos');
   }

   getUsuarioCompleto(id){
    return this.http.get(this.DigitalMarketAPI + 'usuario/completo/'+id);
  }
 
   registrarUsuario(ced, pass, nomb, apell, telf, email, pais, estad, ciud){
     let postParams = {
       cedula: ced,
       password: pass,
       nombre: nomb,
       apellido: apell,
       telefono: telf,
       correo: email,
       rolId: 2,
       paiId: pais,
       estadoId: estad,
       ciudadId: ciud
     }   
     return this.http.post(this.DigitalMarketAPI + 'usuario/registrar', postParams, this.options)
       .map(data => {
         console.log(data['_body']);
        }, error => {
         console.log(error);// Muestra error en consola
       });
   }
 
   editarUsuario(id, parametros){
     return this.http.put(this.DigitalMarketAPI + 'usuario/editar/'+id, parametros, this.options)
   }
 
   eliminarUsuario(id){
     this.http.delete(this.DigitalMarketAPI+'usuario/eliminar/'+id).subscribe(resp => console.log('Eliminado con Exito'),
     error => console.log('Ocurrio un Error, eliminacion fallida'));
   }
/*-----------------------------------------------------------------------------------------------------*/

//Servicios Pais
getPaises(){
  return this.http.get(this.DigitalMarketAPI + 'pais/todos/');
 }

 getPais(id){
   return this.http.get(this.DigitalMarketAPI + 'pais/especifico/'+id)
 }

// Servicios Estados
getEstadosDePais(idpais){
  return this.http.get(this.DigitalMarketAPI + 'estado/pais/'+idpais);
}

// Servicios Ciudades
getCiudadesDeEstado(idestado){
  return this.http.get(this.DigitalMarketAPI + 'ciudad/estado/'+idestado);
}

//Servicios Publicacion
registrarPublicacion(tit, desc, fec, cat, usu, fot, prec, cant){
    let postParams = {
      titulo: tit,
      descripcion: desc,
      fecha: fec,
      categoriumId: cat,
      usuarioId: usu,
      foto: fot
    }
   this.http.post(this.DigitalMarketAPI + 'publicacion/registrar', postParams, this.options)
    .subscribe(data => {
      var publicacion = data.json();
      this.registrarArticulo(postParams.titulo, prec, cant, publicacion.id)
      console.log(this.publicacion);
     }, error => {
      console.log(error);// Muestra error en consola
    });       
}

editarPublicacion(idpublicacion, parametros){
  return this.http.put(this.DigitalMarketAPI + 'publicacion/editar/'+idpublicacion, parametros, this.options)
}

eliminarPublicacion(idpublicacion){
  return this.http.delete(this.DigitalMarketAPI+'publicacion/eliminar/'+idpublicacion)
}

getPublicacionesDeUsuario(idusuario, estatus){
  return this.http.get(this.DigitalMarketAPI + 'publicacion/activasusuario/'+idusuario+'/'+estatus);
}

getPublicacionesFullInfo(){
  return this.http.get(this.DigitalMarketAPI + 'publicacion/completa');
}

getPublicacionesPorCategoria(idcategoria){
  return this.http.get(this.DigitalMarketAPI + 'publicacion/categoria/'+idcategoria);
}

// Servicios Articulo
registrarArticulo(nomb, prec, cant, idpubli){
  let postParams = {
    nombre: nomb,
    precio: prec,
    cantidad: cant,
    estatus: true,
    publicacionId: idpubli
  }   
  this.http.post(this.DigitalMarketAPI + 'articulo/registrar', postParams, this.options)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);// Muestra error en consola
    });
}

//Servicios Carrito
getCarritoDeUsuario(idusuario){
  return this.http.get(this.DigitalMarketAPI + 'carrito/usuario/'+idusuario);
}

agregarAlCarrito(idarticulo, idusuario){

  let postParams = {
    articuloId: idarticulo,
    usuarioId: idusuario
  }   
  this.http.post(this.DigitalMarketAPI + 'carrito/agregararticulo', postParams, this.options)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);// Muestra error en consola
    });
}

eliminarArticuloCarrito(id){
  this.http.delete(this.DigitalMarketAPI+'carrito/eliminararticulo/'+id).subscribe(resp => console.log('Eliminado con Exito'),
  error => console.log('Ocurrio un Error, eliminacion fallida'));
}

//Servicios Like
registrarLike(idusuario, idpublicacion){
  let postParams = {
    publicacionId: idpublicacion,
    usuarioId: idusuario
  }

  return this.http.post(this.DigitalMarketAPI + 'like/registrar', postParams, this.options)
}

}

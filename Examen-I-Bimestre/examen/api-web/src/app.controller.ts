import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {Conductores} from "./conductores/conductores";
import {Autos} from "./autos/autos";

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {

  }


  //Lleva a la página de Inicio de la aplicación
  @Get('/inicio')
  getInicio(@Response() res, @Request() req) {
    const cookieUsuarioSegura = req.signedCookies;
    return res.render('inicio', {
      nombre: cookieUsuarioSegura.nombreUsuario
    })


  }

  //Lleva a la página de login de la aplicación
  @Get('/login')
  getLogin(@Response() res){
    res.render('login')
  }

  //Lleva a la página de la tabla de los conductores
  @Get('/conductores')
  getConductores(@Response() res, @Request() req){
    const cookieUsuarioSegura = req.signedCookies;
    const arregloConductores= this.appService.bddConductores;

    if (cookieUsuarioSegura.nombreUsuario) {

      res.render('conductores', {arregloConductores: arregloConductores, nombre: cookieUsuarioSegura.nombreUsuario});
    }else {
      return res.redirect('/examen/login');
    }
    }

//Lleva a la página que permite agregar un nuevo conductor
  @Get('/crear-conductores')
  getCrearConductores(@Response() res, @Request() req){
    const cookieUsuarioSegura = req.signedCookies;

    return res.render('crear_conductores', {nombre: cookieUsuarioSegura.nombreUsuario});
  }

  //Genera la cookie segura con el nombre de usuario
  @Post('/login')
  postLogin(@Request() req, @Response() resp, @Headers() header, @Body('nombre') nombre: string) {
    const cookieSeg = req.signedCookies;
    if (!cookieSeg.nombreUsuario) {

      resp.cookie('nombreUsuario', nombre,{signed: true});
      cookieSeg.nombreUsuario=nombre;


    }
    if (cookieSeg.nombreUsuario) {

      resp.redirect('/examen/inicio');
    }
    else{
      return resp.redirect('/examen/login');
    }

  }

    //Crea un nuevo conductor para ser añadido a la lista
  @Post('/crearConductor')
  crearConductorPost(
      @Body() conductor:Conductores,
      @Response() res
  ){

    conductor.numeroAutos=Number(conductor.numeroAutos);
    conductor.fechaNacimiento =new Date(conductor.fechaNacimiento);
    conductor.licenciaValida = Boolean(conductor.licenciaValida);
    console.log(conductor);
    this.appService.crearConductor(conductor);
    res.redirect('/examen/conductores');
  }




  //Elimina la cookie y redirige al ingreso de datos
  @Post('/eliminarCookie')
  postEliminarCookie(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string){
    response.clearCookie("nombreUsuario");
    response.redirect('/examen/login')
  }

  //Elimina el conductor de la lista
  @Post('/eliminarConductor')
  posrtEliminarConductor(@Response() res,
                 @Body('id') id: number, @Request() request) {

    this.appService.eliminarConductorPorId(Number(id));
    res.redirect('/examen/conductores');
  }

  //Busca al conductor de acuerdo al paramtero de entrada
  @Post('/buscarConductores')
  buscarConductor(@Response() res,
               @Body('busquedaConductor') busquedaConductor: string, @Request() request) {
    const cookieSeg = request.signedCookies;
    var arregloConductores=this.appService.buscarPorNombre(busquedaConductor);
    console.log('impiendo arreglo conductores:',arregloConductores);
    if(arregloConductores!=null){
      res.render('conductores', {arregloConductores:arregloConductores,nombre:cookieSeg.nombreUsuario})
    }else {
      res.redirect('/examen/conductores');
    }
  }

  /* **************************** CONTROLADORES DEL HIJO ************************** */

  @Get('/autos/:id')
  gestionarHijos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
    id= Number(params.id);
    const cookieSeg = request.signedCookies;
    const arregloAutos= this.appService.buscarPorId(Number(id));
    console.log('arrAutos:',arregloAutos);
    if (cookieSeg.nombreUsuario) {

      return response.render('autos',{id:id,arregloAutos:arregloAutos,nombre:cookieSeg.nombreUsuario})

    }
    else{
      return response.render('login');
    }

  }

 @Get('/busquedaAutos/:id')
  busquedaHijos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
    id= Number(params.id);
    const cookieSeg = request.signedCookies;
    if (cookieSeg.nombreUsuario) {

      return response.render('autos',{id:id,arregloAutos:arregloAutoBusqueda,nombre:cookieSeg.nombreUsuario})

    }
    else{
      return response.render('login');
    }


  }


  @Get('/crearAuto/:id')
  crearAuto( @Param() params,@Response() res,@Request() request){
    const cookieSeg = request.signedCookies;
    console.log(id);

    if (cookieSeg.nombreUsuario) {

      return res.render('crear_autos',{nombre:cookieSeg.nombreUsuario, id:id})

    }
    else{
      return res.redirect('/examen/login');
    }

  }


    @Post('/crearAuto')
    crearAutoPost(
        @Body() auto:Autos,
        @Response() res,
        @Param() params,
        @Request() request
    ){
      const cookieSeg = request.signedCookies;
      auto.chasis=Number(auto.chasis);
      auto.nombreMarca=String(auto.nombreMarca);
      auto.colorUno=String(auto.colorUno);
      auto.colorDos=String(auto.colorDos);
      auto.nombreModelo=String(auto.nombreModelo);
      auto.anio =Number(auto.anio);
      auto.conductorId = Number(auto.conductorId);
      console.log(auto);
      this.appService.crearAuto(auto);
      if (cookieSeg.nombreUsuario) {

        res.redirect('/examen/autos/'+id);

      }
      else{
        return res.render('login');
      }


    }

    @Post('eliminarAutos')
    eliminarAuto(@Param() params,@Response() res,  @Body('conductorId') idConductor: number,
                     @Body('idAuto') idAuto: number, @Request() request) {

      const cookieSeg = request.signedCookies;
      this.appService.eliminarPorId(Number(idAuto));
      if (cookieSeg.nombreUsuario) {

        res.redirect('/examen/autos/'+idConductor);

      }
      else{
        return res.render('login');
      }


    }
/*
    @Get('/buscarProd/:id')
    buscarProductos( @Param() params,@Res() res,@Request() request){
      const cookieSeg = request.signedCookies;
      console.log(id);
      if (cookieSeg.nombreUsuario) {

        return res.redirect('/examen/tienda/buscarProducto'+id)

      }
      else{
        return res.render('login');
      }

    }
*/


    @Post('/buscarAuto')
    buscarAuto(@Param() params,@Response() res,
                   @Body('busquedaAutos') busquedaAutos: string, @Request() request) {
      const cookieSeg = request.signedCookies;
      arregloAutoBusqueda=this.appService.buscarAutoMarca(busquedaAutos,id);
      console.log('impiendo arreglo productos:',arregloAutoBusqueda);

      if(busquedaAutos!=null){
        if (cookieSeg.nombreUsuario) {

          res.redirect('/examen/busquedaAutos/'+id);

        }
        else{
          return res.render('login');
        }

      }else{
        if (cookieSeg.nombreUsuario) {

          res.redirect('/examen/tienda/gestionarProductos/'+id);

        }
        else{
          return res.render('login');
        }

      }
    }


}
let id:number;
let arregloAutoBusqueda:Autos[];
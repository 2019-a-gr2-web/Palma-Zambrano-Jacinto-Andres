import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {Conductores} from "./conductores/conductores";

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

    res.render('conductores',{arregloConductores:arregloConductores,nombre:cookieUsuarioSegura.nombreUsuario});
    }





  @Get('/crear-conductores')
  getCrearConductores(@Response() res, @Request() req){
    const cookieUsuarioSegura = req.signedCookies;
    return res.render('crear_conductores', {
      nombre: cookieUsuarioSegura.nombreUsuario
    });
  }

  //Genera la cookie segura con el nombre de usuario
  @Post('/login')
  postLogin(@Request() req, @Response() resp, @Headers() header, @Body('nombre') nombre: string) {

    const cookieUsuarioSegura = req.signedCookies;
    if (!cookieUsuarioSegura.nombreUsuario) {

      resp.cookie('nombreUsuario', nombre, {signed: true})

    }

    cookieUsuarioSegura.nombreUsuario = nombre;
    resp.redirect('/examen/inicio')
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
}
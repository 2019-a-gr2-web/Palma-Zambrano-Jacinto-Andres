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

  //Lleva a la página de la tabla de los autos
  @Get('/autos')
  getAutos(@Response() res, @Request() req){
    const cookieUsuarioSegura = req.signedCookies;
    const arregloConductores= this.appService.bddConductores;

    res.render('autos',{arregloConductores:arregloConductores,nombre:cookieUsuarioSegura.nombreUsuario});
    }





  @Get('/crear-autos')
  getCrearAutos(@Response() res, @Request() req){
    const cookieUsuarioSegura = req.signedCookies;
    return res.render('crear_autos', {
      nombre: cookieUsuarioSegura.nombreUsuario
    });
    res.render('crear_autos');
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






  //Elimina la cookie y redirige al ingreso de datos
  @Post('/eliminarCookie')
  postEliminarCookie(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string){
    response.clearCookie("nombreUsuario");
    response.redirect('/examen/login')
  }
}
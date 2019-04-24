import {Controller, Get, Post, HttpCode,Headers,Body,Response, Request, Delete,Put, Query} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // DEBER 1 - Aplicaciones Web
  // Jacinto Palma Zambrano - Gr2


  //Método GET - SUMA
  @Get('/suma')
  @HttpCode(200)
  sumaJPZ(@Headers() headers, @Request() request, @Response() response) {
    if (headers.numero && headers.numero2) {
    const cookie = request.cookies;
    console.log('Headers: ', headers);
    const numA = Number(headers.numero);
    const numB = Number(headers.numero2);
    const resp = numA + numB;
    response.cookie('nombreUsuario', 'Jacinto');
    return response.send({'La suma es: ': resp.toString(), 'nombreUsuario': cookie.nombreUsuario});
  }else{
      return response.status(200).send({mensaje: 'Error no hay valores para sumar', error: 200})
    }
  }

  //Método POST - RESTA
  @Post('/resta')
  @HttpCode(201)
  restaJPZ(@Body() parametros, @Response() resp, @Request() request ){
  console.log(parametros);
  if(parametros.numero && parametros.numero2){
    const cookie = request.cookies;
    const numA = Number(parametros.numero);
    const numB = Number(parametros.numero2);
    const numResta = numA-numB;
    resp.cookie('nombreUsuario', 'Jacinto');
    return resp.send({'La resta es: ': numResta.toString(), 'nombreUsuario': cookie.nombreUsuario});

  }else{
    return resp.status(400).send("DEBE DE INGRESAR NUMEROS");
  }

  }

  //Metodo PUT - MULTIPLICACION
  @Put('/multiplicacion')
  @HttpCode(202)
  multipJPZ(@Query() parametros, @Response() resp, @Request() request){
    if(parametros.numero && parametros.numero2){
      const cookie = request.cookies;
      const numA = Number(parametros.numero);
      const numB = Number(parametros.numero2);
      const numMult = numA*numB;
      resp.cookie('nombreUsuario', 'Jacinto');
      return resp.send({'La multiplicacion es: ': numMult.toString(), 'nombreUsuario': cookie.nombreUsuario});
    }else{
      return resp.status(400).send("DEBE DE INGRESAR NUMEROS EN QUERY");
    }

  }


  //Metodo DELETE - DIVISION
  @Delete('/division')
  @HttpCode(203)
  diviJPZ(@Headers() paramHeader, @Body() paramBody, @Response() resp, @Request() request){
  if(paramHeader.numero && paramBody.numero2) {
    const cookie = request.cookies;
    const numA = Number(paramHeader.numero);
    const numB = Number(paramBody.numero2);
    if (numB == 0) {
      return resp.send('EL NUMERO DEBE DE SER DISTINTO DE 0')

    } else {
      const div = numA / numB;
      resp.cookie('nombreUsuario', 'Jacinto');
      return resp.send({'La division es: ': div.toString(), 'nombreUsuario': cookie.nombreUsuario});
    }
  }else{
    return resp.status(400).send("DEBE DE INGRESAR NUMEROS EN QUERY");
  }
  }
}

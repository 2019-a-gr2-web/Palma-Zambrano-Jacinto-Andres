import {Controller, Get, Post, HttpCode,Headers,Body,Response, Request, Delete,Put, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {response} from "express";

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
  sumaJPZ(@Headers() headers){
  console.log('Headers: ', headers);
  const numA = Number(headers.numero);
  const numB = Number(headers.numero2);
  const resp = numA + numB;
  const salida = resp.toString();
  return ` LA SUMA ES : ${salida}` ;
  }

  //Método POST - RESTA
  @Post('/resta')
  @HttpCode(201)
  restaJPZ(@Body() parametros, @Response() resp){
  console.log(parametros);
  if(parametros.numero && parametros.numero2){
    const numA = Number(parametros.numero);
    const numB = Number(parametros.numero2);
    const numResta = numA-numB;
    const salida = numResta.toString();
    resp.set('Resta',`${salida}`);
    return resp.status(201).send(`La resta es: ${numResta}`);
  }else{
    return resp.status(400).send("DEBE DE INGRESAR NUMEROS");
  }

  }

  //Metodo PUT - MULTIPLICACION
  @Put('/multiplicacion')
  @HttpCode(202)
  multipJPZ(@Query() parametros, @Response() resp){
  const numA = Number(parametros.numero);
  const numB = Number(parametros.numero2);
  const numMult = numA*numB;
  const salida = numMult.toString();
    resp.set('Resta',`${salida}`);
    return resp.status(201).send(`La multiplicacion es: ${numMult}`);
  }


  //Metodo DELETE - DIVISION
  
}

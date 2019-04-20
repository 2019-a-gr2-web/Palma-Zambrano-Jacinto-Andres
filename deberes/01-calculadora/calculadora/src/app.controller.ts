import {Controller, Get, Post, HttpCode,Headers,Body,Response, Request, Delete,Put} from '@nestjs/common';
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
  suma(@Headers() headers){
  console.log('Headers: ', headers);
  const numA = Number(headers.numero);
  const numB = Number(headers.numero2);
  const resp = numA + numB;
  return "La suma de los números esresp" ;
  }

  //Método POST - RESTA
  @Post('/resta')
  @HttpCode(201)
  resta(@Body() parametros, @Response() resp){
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

}

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

    const cookie = request.cookies;
    const cookieSegura = request.signedCookies;
    const numA = Number(headers.numero);
    const numB = Number(headers.numero2);
    const resp = numA + numB;

    if(!cookieSegura.intentos){
      response.cookie('intentos',100,{signed:true});
    }
    console.log('Headers: ', headers);

    if(!cookieSegura.nombreUsuario) {
      response.cookie('nombreUsuario', 'Jacinto');
    }


    const numIntentos = cookieSegura.intentos - resp;

    const keyValidar = Joi.object().keys({
      num1 : Joi.number().integer().required(),
      num2 : Joi.number().integer().required()
    });

    const objValidar = {
      num1: numA,
      num2: numB
    };
    const validacion = Joi.validate(objValidar,keyValidar);

    if(!validacion.error){
      console.log('Puede continuar la operación... datos validados')
    }else{
      return response.send(`EXISTE UN ERROR: ${validacion.error}`)
    }
    if(numIntentos <=0){
      const respuesta = {
        resultado: `Resultado: ${resp}`,
        user: `Usuario: ${cookie.nombreUsuario}`,
        mensaje: "SE HAN HAGOTADO LOS TOKENS"
      };
      response.send(respuesta);
    }else{
      const respuesta = {
        resultado: resp,
        user: `Usuario: ${cookie.nombreUsuario}`,
      };
      if(cookieSegura.intentos){
        response.cookie('Intentos Disponibles',numIntentos,{signed:true});
      }
      return response.send(respuesta);
    }

  }

  //Método POST - RESTA
  @Post('/resta')
  @HttpCode(201)
  restaJPZ(@Body() parametros, @Response() response, @Request() request ){
  console.log(parametros);

    const cookie = request.cookies;
    const cookieSegura = request.signedCookies;
    const numA = Number(parametros.numero);
    const numB = Number(parametros.numero2);
    const numResta = numA-numB;

    if(!cookieSegura.intentos){
      response.cookie('intentos',100,{signed:true});
    }


    if(!cookieSegura.nombreUsuario) {
      response.cookie('nombreUsuario', 'Jacinto');
    }

    const numIntentos = cookieSegura.intentos - numResta;
    const keyValidar = Joi.object().keys({
      num1 : Joi.number().integer().required(),
      num2 : Joi.number().integer().required()
    });

    const objValidar = {
      num1: numA,
      num2: numB
    };
    const validacion = Joi.validate(objValidar,keyValidar);
    if(!validacion.error){
      console.log('Puede continuar la operación... datos validados')
    }else{
      return response.send(`EXISTE UN ERROR: ${validacion.error}`)
    }
    if(numIntentos <=0){
      const respuesta = {
        resultado: numResta,
        user: `Usuario:: ${cookie.nombreUsuario}`,
        mensaje: "SE HAN HAGOTADO LOS TOKENS"
      };
      response.send(respuesta);
    }else{
      const respuesta = {
        resultado: numResta,
        user: `Usuario: ${cookie.nombreUsuario}`,
      };
      if(cookieSegura.intentos){
        response.cookie('Intentos Disponibles',numIntentos,{signed:true});
      }
      return response.send(respuesta);
    }



  }

  //Metodo PUT - MULTIPLICACION
  @Put('/multiplicacion')
  @HttpCode(202)
  multipJPZ(@Query() parametros, @Response() response, @Request() request){

      const cookie = request.cookies;
      const cookieSegura = request.signedCookies;
      const numA = Number(parametros.numero);
      const numB = Number(parametros.numero2);
      const numMult = numA*numB;

    if(!cookieSegura.intentos){
      response.cookie('intentos','100',{signed:true});
    }


    if(!cookieSegura.nombreUsuario) {
      response.cookie('nombreUsuario', 'Jacinto');
    }

    const numIntentos = cookieSegura.intentos - numMult;

    const keyValidar = Joi.object().keys({
      num1 : Joi.number().integer().required(),
      num2 : Joi.number().integer().required()
    });

    const objValidar = {
      num1: numA,
      num2: numB
    };
    const validacion = Joi.validate(objValidar,keyValidar);
    if(!validacion.error){
      console.log('Puede continuar la operación... datos validados')
    }else{
      return response.send(`EXISTE UN ERROR: ${validacion.error}`)
    }
    if(numIntentos <=0){
      const respuesta = {
        resultado: numMult,
        user: `Usuario: ${cookie.nombreUsuario}`,
        mensaje: "SE HAN HAGOTADO LOS TOKENS"
      };
      response.send(respuesta);
    }else{
      const respuesta = {
        resultado: numMult,
        user: `Usuario: ${cookie.nombreUsuario}`,
      };
      if(cookieSegura.intentos){
        response.cookie('Intentos Disponibles',numIntentos,{signed:true});
      }
      return response.send(respuesta);
    }

  }


  //Metodo DELETE - DIVISION
  @Delete('/division')
  @HttpCode(203)
  diviJPZ(@Headers() paramHeader, @Body() paramBody, @Response() response, @Request() request){

    const cookie = request.cookies;
    const cookieSegura = request.signedCookies;
    const numA = Number(paramHeader.numero);
    const numB = Number(paramBody.numero2);

    if (numB == 0) {
      return response.send('EL NUMERO DEBE DE SER DISTINTO DE 0')

    } else {
      const numDiv = numA / numB;
      if(!cookieSegura.intentos){
        response.cookie('intentos','100',{signed:true});
      }


      if(!cookieSegura.nombreUsuario) {
        response.cookie('nombreUsuario', 'Jacinto');
      }

      const numIntentos = cookieSegura.intentos - numDiv;

      const keyValidar = Joi.object().keys({
        num1 : Joi.number().integer().required(),
        num2 : Joi.number().integer().required()
      });

      const objValidar = {
        num1: numA,
        num2: numB
      };
      const validacion = Joi.validate(objValidar,keyValidar);
      if(!validacion.error){
        console.log('Puede continuar la operación... datos validados')
      }else{
        return response.send(`EXISTE UN ERROR: ${validacion.error}`)
      }
      if(numIntentos <=0){
        const respuesta = {
          resultado: numDiv,
          user: `Usuario: ${cookie.nombreUsuario}`,
          mensaje: "SE HAN HAGOTADO LOS TOKENS"
        };
        response.send(respuesta);
      }else{
        const respuesta = {
          resultado: numDiv,
          user: `Usuario: ${cookie.nombreUsuario}`,
        };
        if(cookieSegura.intentos){
          response.cookie('Intentos Disponibles',numIntentos,{signed:true});
        }
        return response.send(respuesta);
      }
    }

  }
}

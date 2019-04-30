import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

//http://192.168.1.1:3000/segmentoInicial/segmentoAccion
//http://192.168.1.1:3000/mascotas/crear
//http://192.168.1.1:3000/mascotas/borrar
// @Controller(segmentoInicial)
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}
 //@Controller
  @Get('/hello-world') // METODO HTTP
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post() //METODO HTTP
  postHello(): string {
    return 'Hola mundo en POST';
  }

  /*
  * Segmento inicial:/api
  * 1) Segmento Acción: GET 'hello-world'
  * 2)Segmento Acción: POST 'hello-world'
  * 3) Segmento Acción: PUT '...' -> '...'
  * 4) Segmento Acción: DELETE '...' -> '...'
   */

  // Accion GET -> hello-world
  @Get('/helloGet')
  getHelloWorld(): string{
    return 'HOLA MUNDO GET'
  }

  //Accion POST -> hello world
  @Post('/helloPost')
  postHelloWorld() : string{
    return 'HELLO WORLD POST'
  }
  //Accion PUT -> salut-monde
  @Put('/salut-monde')
  putSalutMonde(){
    return 'SALUT-MONDE PUT';
  }

  //Accion DELETE -> olá mundo
  @Delete('/ola-mundo')
  deleteOla(){
    return 'OLÁ MUNDO DELETE'
  }

  /*let nombre ='Jacinto'; // String
   let edad = 29; // number
   let sueldo = 1.20; // number
   let casado = false; // boolean
   let hijos = null; //object
   let alas = undefined; //object
   // en caso de que una variable no se modifique se usa const
   */


  @Get('/adivina')
    adivina(@Headers() headers): string{
    console.log('Headers: ', headers);
    const numeroRandomico = Math.round(Math.random()*10);
    const numeroDeCabecera = Number(headers.numero);
    if(numeroDeCabecera ==numeroRandomico ) {
      return 'OK';
    }else{
      return 'nani...!!!!'
    }

  }

  @Get('/consultar')
  consultar(@Query() queryParams){
    console.log(queryParams);
    if(queryParams.nombre){
      return `Hola ${queryParams.nombre}`
    }else{
      return 'Hola extraño'
    }
  }

  @Get('/ciudad/:idCiudad')
  ciudad(@Param() parametrosRuta){
    switch(parametrosRuta.idCiudad.toLowerCase()){
      case 'quito':
        return 'Que fuefff';
      case 'guayaquil':
        return 'Que maah ñañoosh';
      default:
        return 'Buenas tardes';
    }
  }

  @Post('registroComida')
  registroComida(@Body() parametrosCuerpo, @Response() response) {
    console.log(parametrosCuerpo);
    if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
      const cantidad = Number(parametrosCuerpo.cantidad);
      if(cantidad > 1){
        response.set('Premio', 'Guatita');
        return response.send({mensaje:'Registro creado'});
      }
      return response.send({mensaje:'Registro creado'});
    } else{
      return response.status(400).send({mensaje:'no envia nombre o cantidad', error:400});

    }

  }

 @Get('/semilla')
  semilla(@Request() request, @Response() response){
    console.log(request.cookies);
    const cookies = request.cookies;
    const esquemaValidacionNumero = Joi.object().keys({numero: Joi.number().integer().required()});
    const objetoValidacion= {
      numero: cookies.numero
    };
    const resultado=Joi.validate(objetoValidacion,esquemaValidacionNumero);
    if(resultado.error){
      console.log('Resultado: ', resultado);
    }else{
      console.log('Numero valido');
    }

    const cookieSegura = request.signedCookies.fechaServidor;
    if(cookieSegura){
      console.log('Cookie segura');
    }else{
      console.log('Cookie no valida');
    }
    if(cookies.micookie){
      const horaFechaServidor = new Date();
      const minutos = horaFechaServidor.getMinutes();
      horaFechaServidor.setMinutes(minutos+1);
      response.cookie('fechaServidor' ,//Nombre
                      new Date().getTime(), //Valor
          {
            //OPCIONES
            //expires: horaFechaServidor
            signed: true
          });
      return response.send('OK');
    }else{
      return response.send(':C');
    }



 }

  @Get('/inicio')
  inicio(@Response() res){
    return res.render('inicio');
  }
}



/*@NombreDecoradorClase() // Decorador -> FUNCION
class usuario{
 @Atributo() // Decorador
  atributoPublico; //Public
  private atributoPrivado;
  protected atributoProtegido;

  constructor( @Parametro()atributoPublico, @OtroParametro() atributoPrivado, @OtroOtroParametro()atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }

  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido (){}


}*/

const jston = [{
  key : "value",
  "nombre" : "Jacinto",
  "edad": 25,
  "sueldo": 1.2,
  "casado": false,
  "hijos": null,
  "mascotas" : ["jaqueline",
    2,
    1.01,
    false,
    null,
    {
      "nombre": "motas"
    },
  ],

},
];

let objeto:any ={
  propiedad :'valor',
  propiedadDos:'valor2'
};
objeto.propiedad // valor
objeto.propiedadDos //valor2
// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor3';
delete objeto.propiedadTres; //-> destruye la propiedad
objeto.propiedadTres = undefined; // ->destruye la propiedad


//FUNCIONES
function holaMundo() {
  console.log('Hola mundo - viene desde funcion')
}

const respuestaholaMundo =holaMundo(); //undefined
console.log('Resp hola mundo:', respuestaholaMundo)

//FUNCION TIPADA
function suma(a:number,b:number):number {
  return a+b;
}
const respuestaSuma = suma( 1,2);
console.log('Resp suma: ',respuestaSuma);

// CONDICIONALES
//Truty -> true
//Falsy -> false

if(true){ //Truty
  console.log('Verdadero')
}else {
  console.log('Falso');
}

  if(false){ //Falsy
    console.log('Verdadero')
  }else{
    console.log('Falso');
  }

  if(""){ // un string vacio es Falsy
    console.log('Verdadero ""');
  }else{
    console.log('Falso ""');
  }

if("a"){ // un string con más de un caracter es Truty
  console.log('Verdadero "a"');
}else{
  console.log('Falso "a"');
}

if(0){ // El 0 en JS es Falsy
  console.log('Verdadero "a"');
}else{
  console.log('Falso "a"');
}

if(-1){ // El -1 en JS es Truty
  console.log('Verdadero "-1"');
}else{
  console.log('Falso "-1"');
}


if(1){ // El 1 en JS es Truty
  console.log('Verdadero "1"');
}else{
  console.log('Falso "1"');
}

if(undefined){ // El undefined en JS es Falsy
  console.log('Verdadero "undfind"');
}else{
  console.log('Falso "undfind"');
}

if(null){ // El null en JS es Falsy
  console.log('Verdadero "null"');
}else{
  console.log('Falso "null"');
}

//Operadores de Arreglos en JS
let arreglo:any = [1,'A',true,null,{},[]];
const arregloNumeros = [1,2,3,4,5,6];

//1) Imprimir en consola todos los elementos
const arregloNumerosForEach = [1,2,3,4,5,6];
const rForEach =arregloNumerosForEach.forEach(
    function (valorActual) {
      console.log(`Valor: ${valorActual}`);
    }
);

const r2ForEach = arregloNumerosForEach.forEach(
    n => console.log(`${n}`)
);
console.log(`RESPUESTA FOREACH: ${rForEach}`);
console.log(`RESPUESTA FOREACH: ${r2ForEach}`);

//2) Sumar 2 a los pares y 1 a los impares
const arregloNumerosMap = [1,2,3,4,5,6];
const rMap = arregloNumerosMap.map( //Devolver el nuevo VALOR de ese elemento
    (valorActual)=>{
      const esPar = valorActual%2==0;
      if(esPar){
        return valorActual +2;
      }else{
        return valorActual +1;
      }

});
console.log(`RESPUESTA MAP: ${rMap}`);

//3) Buscar si existe el número 4
const arregloNumerosFind = [1,2,3,4,5,6];

const rFind = arregloNumerosFind.find(// CONDICION para devolver ese ELEMENTO
    (valorActual)=>{
      return valorActual == 4;
    }
    );
console.log(`RESPUESTA FIND: ${rFind}`);
//4) Filtrar los números menores a 5
const arregloNumerosFilter = [1,2,3,4,5,6];

const rFilter = arregloNumerosFilter.filter(// COND TRUE -> Agrega al arreglo
    // COND FALSE -> Se omite del arreglo
    // Devuelve un nuevo arreglo filtrado
    (valorActual)=>{
      return valorActual < 5;
    }
);
console.log(`RESPUESTA FILTER: ${rFilter}`);

//5) Indicar si TODOS los valores son positivos
const arregloNumerosEvery = [1,2,3,4,5,6];

const respuestaEvery = arregloNumerosEvery.every( // si TODOS cumplen devuelve TRUE
                          // si ALGUNO no cumple FALSE
    (valorActual)=>{
      return valorActual >0
    }

);
console.log(`RESPUESTA EVERY: ${respuestaEvery}`); // TRUE
//6) ALGUN valor es menor que 2
const arregloNumerosSome = [1,2,3,4,5,6];
const respuestaSome = arregloNumerosSome.some( // Si ALGUNO cumple la codición TRUE
                                              // Si TODOS no cumplen FALSE
    (valorActual) => {
      return valorActual == 2;
    }
);
console.log(`RESPUESTA SOME: ${respuestaSome}`); // TRUE
//7) Sumar todos los valores
 const arregloNumerosReduce = [1,2,3,4,5,6];
 const valorDondeEmpiezaCalculo = 0;

 const respuestaReduce = arregloNumerosReduce.reduce(
     (acumulado, valorActual) => {
       return acumulado + valorActual;
       },
     valorDondeEmpiezaCalculo
 );
console.log(`Respuesta REDUCE: ${respuestaReduce}`);
// < 4 sumar 10% +5
// >=4 sumar 15% + 3
const valorInicial =0;
const salida = arregloNumerosReduce.reduce(
    (acumulado,valorActual) =>{
      if(valorActual>=4){
        return ((acumulado + valorActual + valorActual*0.15 )+ 3)
      }else{
        return ((acumulado + valorActual + valorActual*0.1) + 5)
      }
    }, valorInicial
);
console.log(`Respuesta REDUCE 2: ${salida}`);

//9) Restar todos los valores de 100
const valorInicial2 =100;
const salida2 = arregloNumerosReduce.reduce(
    (acumulado,valorActual) =>{
      return acumulado -valorActual
    }, valorInicial2
);
console.log(`Respuesta REDUCE 100: ${salida2}`);

// 1.1) Sumar 10 a todos
// 1.2) Filtrar a los mayores a 15
// 1.3) Si hay algun numero mayor a 30
const arregloNumerosEjercicio = [1,2,3,4,5,6];

const salidaEjer =arregloNumerosEjercicio.map(
    (valorActual)=>{
      return valorActual +10;
    }).filter((valorActual)=> {
      return valorActual > 15;
}).some((valorActual)=>{
    return valorActual >30;
    });

console.log(`Respuesta Ejercicios: ${salidaEjer}`);
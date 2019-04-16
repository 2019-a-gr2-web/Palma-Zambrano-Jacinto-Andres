import {Controller, Delete, Get, HttpCode, Post, Put, Headers} from '@nestjs/common';
import { AppService } from './app.service';


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
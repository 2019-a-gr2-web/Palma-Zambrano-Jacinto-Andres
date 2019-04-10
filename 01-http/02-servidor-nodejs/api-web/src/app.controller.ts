import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // METODO HTTP
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post() //METODO HTTP
  postHello(): string {
    return 'Hola mundo en POST';
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
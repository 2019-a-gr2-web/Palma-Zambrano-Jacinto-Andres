import {Controller, Get, Post, Res, Body} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragosController {

    constructor(private readonly _tragosService:TragosService){

    }

    @Get('lista')
    listarTragos(
        @Res() res
    ){
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
    }

    @Get('crear')
    crearTrago(
        @Res() res
    ){
        res.render('tragos/crear-editar')
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago:Trago,
        @Res() res,
        // @Body('nombre') nombre:string,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradosAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,
        // @Body('precio') precio:number,
    ){
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);

        try{
            const respuestaCrear = await this._tragosService.crear(trago);
            console.log('RESPUESTA: ', respuestaCrear);

            res.redirect('/api/traguito/lista');
        }catch(e){
            console.error(e);
            res.statusCode(500);
            res.send({mensaje:'Error', codigo:500});
        }





        // console.log('Trago: ', trago, typeof trago);
        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);

    }

}
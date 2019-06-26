import {Controller, Get, Post, Res, Body, Query, Session} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./DTO/tragos.create.dto";
import {validate} from "class-validator";

@Controller('/api/traguito')
export class TragosController {

    constructor(private readonly _tragosService: TragosService) {

    }

    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ){
        console.log(session);
        session.autenticado = true;
        session.nombreUsuario = nombre;
        return 'ok';
    }

    @Get('login')
    loginVista(
        @Res() res
    ){

        res.render('tragos/login');
    }

    @Post('login')
    login(
        @Body() usuario,
        @Session() session,
        @Res() res
    ){
        if(usuario.username === 'jacinto' && usuario.password === '12345678'){
            //    QUE HACEMOS
            session.username = usuario.username;
            res.redirect('/api/traguito/protegida');
        }else{
            res.status(400);
            res.send({mensaje:'Error login',error:400})
        }
    }

    @Get('protegida')
    protegida(
        @Session() session,
        @Res() res
    ){
        if(session.username){
            res.render('tragos/protegida',{
                nombre:session.username});
        }else{
            res.redirect('/api/traguito/login');
        }
    }

    @Get('lista')
    async listarTragos(
        @Res() res
    ) {
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {
            arregloTragos: arregloTragos
        })
    }

    @Get('crear')
    crearTrago(
        @Res() res, @Query('mensaje') mensaje:string
    ) {
       //se guarda el estado en la URL
        res.render('tragos/crear-editar', {mensaje:mensaje})
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago: Trago,
        @Res() res,
        // @Body('nombre') nombre:string,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradosAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,
        // @Body('precio') precio:number,
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad):undefined;

        let tragoAValidar = new TragosCreateDto();
        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;


        try {

            const errores = await validate(tragoAValidar);

            if (errores.length > 0) {
                console.error(errores);
                res.status(400);
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaCrear = await this._tragosService.crear(trago);
                console.log('RESPUESTA: ', respuestaCrear);

                res.redirect('/api/traguito/lista');
            }

        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }


        // console.log('Trago: ', trago, typeof trago);
        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);

    }

}
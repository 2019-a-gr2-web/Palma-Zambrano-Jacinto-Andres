import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import{FiestaEntity} from "./fiesta.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [

            ],
            'default'
        ),
    ],  // Modulos
    controllers: [

    ], // Controladores
    providers: [

    ], // Servicios
    exports: [

    ] // Exportar Servicios
})
export class FiestaModule {
}
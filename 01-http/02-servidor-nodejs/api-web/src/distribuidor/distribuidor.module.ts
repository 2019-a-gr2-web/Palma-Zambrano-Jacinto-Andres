import {Module} from "@nestjs/common";
import {DistribuidorEntity} from "../distribuidor/distribuidor.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


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
export class DistribuidorModule {
}

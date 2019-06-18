import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";
import {FiestaEntity} from "./fiesta/fiesta.entity";

@Module({
  imports: [TragosModule,DistribuidorModule,FiestaModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre cadena conex por defecto de TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bdd_pruebas_web',
      entities: [
        TragosEntity,FiestaEntity,DistribuidorEntity
      ],
      synchronize: true,
     // insecureAuth : true
    }),],//Modulos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

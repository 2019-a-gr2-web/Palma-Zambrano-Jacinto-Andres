import {Column} from "typeorm";
import {DistribuidorEntity} from "../../distribuidor/distribuidor.entity";
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class TragosCreateDto {
    @IsEmpty()
    id:number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cerveza';

    @IsNotEmpty()
    @IsNumber()
    gradosAlcohol: number;

    @IsDate()
    fechaCaducidad: Date;

    @IsNumber()
    precio: number;

    @IsNumber()
    distribuidorId: DistribuidorEntity;
}
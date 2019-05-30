import { Injectable } from '@nestjs/common';
import {Conductores} from "./conductores/conductores";

@Injectable()
export class AppService {

  bddConductores : Conductores[]=[];
  recnum = 1;

  constructor(){
    const conductor:Conductores={
      nombres:'Jacinto Andres',
      apellidos:'Palma Zambrano',
      fechaNacimiento : new Date(1993,12,8),
      numeroAutos: 1,
      licenciaValida:false

    };
    this.crearConductor(conductor)
  }

  crearConductor(nuevoConductor: Conductores):Conductores{
    nuevoConductor.id = this.recnum;
    this.recnum++;
    this.bddConductores.push(nuevoConductor);
    return nuevoConductor
  }

  eliminarConductorPorId(id:number):Conductores[]{
    console.log('id:', id);
    const indice= this.bddConductores.findIndex(
        (conductor)=>{
          return conductor.id===id
        }
    );
    this.bddConductores.splice(indice,1);
    return this.bddConductores;
  }

  buscarPorNombre(nombre: string) {
    console.log('nombre:', nombre);
    const resultado=this.bddConductores.filter(
        (conductor)=>{
          return conductor.nombres.includes(nombre);
        }
    );
    console.log('resultado:',resultado);
    return resultado;


  }
}

import { Injectable } from '@nestjs/common';
import {Conductores} from "./conductores/conductores";
import {Autos} from "./autos/autos";

@Injectable()
export class AppService {

  bddConductores : Conductores[]=[];
  recnum = 1;
  bddAutos : Autos[]=[];
  recnum2 = 1;

  constructor(){
    const conductor:Conductores={
      nombres:'Jacinto Andres',
      apellidos:'Palma Zambrano',
      fechaNacimiento : new Date(1993,12,8),
      numeroAutos: 1,
      licenciaValida:false

    };
    this.crearConductor(conductor)

    const auto:Autos={
    chasis:123456789,
    nombreMarca:"Chevrolet",
    colorUno:"azul",
    colorDos:"",
    nombreModelo:"Luv DMAX",
    anio:2018,
    conductorId:1
    };
  this.crearAuto(auto);
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

  //Métodos del Hijo - Auto

  crearAuto(nuevoAuto: Autos):Autos{
    nuevoAuto.id = this.recnum2;
    this.recnum2++;
    this.bddAutos.push(nuevoAuto);
    return nuevoAuto
  }

  buscarPorId(id: number) {
    console.log('id:', id);
    const resultado=this.bddAutos.filter(
        (auto)=>{
          return auto.conductorId===id;
        }
    );
    console.log('resultado:',resultado);
    return resultado;


  }

  buscarAutoMarca(marca: string, id:number) {
    console.log('nombre:', marca);
    const resultado=this.bddAutos.filter(
        (auto)=>{
          return auto.nombreMarca.includes(marca) && auto.conductorId===id ;
        }
    );
    console.log('resultado:',resultado);
    return resultado;


  }

  eliminarPorId(id:number):Autos[]{
    console.log('id:', id);
    const indice= this.bddAutos.findIndex(
        (auto)=>{
          return auto.id===id
        }
    );
    this.bddAutos.splice(indice,1);
    return this.bddAutos;
  }


}

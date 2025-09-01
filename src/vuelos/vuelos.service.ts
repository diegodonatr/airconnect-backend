import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { Vuelo } from './entities/vuelo.entity';
import { Aeropuerto } from 'src/aeropuertos/entities/aeropuerto.entity';
import { AeropuertosService } from 'src/aeropuertos/aeropuertos.service';

@Injectable()
export class VuelosService {
  private vuelos: Vuelo[] = [];

  constructor(private readonly aeropuertosService: AeropuertosService){};

  crearVuelo(createVueloDto: CreateVueloDto): Vuelo {
    // Verificar si existe el vuelo según el código
    if (this.vuelos.find((vuelo) => vuelo.numeroVuelo === createVueloDto.numeroVuelo)) {
      throw new BadRequestException(`Ya existe un vuelo con el código de vuelo ${createVueloDto.numeroVuelo}`);
    }
    // Verificar existencia de Aeropuertos de origen y de destino
    const aeropuertoOrigen: Aeropuerto | undefined = this.aeropuertosService.getAeropuertoByCodigo(createVueloDto.origen);
    if (!aeropuertoOrigen) {
      throw new NotFoundException(`No existe el aeropuerto con código ${createVueloDto.origen}`);
    }

    const aeropuertoDestino: Aeropuerto | undefined = this.aeropuertosService.getAeropuertoByCodigo(createVueloDto.destino);
    if (!aeropuertoDestino) {
      throw new NotFoundException(`No existe el aeropuerto con código ${createVueloDto.destino}`);
    }

    // Crear vuelo
    const vueloCreado: Vuelo = new Vuelo(
      this.vuelos.length + 1,
      createVueloDto.numeroVuelo,
      createVueloDto.fechaSalida,
      createVueloDto.duracionEstimada,
      aeropuertoOrigen,
      aeropuertoDestino,
      createVueloDto.estado
    );
    // Agregar vuelo a la lista de vuelos
    this.vuelos.push(vueloCreado);
    return vueloCreado;
  }

  getTodosLosVuelos(origen?: string, estado?: string) {
    // Si ingresó origen pero no estado
    if ((origen) && (!estado)){
      return this.vuelos.filter((vuelo) => vuelo.origen.codigo === origen);
    }
    // Al revés
    if ((!origen) && (estado)){
      return this.vuelos.filter((vuelo) => vuelo.estado === estado);
    }
    // Ingresó los dos
    if ((origen) && (estado)){
      return this.vuelos.filter((vuelo) => vuelo.origen.codigo === origen && vuelo.estado === estado)
    }
    // No ingresó nada
    return this.vuelos;
  }

  getVueloById(id: number): Vuelo | undefined{
    // Buscar vuelo por id, si no lo encuentra, retornar error 400
    const vueloBuscado: Vuelo | undefined = this.vuelos.find((vuelo) => vuelo.id === id)
    if (!vueloBuscado) {
      throw new BadRequestException(`No hay ningún vuelo con el id ${id}`)
    }
    return vueloBuscado;
  }

  modificarVueloById(id: number, updateVueloDto: UpdateVueloDto): void {
    const vueloModificado = this.getVueloById(id);
    if (!vueloModificado) {
      throw new NotFoundException(`No se encuentra un vuelo con id ${id}.`);
    }
    if (updateVueloDto.estado) {
      vueloModificado.estado = updateVueloDto.estado;
    }
  }
}

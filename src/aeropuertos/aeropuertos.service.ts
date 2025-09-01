import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Injectable()
export class AeropuertosService {
  private aeropuertos: Aeropuerto[] = [];

  constructor(){};

  crearAeropuerto(createAeropuertoDto: CreateAeropuertoDto): Aeropuerto {
    // Verificar si existe el aeropuerto según código
    if (this.aeropuertos.find((aeropuerto) => aeropuerto.codigo === createAeropuertoDto.codigo)) {
      throw new BadRequestException(`El aeropuerto con código ${createAeropuertoDto.codigo} ya existe.`)
    }
    // No existe, entonces crearlo con los datos del Dto
    const aeropuertoCreado = new Aeropuerto(
      this.aeropuertos.length + 1,
      createAeropuertoDto.nombre,
      createAeropuertoDto.codigo,
      createAeropuertoDto.ciudad
    );
    // Ingresar el nuevo aeropuerto a la lista de aeropuertos.
    this.aeropuertos.push(aeropuertoCreado);
    return aeropuertoCreado;
  }

  getTodosLosAeropuertos(): Aeropuerto[] {
    return this.aeropuertos;
  }

  getAeropuertoById(id: number): Aeropuerto | undefined {
    // Buscar el aeropuerto según el id
    const aeropuertoEncontrado: Aeropuerto | undefined = this.aeropuertos.find((aeropuerto) => aeropuerto.id === id);
    // Si no existe, retornar error
    if (!aeropuertoEncontrado){
      throw new NotFoundException(`No se encontró el aeropuerto con id ${id}.`)
    }
    return aeropuertoEncontrado;
  }

  getAeropuertoByCodigo(codigoAeropuerto: string): Aeropuerto | undefined {
    // Buscar el aeropuerto según el código
    const aeropuertoEncontrado: Aeropuerto | undefined = this.aeropuertos.find((aeropuerto) => aeropuerto.codigo === codigoAeropuerto);
    // Si no existe, retornar error
    if (!aeropuertoEncontrado){
      throw new NotFoundException(`No se encontró el aeropuerto con el código ${codigoAeropuerto}.`)
    }
    return aeropuertoEncontrado;
  }
}

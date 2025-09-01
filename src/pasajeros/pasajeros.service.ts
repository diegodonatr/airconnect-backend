import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { Pasajero } from './entities/pasajero.entity';

@Injectable()
export class PasajerosService {
  private pasajeros: Pasajero[] = [];

  constructor(){};

  crearPasajero(createPasajeroDto: CreatePasajeroDto): Pasajero {
    // Verificar si ya hay un pasajero creado con ese email
    if (this.pasajeros.find((pasajero) => pasajero.email === createPasajeroDto.email)) {
      throw new BadRequestException(`Ya existe un pasajero asociado al email ${createPasajeroDto.email}`);
    }
    // Crear pasajero
    const pasajeroCreado: Pasajero = new Pasajero(
      this.pasajeros.length + 1,
      createPasajeroDto.nombre,
      createPasajeroDto.apellido,
      createPasajeroDto.email
    );
    // Agregar pasajero a la lista de pasajeros
    this.pasajeros.push(pasajeroCreado);
    return pasajeroCreado;
  }

  getTodosLosPasajeros(): Pasajero[] {
    return this.pasajeros;
  }

  getPasajeroById(id: number): Pasajero | undefined {
    // Buscar pasajero por id
    const pasajeroEncontrado: Pasajero | undefined = this.pasajeros.find((pasajero) => pasajero.id === id);
    // Si no existe, retornar error
    if (!pasajeroEncontrado) {
      throw new NotFoundException(`No se encontró un pasajero con el id ${id}.`);
    }
    return pasajeroEncontrado;
  }

  eliminarPasajero(id: number): void {
    // Buscar pasajero por id
    if (!this.pasajeros.find((pasajero) => pasajero.id === id)) {
      throw new NotFoundException(`No se encontró un pasajero con el id ${id}`);
    }
    // Eliminar pasajero de la lista de pasajeros
    this.pasajeros = this.pasajeros.filter((pasajero) => pasajero.id != id);
  }
}

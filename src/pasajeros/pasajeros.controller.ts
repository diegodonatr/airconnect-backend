import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { Pasajero } from './entities/pasajero.entity';
import { ApiParam } from '@nestjs/swagger';

@Controller('pasajeros')
export class PasajerosController {
  constructor(private readonly pasajerosService: PasajerosService) {}

  @Post()
  create(@Body() createPasajeroDto: CreatePasajeroDto): Pasajero {
    return this.pasajerosService.crearPasajero(createPasajeroDto);
  }

  @Get()
  findAll(): Pasajero[] {
    return this.pasajerosService.getTodosLosPasajeros();
  }

  @Get(':id')
  @ApiParam({name: 'id', type: Number, description: 'id interno del Pasajero'})
  findOne(@Param('id') id: string): Pasajero | undefined {
    return this.pasajerosService.getPasajeroById(+id);
  }

  @Delete(':id')
  @ApiParam({name: 'id', type: Number, description: 'id interno del Pasajero'})
  remove(@Param('id') id: string): void {
    return this.pasajerosService.eliminarPasajero(+id);
  }
}

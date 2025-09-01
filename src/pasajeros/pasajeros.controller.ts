import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { Pasajero } from './entities/pasajero.entity';

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
  findOne(@Param('id') id: string): Pasajero | undefined {
    return this.pasajerosService.getPasajeroById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.pasajerosService.eliminarPasajero(+id);
  }
}

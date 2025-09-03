import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { Pasajero } from './entities/pasajero.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('pasajeros')
export class PasajerosController {
  constructor(private readonly pasajerosService: PasajerosService) {}

  @Post()
  @ApiOperation({summary: 'Crear un Pasajero'})
  @ApiResponse({status: 201, description: 'Pasajero creado existosamente'})
  @ApiResponse({status: 400, description: 'Ya existe un pasajero asociado a ese email'})
  create(@Body() createPasajeroDto: CreatePasajeroDto): Pasajero {
    return this.pasajerosService.crearPasajero(createPasajeroDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener todos los pasajeros'})
  findAll(): Pasajero[] {
    return this.pasajerosService.getTodosLosPasajeros();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener un pasajero según su id'})
  @ApiParam({name: 'id', type: Number, description: 'id interno del Pasajero'})
  findOne(@Param('id') id: string): Pasajero | undefined {
    return this.pasajerosService.getPasajeroById(+id);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Eliminar un pasajero'})
  @ApiParam({name: 'id', type: Number, description: 'id interno del Pasajero'})
  remove(@Param('id') id: string): void {
    return this.pasajerosService.eliminarPasajero(+id);
  }
}
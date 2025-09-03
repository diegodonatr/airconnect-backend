import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('aeropuertos')
export class AeropuertosController {
  constructor(private readonly aeropuertosService: AeropuertosService) {}

  @Post()
  @ApiOperation({summary: 'Crear un aeropuerto'})
  @ApiResponse({status: 201, description: 'Aeropuerto creado existosamente'})
  @ApiResponse({status: 400, description: 'El aeropuerto ya existe'})
  create(@Body() createAeropuertoDto: CreateAeropuertoDto) {
    return this.aeropuertosService.crearAeropuerto(createAeropuertoDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener todos los aeropuertos'})
  findAll() {
    return this.aeropuertosService.getTodosLosAeropuertos();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener un aeropuerto según su id'})
  @ApiParam({name: 'id', type: Number, description: 'id interno del Aeropuerto'})
  findOne(@Param('id') id: string) {
    return this.aeropuertosService.getAeropuertoById(+id);
  }
}
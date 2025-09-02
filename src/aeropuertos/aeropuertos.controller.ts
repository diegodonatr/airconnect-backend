import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('aeropuertos')
export class AeropuertosController {
  constructor(private readonly aeropuertosService: AeropuertosService) {}

  @Post()
  create(@Body() createAeropuertoDto: CreateAeropuertoDto) {
    return this.aeropuertosService.crearAeropuerto(createAeropuertoDto);
  }

  @Get()
  findAll() {
    return this.aeropuertosService.getTodosLosAeropuertos();
  }

  @Get(':id')
  @ApiParam({name: 'id', type: Number, description: 'id interno del Aeropuerto'})
  findOne(@Param('id') id: string) {
    return this.aeropuertosService.getAeropuertoById(+id);
  }
}

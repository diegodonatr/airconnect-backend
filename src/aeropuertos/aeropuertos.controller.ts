import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Controller('aeropuertos')
export class AeropuertosController {
  constructor(private readonly aeropuertosService: AeropuertosService) {}

  @Post()
  create(@Body() createAeropuertoDto: CreateAeropuertoDto): Aeropuerto {
    return this.aeropuertosService.crearAeropuerto(createAeropuertoDto);
  }

  @Get()
  findAll(): Aeropuerto[] {
    return this.aeropuertosService.getTodosLosAeropuertos();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Aeropuerto | undefined {
    return this.aeropuertosService.getAeropuertoById(+id);
  }
}

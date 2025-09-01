import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { Vuelo } from './entities/vuelo.entity';
import { Aeropuerto } from 'src/aeropuertos/entities/aeropuerto.entity';

@Controller('vuelos')
export class VuelosController {
  constructor(private readonly vuelosService: VuelosService) {}

  @Post()
  create(@Body() createVueloDto: CreateVueloDto): Vuelo {
    return this.vuelosService.crearVuelo(createVueloDto);
  }

  @Get()
  findAll(@Query('origen') origen?: string, @Query('estado') estado?: string): Vuelo[] {
    return this.vuelosService.getTodosLosVuelos(origen, estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Vuelo | undefined{
    return this.vuelosService.getVueloById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVueloDto: UpdateVueloDto) {
    return this.vuelosService.modificarVueloById(+id, updateVueloDto);
  }
}
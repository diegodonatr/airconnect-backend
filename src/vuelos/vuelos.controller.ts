import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { Vuelo } from './entities/vuelo.entity';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('vuelos')
export class VuelosController {
  constructor(private readonly vuelosService: VuelosService) {}

  @Post()
  create(@Body() createVueloDto: CreateVueloDto): Vuelo {
    return this.vuelosService.crearVuelo(createVueloDto);
  }

  @Get()
  @ApiQuery({name: 'origen', type: String, required: false, description: 'Ciudad de origen'})
  findAll(@Query('origen') origen?: string, @Query('estado') estado?: string): Vuelo[] {
    return this.vuelosService.getTodosLosVuelos(origen, estado);
  }

  @ApiParam({name: 'id', type: Number, description: 'id interno del Vuelo'})
  @Get(':id')
  findOne(@Param('id') id: string): Vuelo | undefined{
    return this.vuelosService.getVueloById(+id);
  }

  @ApiParam({name: 'id', type: Number, description: 'id interno del Vuelo'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVueloDto: UpdateVueloDto) {
    return this.vuelosService.modificarVueloById(+id, updateVueloDto);
  }
}
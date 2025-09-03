import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { Vuelo } from './entities/vuelo.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('vuelos')
export class VuelosController {
  constructor(private readonly vuelosService: VuelosService) {}

  @Post()
  @ApiOperation({summary: 'Crear un vuelo'})
  @ApiResponse({status: 201, description: 'Vuelo creado existosamente'})
  @ApiResponse({status: 400, description: 'Ya existe un vuelo con ese código de vuelo'})
  @ApiResponse({status: 404, description: 'Revisar parámetros de entrada'})
  create(@Body() createVueloDto: CreateVueloDto): Vuelo {
    return this.vuelosService.crearVuelo(createVueloDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener todos los vuelos'})
  @ApiQuery({name: 'origen', type: String, required: false, description: 'Ciudad de origen'})
  findAll(@Query('origen') origen?: string, @Query('estado') estado?: string): Vuelo[] {
    return this.vuelosService.getTodosLosVuelos(origen, estado);
  }

  
  @Get(':id')
  @ApiOperation({summary: 'Obtener un vuelo según su id'})
  @ApiParam({name: 'id', type: Number, description: 'id interno del Vuelo'})
  findOne(@Param('id') id: string): Vuelo | undefined{
    return this.vuelosService.getVueloById(+id);
  }

  
  @Patch(':id')
  @ApiResponse({status: 200, description: 'Vuelo modificado existosamente'})
  @ApiResponse({status: 404, description: 'No se encuentra un vuelo con ese id'})
  @ApiOperation({summary: 'Modificar un vuelo según su id'})
  @ApiParam({name: 'id', type: Number, description: 'id interno del Vuelo'})
  update(@Param('id') id: string, @Body() updateVueloDto: UpdateVueloDto) {
    return this.vuelosService.modificarVueloById(+id, updateVueloDto);
  }
}
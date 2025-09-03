import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateReservaDto } from "./dto/create-reserva.dto";
import { Reserva } from "./entities/reserva.entity";
import { ReservasService } from "./reservas.service";
import { UpdateReservaDto } from "./dto/update-reserva.dto";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('reservas')
export class ReservasController {
    constructor(private readonly ReservasService: ReservasService){}

    @Post()
    @ApiOperation({summary: 'Crear una reserva'})
    @ApiResponse({status: 201, description: 'Reserva creada existosamente'})
    @ApiResponse({status: 400, description: 'Revisar parámetros de entrada'})
    create(@Body() createReservaDto: CreateReservaDto): Reserva {
    return this.ReservasService.crearReserva(createReservaDto);
    }

    @Get(':id')
    @ApiOperation({summary: 'Obtener una reserva según su id'})
    @ApiResponse({status: 404, description: 'No existe una reserva con ese id'})
    @ApiParam({name: 'id', type: Number, description: 'id interno de la reserva'})
    findOne(@Param('id') id: string): Reserva | undefined{
        return this.ReservasService.getReservaById(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Modificar una reserva según su id'})
    @ApiResponse({status: 404, description: 'No existe una reserva con ese id'})
    @ApiParam({name: 'id', type: Number, description: 'id interno de la reserva'})
    update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.ReservasService.modificarReservaById(+id, updateReservaDto);
    }

    @Get()
    @ApiOperation({summary: 'Obtener todas las reservas'})
    @ApiQuery({name: 'idPasajero', type: Number, required: false, description: 'id del Pasajero'})
    findAll(@Query('idPasajero') idPasajero?: string): Reserva[] {
        return this.ReservasService.getTodasLasReservas(idPasajero);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Eliminar una reserva según su id'})
    @ApiResponse({status: 404, description: 'No existe una reserva con ese id'})
    @ApiParam({name: 'id', type: Number, description: 'id interno de la reserva'})
    remove(@Param('id') id: string): void {
        return this.ReservasService.eliminarReserva(+id);
    }
}
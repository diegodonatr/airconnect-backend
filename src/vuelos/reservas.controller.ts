import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateReservaDto } from "./dto/create-reserva.dto";
import { Reserva } from "./entities/reserva.entity";
import { ReservasService } from "./reservas.service";
import { UpdateReservaDto } from "./dto/update-reserva.dto";
import { ApiParam, ApiQuery } from "@nestjs/swagger";

@Controller('reservas')
export class ReservasController {
    constructor(private readonly ReservasService: ReservasService){}

    @Post()
    create(@Body() createReservaDto: CreateReservaDto): Reserva {
    return this.ReservasService.crearReserva(createReservaDto);
    }

    @Get(':id')
    @ApiParam({name: 'id', type: Number, description: 'id interno de la reserva'})
    findOne(@Param('id') id: string): Reserva | undefined{
        return this.ReservasService.getReservaById(+id);
    }

    @ApiParam({name: 'id', type: Number, description: 'id interno de la reserva'})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.ReservasService.modificarReservaById(+id, updateReservaDto);
    }

    @Get()
    @ApiQuery({name: 'idPasajero', type: Number, required: false, description: 'id del Pasajero'})
    findAll(@Query('idPasajero') idPasajero?: string): Reserva[] {
        return this.ReservasService.getTodasLasReservas(idPasajero);
    }

    @Delete(':id')
    @ApiParam({name: 'id', type: Number, description: 'id interno de la reserva'})
    remove(@Param('id') id: string): void {
        return this.ReservasService.eliminarReserva(+id);
    }
}
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateReservaDto } from "./dto/create-reserva.dto";
import { Reserva } from "./entities/reserva.entity";
import { ReservasService } from "./reservas.service";
import { UpdateReservaDto } from "./dto/update-reserva.dto";

@Controller('reservas')
export class ReservasController {
    constructor(private readonly ReservasService: ReservasService){}

    @Post()
    create(@Body() createReservaDto: CreateReservaDto): Reserva {
    return this.ReservasService.crearReserva(createReservaDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Reserva | undefined{
        return this.ReservasService.getReservaById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.ReservasService.modificarReservaById(+id, updateReservaDto);
    }

    @Get()
    findAll(@Query('idPasajero') idPasajero?: string): Reserva[] {
        return this.ReservasService.getTodasLasReservas(idPasajero);
    }

    @Delete(':id')
    remove(@Param('id') id: string): void {
        return this.ReservasService.eliminarReserva(+id);
    }
}
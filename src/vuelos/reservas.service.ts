import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReservaDto } from "./dto/create-reserva.dto";
import { Reserva } from "./entities/reserva.entity";
import { VuelosService } from "./vuelos.service";
import { PasajerosService } from "src/pasajeros/pasajeros.service";
import { UpdateReservaDto } from "./dto/update-reserva.dto";

@Injectable()
export class ReservasService {
    private reservas: Reserva[] = [];

    constructor(private readonly vuelosService: VuelosService, private readonly pasajerosService: PasajerosService){};

    crearReserva(createReservaDto: CreateReservaDto): Reserva {
        // Verificar que el vuelo exista
        if (!this.vuelosService.getVueloById(createReservaDto.vuelo.id)) {
            throw new NotFoundException(`No existe el vuelo código ${createReservaDto.vuelo.numeroVuelo}.`)
        }
        // Verificar que el pasajero exista
        if (!this.pasajerosService.getPasajeroById(createReservaDto.pasajero.id)) {
            throw new NotFoundException(`No existe el pasajero ${createReservaDto.pasajero.nombre} ${createReservaDto.pasajero.apellido}`);
        }
        // Crear la reserva
        const reservaCreada: Reserva = new Reserva(
            this.reservas.length + 1,
            createReservaDto.codigoReserva,
            new Date(),
            'Creada',
            createReservaDto.pasajero,
            createReservaDto.vuelo
        );
        // Agregar reserva a la lista
        this.reservas.push(reservaCreada);
        
        return reservaCreada;
    }

    getReservaById(id: number): Reserva | undefined{
        // Buscar reserva por id, si no lo encuentra, retornar error 400
        const reservaBuscada: Reserva | undefined = this.reservas.find((reserva) => reserva.id === id)
        if (!reservaBuscada) {
        throw new BadRequestException(`No hay ninguna reserva con el id ${id}`)
        }
        return reservaBuscada;
    }

    modificarReservaById(id: number, updateReservaDto: UpdateReservaDto): void {
        const reservaModificada = this.getReservaById(id);
        if (!reservaModificada) {
        throw new NotFoundException(`No se encuentra una reserva con id ${id}.`);
        }
        if (updateReservaDto.estado) {
        reservaModificada.estado = updateReservaDto.estado;
        }
    }

    getTodasLasReservas(idPasajero?: string) {
        // Si ingresó un id del pasajero
        if (idPasajero){
        return this.reservas.filter((reserva) => reserva.pasajero.id === +idPasajero);
        }
        // No ingresó nada
        return this.reservas;
    }

    eliminarReserva(id: number): void {
        // Buscar reserva por id
        if (!this.reservas.find((reserva) => reserva.id === id)) {
        throw new NotFoundException(`No se encontró una reserva con el id ${id}`);
        }
        // Eliminar pasajero de la lista de pasajeros
        this.reservas = this.reservas.filter((reserva) => reserva.id != id);
    }
}
import { Pasajero } from "src/pasajeros/entities/pasajero.entity";
import { Vuelo } from "../entities/vuelo.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReservaDto {
    @ApiProperty({example: 'JPM174', description: 'Código único de la reserva'})
    public codigoReserva: string;

    @ApiProperty({example: Pasajero, description: 'Objeto pasajero asociado a la reserva'})
    public pasajero: Pasajero;

    @ApiProperty({example: Vuelo, description: 'Objeto vuelo asociado a la reserva'})
    public vuelo: Vuelo;
}
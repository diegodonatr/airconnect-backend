import { Pasajero } from "src/pasajeros/entities/pasajero.entity";
import { Vuelo } from "../entities/vuelo.entity";

export class CreateReservaDto {
    public codigoReserva: string;
    public pasajero: Pasajero;
    public vuelo: Vuelo;
}
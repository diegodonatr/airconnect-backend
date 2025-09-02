import { ApiProperty } from "@nestjs/swagger";

export class CreatePasajeroDto {
    @ApiProperty({example: 'Diego', description: 'Nombre del pasajero'})
    public nombre: string;

    @ApiProperty({example: 'Donat', description: 'Apellido del pasajero'})
    public apellido: string;

    @ApiProperty({example: 'diego@donat.com', description: 'email del pasajero'})
    public email: string;
}

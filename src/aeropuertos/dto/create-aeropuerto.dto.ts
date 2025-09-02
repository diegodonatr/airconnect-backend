import { ApiProperty } from "@nestjs/swagger";

export class CreateAeropuertoDto {
    @ApiProperty({example: 'Arturo Merino Benítez', description: 'Aeropuerto Santiago de Chile'})
    public nombre: string;

    @ApiProperty({example: 'SCL', description: 'Código IATA del aeropuerto'})
    public codigo: string;

    @ApiProperty({example: 'Santiago', description: 'Ciudad donde se ubica el aeropuerto'})
    public ciudad: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class CreateVueloDto {
    @ApiProperty({example: 'LA401', description: 'Código único del vuelo'})
    public numeroVuelo: string;

    @ApiProperty({example: '2025-09-31', description: 'Fecha del despegue'})
    public fechaSalida: Date;

    @ApiProperty({example: 90, description: 'Duración del vuelo en horas'})
    public duracionEstimada: number;
    
    @ApiProperty({example: 'SCL', description: 'Código del aeropuerto de salida'})
    public origen: string;

    @ApiProperty({example: 'JFK', description: 'Código del aeropuerto de destino'})
    public destino: string;

    @ApiProperty({example: 'Aterrizado', description: 'Estado del vuelo'})
    public estado: string;
}
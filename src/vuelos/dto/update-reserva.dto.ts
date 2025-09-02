import { ApiProperty } from "@nestjs/swagger";

export class UpdateReservaDto {
    @ApiProperty({example: 'En vuelo', description: 'Estado del vuelo'})
    public estado: string;
}
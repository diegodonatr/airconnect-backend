import { ApiProperty } from "@nestjs/swagger";

export class UpdateVueloDto {
    @ApiProperty({example: 'En vuelo', description: 'Indica el estado del vuelo'})
    public estado: string;
}
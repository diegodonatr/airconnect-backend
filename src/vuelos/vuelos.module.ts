import { Module } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { ReservasService } from './reservas.service';

@Module({
  controllers: [VuelosController],
  providers: [VuelosService, ReservasService],
})
export class VuelosModule {}

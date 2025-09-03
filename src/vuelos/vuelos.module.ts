import { Module } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { ReservasService } from './reservas.service';
import { AeropuertosModule } from 'src/aeropuertos/aeropuertos.module';
import { PasajerosModule } from 'src/pasajeros/pasajeros.module';
import { ReservasController } from './reservas.controller';

@Module({
  imports : [AeropuertosModule, PasajerosModule],
  controllers: [VuelosController, ReservasController],
  providers: [VuelosService, ReservasService],
})
export class VuelosModule {}

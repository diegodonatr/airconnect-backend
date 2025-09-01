import { Module } from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { AeropuertosController } from './aeropuertos.controller';

@Module({
  controllers: [AeropuertosController],
  providers: [AeropuertosService],
  exports: [AeropuertosModule]
})
export class AeropuertosModule {}

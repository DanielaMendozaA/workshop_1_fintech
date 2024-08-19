import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroCreditCalculationService, MicrocreditRegistryService, MicrocreditsFactory, MicrocreditsService } from './microcredits.service';
import { Microcredits } from './entity/microcredits/microcredits.entity';
import { UsersModule } from '../users/users.module'; // Importa el UsersModule
import { MicrocreditsController } from './microcredits.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Microcredits]),
    UsersModule, // Asegúrate de importar el UsersModule
  ],
  providers: [
    MicrocreditsService,
    MicrocreditsFactory,
    MicroCreditCalculationService,
    MicrocreditRegistryService,
  ],
  controllers: [MicrocreditsController],
})
export class MicrocreditsModule {}
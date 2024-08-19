import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MicrocreditsModule } from './microcredits/microcredits.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user/user.entity';
import { Microcredits } from './microcredits/entity/microcredits/microcredits.entity';
import { FinancialRecord } from './financial-records/entity/financial-record/financial-record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Dani.checho123",
      database: "microcredit",
      entities: [User, Microcredits, FinancialRecord],
      synchronize: true
    }),
    UsersModule, MicrocreditsModule],
})
export class AppModule {}

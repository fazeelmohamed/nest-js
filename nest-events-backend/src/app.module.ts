import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { EventsController } from './events/events.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './config/typeorm.module';
import { Event } from './events/entity/event.entity';


@Module({
  imports: [
    TypeOrmConfigModule,
    ConfigModule.forRoot({
      envFilePath: ['env/dev.env', 'env/prod.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Event])
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}

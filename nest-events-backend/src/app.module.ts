import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { EventsController } from './events/events.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './config/typeorm.module';


@Module({
  imports: [
    TypeOrmConfigModule,
    ConfigModule.forRoot({
      envFilePath: ['env/dev.env', 'env/prod.env'],
      isGlobal: true,
    })
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}

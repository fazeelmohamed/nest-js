import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './config/typeorm.module';


@Module({
  imports: [
    TypeOrmConfigModule,
    ConfigModule.forRoot({
      envFilePath: ['env/dev.env', 'env/prod.env'],
      isGlobal: true,
    }),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

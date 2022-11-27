import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from 'src/events/entity/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        database: config.get<string>('DATABASE_NAME'),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        host: config.get<string>('DATABASE_HOST'),
        port: parseInt(config.get('DATABASE_PORT')),
        autoLoadEntities: true,
        synchronize: true,
        type: 'mysql',
        entities: [Event]
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [],
  providers: [],
})
export class TypeOrmConfigModule {}

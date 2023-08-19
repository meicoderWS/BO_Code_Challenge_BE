import { Module } from '@nestjs/common';
import { LocationsModule } from './locations/locations.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

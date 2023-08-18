import { Module } from '@nestjs/common';
import { LocationsService } from './services/locations.service';
import { LocationsController } from './controllers/locations.controller';

@Module({
  providers: [LocationsService],
  controllers: [LocationsController]
})
export class LocationsModule {}

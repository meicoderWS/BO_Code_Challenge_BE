import { Controller, Get } from '@nestjs/common';

@Controller('api/locations')
export class LocationsController {
  @Get()
  getAll() {
    return [1, 2, 3];
  }
}

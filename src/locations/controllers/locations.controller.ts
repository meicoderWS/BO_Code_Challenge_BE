import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LocationsService } from '../services/locations.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Controller('api/locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}
  @Get()
  async getAll(
    @Query('distance') distance: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    let filters = undefined;
    if (distance && latitude && longitude) {
      filters = {
        distance,
        latitude,
        longitude,
      };
    }
    return this.locationService.getAll(filters);
  }

  @Get(':id')
  async getSingle(@Param('id') id: string) {
    return this.locationService.getSingle(id);
  }

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.locationService.delete(id);
  }
}

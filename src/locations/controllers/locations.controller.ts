import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationsService } from '../services/locations.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Controller('api/locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}
  @Get()
  async getAll() {
    return this.locationService.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: number) {
    return this.locationService.getSingle(id);
  }

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.locationService.delete(id);
  }
}

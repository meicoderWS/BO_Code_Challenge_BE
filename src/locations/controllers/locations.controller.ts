import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('api/locations')
export class LocationsController {
  @Get()
  getAll() {
    return [1, 2, 3];
  }

  @Get(':id')
  getSingle(@Param('id') id: number) {
    return id;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}

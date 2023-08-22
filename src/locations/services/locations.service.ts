import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
    private readonly locationManager: EntityManager,
  ) {}

  async getAll() {
    return await this.locationManager.query(
      'select *, ST_AsText(location) as location_as_text from location',
    );
    /* return this.locationsRepository.find(); */
  }

  async getSingle(id: string) {
    return await this.locationManager.query(
      'select *, ST_AsText(location) as location_as_text from location where id = $1',
      [id],
    );
    /* return this.locationsRepository.findOneBy({ id }); */
  }

  async create(createLocationDto: CreateLocationDto) {
    const location = new Location(createLocationDto);
    const { name, latitude, longitude } = location;

    const WGS84 = 4326;
    const response = await this.locationManager.query(
      `INSERT INTO location (name, latitude, longitude, location) VALUES  ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), ${WGS84})) RETURNING id`,
      [name, latitude, longitude, longitude, latitude],
    );
    return response[0].id;

    /* await this.locationManager.save(location); */
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationsRepository.findOneBy({ id });
    location.name = updateLocationDto.name;
    location.latitude = updateLocationDto.latitude;
    location.longitude = updateLocationDto.longitude;
    await this.locationManager.save(location);
  }

  async delete(id: number) {
    this.locationsRepository.delete(id);
  }
}

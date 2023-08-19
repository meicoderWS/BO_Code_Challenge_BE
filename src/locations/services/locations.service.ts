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
    return this.locationsRepository.find();
  }

  async getSingle(id: number) {
    return this.locationsRepository.findOneBy({ id });
  }

  async create(createLocationDto: CreateLocationDto) {
    const location = new Location(createLocationDto);
    const { name, latitude, longitude } = location;
    console.log(name, latitude, longitude);

    const WGS84 = 4326;
    await this.locationManager.query(
      `INSERT INTO location (name, latitude, longitude, location) VALUES  ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), ${WGS84}))`,
      [name, latitude, longitude, longitude, latitude],
    );
    /* await this.locationManager.save(location); */
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
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

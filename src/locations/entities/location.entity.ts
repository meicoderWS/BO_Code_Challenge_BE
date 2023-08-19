import { Entity, Column, PrimaryGeneratedColumn, Point } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('numeric')
  latitude: number;

  @Column('numeric')
  longitude: number;

  @Column('geometry')
  location: Point;

  constructor(location: Partial<Location>) {
    Object.assign(this, location);
  }
}

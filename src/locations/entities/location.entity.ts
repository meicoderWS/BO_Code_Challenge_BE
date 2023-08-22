import { Entity, Column, Point, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

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

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
/* type Literal = boolean | null | number | string;
export type JSONValue = Literal | { [key: string]: JSONValue } | JSONValue[]; */

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  /* @Column()
  location: JSONValue; */

  constructor(location: Partial<Location>) {
    Object.assign(this, location);
  }
}

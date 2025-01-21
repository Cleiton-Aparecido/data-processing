import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "address" })
export class addressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zip_code: string;

  @Column()
  neighborhood: string;

  @Column()
  road: string;

  @Column()
  city: string;

  @Column()
  nationality: string;
}

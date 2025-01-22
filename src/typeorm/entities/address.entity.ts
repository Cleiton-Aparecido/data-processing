import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "address" })
export class addressEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column({ name: "zip_code", length: 8, nullable: false })
  zip_code: string;

  @Column({ name: "neighborhood", length: 20, nullable: false })
  neighborhood: string;

  @Column({ name: "road", length: 50, nullable: false })
  road: string;

  @Column({ name: "city", length: 50, nullable: false })
  city: string;

  @Column({ name: "nationality", length: 20, nullable: false })
  nationality: string;
}

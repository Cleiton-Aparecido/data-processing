import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { addressEntity } from "./address.entity";

@Entity({ name: "client" })
export class clientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  father: string;

  @Column()
  mother: string;

  @Column()
  @OneToOne(() => addressEntity)
  address: number;
}

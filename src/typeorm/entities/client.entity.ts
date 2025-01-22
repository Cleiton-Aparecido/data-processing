import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { addressEntity } from "./address.entity";

@Entity({ name: "client" })
export class clientEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column({ name: "name", length: 255, nullable: false })
  name: string;

  @Column({ name: "email", length: 50, nullable: false })
  email: string;

  @Column({ name: "telephone", length: 15, nullable: false })
  telephone: string;

  @Column({ name: "cpf", length: 14, nullable: false })
  cpf: string;

  @Column({ name: "rg", length: 20, nullable: false })
  rg: string;

  @Column({ name: "father", length: 255, nullable: false })
  father: string;

  @Column({ name: "mother", length: 255, nullable: false })
  mother: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;

  @Column({ name: "address", nullable: false })
  @OneToOne(() => addressEntity)
  address: number;
}

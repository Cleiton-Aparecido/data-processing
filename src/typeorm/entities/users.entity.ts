import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class userEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}

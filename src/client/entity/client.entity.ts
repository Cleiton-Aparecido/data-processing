import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class clientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;

  @Column()
  endereco: number;
}

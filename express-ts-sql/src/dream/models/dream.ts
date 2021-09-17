import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Dream {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    title: string;

    @Column()
    date: Date;

    @Column()
    type: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updatedAt?: Date;
}
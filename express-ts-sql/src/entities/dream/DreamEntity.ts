import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
} from 'typeorm';

@Entity()
export class Dream extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'text' })
	title: string;

	@Column()
	date: Date;

	@Column({ type: 'text' })
	type: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;
}

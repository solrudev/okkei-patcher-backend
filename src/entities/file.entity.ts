import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("files")
export class File {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	version: number;

	@Column()
	url: string;

	@Column()
	hash: string;

	@Column()
	size: number;
}
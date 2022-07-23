import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file.entity";

export class Patch {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToOne(() => File)
	@JoinColumn({ name: "file_id" })
	file: File;
}
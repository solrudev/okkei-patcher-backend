import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "@shared/entities";

export class LegacyPatchFile {

	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	name: string;

	@OneToOne(() => File)
	@JoinColumn({ name: "file_id" })
	file: File;
}
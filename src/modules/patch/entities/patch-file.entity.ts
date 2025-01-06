import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "@shared/entities";
import { PatchFileType } from "@patch/interfaces";
import { PatchTarget } from "@patch/interfaces";

export class PatchFile {

	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	target: PatchTarget;

	@Column()
	type: PatchFileType;

	@OneToOne(() => File)
	@JoinColumn({ name: "file_id" })
	file: File;
}
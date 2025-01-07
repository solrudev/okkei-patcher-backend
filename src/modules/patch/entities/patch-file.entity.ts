import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "@shared/entities";
import { PatchFileType, PatchTarget } from "@patch/interfaces";

export class PatchFile {

	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	target: PatchTarget;

	@Column()
	type: PatchFileType;

	@Column({
		name: "patched_size",
		default: -1
	})
	patchedSize: number;

	@OneToOne(() => File)
	@JoinColumn({ name: "file_id" })
	file: File;
}
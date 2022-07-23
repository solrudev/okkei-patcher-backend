import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file.entity";
import { PatcherChange } from "./patcher-change.entity";

@Entity("patcher_versions")
export class PatcherVersion {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "version_name" })
	versionName: string;

	@OneToOne(() => File)
	@JoinColumn({ name: "file_id" })
	file: File;

	@OneToMany(() => PatcherChange, change => change.version)
	changes: PatcherChange[];
}
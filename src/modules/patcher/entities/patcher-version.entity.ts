import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatcherChange } from "@patcher/entities";
import { File } from "@shared/entities";

@Entity("patcher_versions")
export class PatcherVersion {

	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ name: "version_name" })
	versionName: string;

	@OneToOne(() => File)
	@JoinColumn({ name: "file_id" })
	file: File;

	@OneToMany(() => PatcherChange, change => change.version)
	readonly changes: PatcherChange[];
}
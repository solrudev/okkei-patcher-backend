import { Column, Entity, PrimaryColumn } from "typeorm";
import { Language } from "@shared/interfaces";

@Entity("patch_versions")
export class PatchVersion {

	@PrimaryColumn()
	readonly language: Language;

	@Column({ name: "display_version" })
	displayVersion: string;
}
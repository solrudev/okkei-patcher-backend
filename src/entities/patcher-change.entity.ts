import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatcherVersion } from "./patcher-version.entity";
import { Language } from "../interfaces/language.interface";

@Entity("patcher_changes")
export class PatcherChange {

	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ name: "description_en" })
	descriptionEn: string;

	@Column({ name: "description_ru" })
	descriptionRu: string;

	@ManyToOne(() => PatcherVersion, version => version.changes)
	@JoinColumn({ name: "version_id" })
	version: PatcherVersion;

	getDescriptionByLanguage(language: Language): string {
		switch (language) {
			case Language.ENGLISH:
				return this.descriptionEn;
			case Language.RUSSIAN:
				return this.descriptionRu;
		}
	}
}
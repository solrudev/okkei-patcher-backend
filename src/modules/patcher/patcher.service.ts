import { Injectable } from "@nestjs/common";
import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PatcherVersion } from "@patcher/entities";
import { Language } from "@shared/interfaces";
import { VersionDto } from "@patcher/dto";
import { FileDto } from "@shared/dto";

@Injectable()
export class PatcherService {

	constructor(
		@InjectRepository(PatcherVersion)
		private readonly patcherVersionsRepository: Repository<PatcherVersion>
	) {
	}

	async getLatestVersion(): Promise<FileDto | null> {
		const versions = await this.patcherVersionsRepository.find({
			relations: { file: true },
			order: {
				file: {
					version: "DESC"
				}
			},
			take: 1
		});
		if (versions.length == 0) {
			return null;
		}
		const { id, ...file } = versions[0].file;
		return file;
	}

	async getChangesSinceVersion(version: number, language: Language): Promise<VersionDto[]> {
		const versions = await this.patcherVersionsRepository.find({
			relations: { changes: true },
			where: {
				file: {
					version: MoreThan(version)
				}
			},
			order: {
				id: "DESC",
				changes: {
					id: "ASC"
				}
			}
		});
		return versions.map(version => {
			const changes = version.changes.map(change =>
				change.getDescriptionByLanguage(language)
			);
			return { versionName: version.versionName, changes: changes };
		});
	}
}
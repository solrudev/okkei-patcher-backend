import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LegacyEnglishPatchFile } from "@legacy/patch/entities";
import { PatchVersion } from "@patch/entities";
import { Language } from "@shared/interfaces";
import { LegacyEnglishPatchDto } from "@legacy/patch/dto";

@Injectable()
export class LegacyEnglishPatchService {

	constructor(
		@InjectRepository(PatchVersion)
		private readonly patchVersionRepository: Repository<PatchVersion>,
		@InjectRepository(LegacyEnglishPatchFile)
		private readonly englishPatchRepository: Repository<LegacyEnglishPatchFile>
	) {
	}

	async getPatch(): Promise<LegacyEnglishPatchDto | {}> {
		const patchVersion = await this.patchVersionRepository.findOneBy({
			language: Language.ENGLISH
		});
		const patchFiles = await this.englishPatchRepository.find({
			relations: { file: true }
		});
		const files = patchFiles.reduce((accumulator, patchFile) => {
			const { id, ...file } = patchFile.file;
			return ({ ...accumulator, [patchFile.name]: file });
		}, {});
		return {
			displayVersion: patchVersion?.displayVersion ?? "",
			...files
		};
	}
}
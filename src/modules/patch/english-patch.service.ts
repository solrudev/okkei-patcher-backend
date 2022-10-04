import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EnglishPatchFile } from "../../entities/english-patch-file.entity";
import { Repository } from "typeorm";
import { EnglishPatchDto } from "./dto/english-patch.dto";
import { PatchVersion } from "../../entities/patch-version.entity";
import { Language } from "../../interfaces/language.interface";

@Injectable()
export class EnglishPatchService {

	constructor(
		@InjectRepository(PatchVersion)
		private readonly patchVersionRepository: Repository<PatchVersion>,
		@InjectRepository(EnglishPatchFile)
		private readonly englishPatchRepository: Repository<EnglishPatchFile>
	) {
	}

	async getPatch(): Promise<EnglishPatchDto | {}> {
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
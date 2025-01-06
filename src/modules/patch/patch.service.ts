import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PatchFile, PatchVersion } from "@patch/entities";
import { PatchFileType, PatchTarget } from "@patch/interfaces";
import { Language } from "@shared/interfaces";
import { PatchFileDto, PatchResponseDto, SupportedFeaturesDto } from "@patch/dto";
import { groupBy } from "@shared/helpers";

@Injectable()
export class PatchService {

	constructor(
		private readonly patchVersionRepository: Repository<PatchVersion>,
		private readonly englishPatchRepository: Repository<PatchFile>,
		private readonly language: Language
	) {
	}

	async getPatch(supportedFeatures: SupportedFeaturesDto): Promise<PatchResponseDto> {
		const patchVersion = await this.patchVersionRepository.findOneBy({
			language: this.language
		});
		const patchFiles = await this.englishPatchRepository.find({
			relations: { file: true }
		});
		const groupedFiles = groupBy(patchFiles, patchFile => patchFile.target);
		const apk = this.getPatchFiles(
			groupedFiles[PatchTarget.APK] ?? [],
			patchFile => supportedFeatures.scripts || patchFile.type != PatchFileType.SCRIPTS
		);
		const obb = this.getPatchFiles(
			groupedFiles[PatchTarget.OBB] ?? [],
			patchFile => supportedFeatures.binaryPatches || patchFile.type != PatchFileType.OBB_PATCH
		);
		return {
			displayVersion: patchVersion?.displayVersion ?? "",
			apk: apk,
			obb: obb
		};
	}

	private getPatchFiles(patchFiles: PatchFile[], filterPredicate: (patchFile: PatchFile) => boolean): PatchFileDto[] {
		return patchFiles
			.filter(filterPredicate)
			.map(patchFile => {
				const { id, ...file } = patchFile.file;
				return { type: patchFile.type, ...file };
			});
	}
}
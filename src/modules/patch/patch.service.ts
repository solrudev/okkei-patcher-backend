import { Repository } from "typeorm";
import { PatchFile, PatchVersion } from "@patch/entities";
import { PatchFileType, PatchTarget } from "@patch/interfaces";
import { Language } from "@shared/interfaces";
import { PatchFileDto, PatchResponseDto, SupportedFeaturesDto } from "@patch/dto";
import { groupBy } from "@shared/helpers";

export class PatchService {

	constructor(
		private readonly patchVersionRepository: Repository<PatchVersion>,
		private readonly patchRepository: Repository<PatchFile>,
		private readonly language: Language
	) {
	}

	async getPatch(supportedFeatures: SupportedFeaturesDto, gameVersion?: number): Promise<PatchResponseDto> {
		const patchVersion = await this.patchVersionRepository.findOneBy({
			language: this.language
		});
		const patchFiles = await this.patchRepository.find({
			relations: { file: true }
		});
		const groupedFiles = groupBy(patchFiles, patchFile => patchFile.target);
		const apk = this.getPatchFiles(
			groupedFiles[PatchTarget.APK] ?? [],
			patchFile => supportedFeatures.scripts || patchFile.type != PatchFileType.SCRIPTS,
			gameVersion
		);
		const obb = this.getPatchFiles(
			groupedFiles[PatchTarget.OBB] ?? [],
			patchFile => supportedFeatures.binaryPatches || patchFile.type != PatchFileType.OBB_PATCH,
			gameVersion
		);
		return {
			displayVersion: patchVersion?.displayVersion ?? "",
			apk: apk,
			obb: obb
		};
	}

	private getPatchFiles(
		patchFiles: PatchFile[],
		filterPredicate: (patchFile: PatchFile) => boolean,
		gameVersion?: number
	): PatchFileDto[] {
		const lastGameVersion = Math.max(...patchFiles.flatMap(patchFile => patchFile.gameVersions));
		return patchFiles
			.filter(filterPredicate)
			.filter(patchFile => patchFile.gameVersions.includes(gameVersion ?? lastGameVersion))
			.map(patchFile => {
				const { id, ...file } = patchFile.file;
				return {
					type: patchFile.type,
					targetVersion: patchFile.targetVersion,
					...file,
					patchedSize: patchFile.patchedSize,
					compatibleHashes: patchFile.compatibleHashes
				};
			});
	}
}
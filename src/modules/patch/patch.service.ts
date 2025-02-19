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
		gameVersion = gameVersion ?? Math.max(...patchFiles.flatMap(patchFile => patchFile.gameVersions));
		const apk = this.getPatchFiles(
			groupedFiles[PatchTarget.APK] ?? [],
			patchFile => this.isApkPatchFileSupported(patchFile.type, supportedFeatures),
			gameVersion
		);
		const obb = this.getPatchFiles(
			groupedFiles[PatchTarget.OBB] ?? [],
			patchFile => this.isObbPatchFileSupported(patchFile.type, supportedFeatures),
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
		isSupported: (patchFile: PatchFile) => boolean,
		gameVersion: number
	): PatchFileDto[] {
		return patchFiles
			.filter(isSupported)
			.filter(patchFile => patchFile.gameVersions.includes(gameVersion))
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

	private isApkPatchFileSupported(patchFileType: PatchFileType, supportedFeatures: SupportedFeaturesDto): boolean {
		return supportedFeatures.scripts && patchFileType == PatchFileType.SCRIPTS;
	}

	private isObbPatchFileSupported(patchFileType: PatchFileType, supportedFeatures: SupportedFeaturesDto): boolean {
		return supportedFeatures.binaryPatches && patchFileType == PatchFileType.OBB_PATCH;
	}
}
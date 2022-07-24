import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EnglishPatchFile } from "../../entities/english-patch-file.entity";
import { Repository } from "typeorm";
import { EnglishPatchDto } from "./dto/english-patch.dto";

@Injectable()
export class EnglishPatchService {

	constructor(
		@InjectRepository(EnglishPatchFile)
		private readonly englishPatchRepository: Repository<EnglishPatchFile>
	) {
	}

	async getPatchFiles(): Promise<EnglishPatchDto | {}> {
		const patchFiles = await this.englishPatchRepository.find({
			relations: { file: true }
		});
		return patchFiles.reduce((accumulator, patchFile) => {
			const { id, ...file } = patchFile.file;
			return ({ ...accumulator, [patchFile.name]: file });
		}, {});
	}
}
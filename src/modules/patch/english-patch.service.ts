import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EnglishPatch } from "../../entities/english-patch.entity";
import { Repository } from "typeorm";
import { EnglishPatchDto } from "./dto/english-patch.dto";

@Injectable()
export class EnglishPatchService {

	constructor(
		@InjectRepository(EnglishPatch)
		private readonly englishPatchRepository: Repository<EnglishPatch>
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
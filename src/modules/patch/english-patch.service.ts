import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EnglishPatchFile, PatchVersion } from "@patch/entities";
import { PatchService } from "@patch/patch.service";

@Injectable()
export class EnglishPatchService extends PatchService {

	constructor(
		@InjectRepository(PatchVersion) patchVersionRepository: Repository<PatchVersion>,
		@InjectRepository(EnglishPatchFile) englishPatchRepository: Repository<EnglishPatchFile>
	) {
		super(patchVersionRepository, englishPatchRepository);
	}
}